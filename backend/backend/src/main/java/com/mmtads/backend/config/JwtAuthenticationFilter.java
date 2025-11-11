package com.mmtads.backend.config;

import org.springframework.web.filter.OncePerRequestFilter;

import com.mmtads.backend.service.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter{


   private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

   @Autowired
   private JwtService jwtService;

   @Autowired
   private UserDetailsService userDetailsService;

   @Override
   protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    logger.info("FILTRO INICIADO");
    
    final String authHeader = request.getHeader("Authorization");
    final String jwt;
    final String userEmail;

    if(authHeader == null || !authHeader.startsWith("Bearer ")){
        logger.error("\n ERRO AQUI" );
        filterChain.doFilter(request, response);
        return;
    }

    jwt = authHeader.substring(7);

    logger.info("HEADER PEGO COM SUCESSO: " + jwt);

    logger.info("EXTRAINDO EMAIL");


    try{
        userEmail = jwtService.extractUserEmail(jwt);
        logger.info("EMAIL EXTRAÍDO COM SUCESSO!" );

    } catch(Exception e){

        logger.error("\n ERRO AO EXTRAIR EMAIL DO USUÁRIO: " + e);

        filterChain.doFilter(request, response);
        return;
    }

    if(userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null){

        logger.info("EMAIL NÃO É NULO");

        UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);

        if(jwtService.isTokenValid(jwt, userDetails)){

            logger.info("TOKEN É VÁLIDO");


            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            SecurityContextHolder.getContext().setAuthentication(authToken);
        }
        
    }

    filterChain.doFilter(request, response);


   }
    
}
