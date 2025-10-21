package com.mmtads.backend.config;

import com.mmtads.backend.Model.Usuario;
import com.mmtads.backend.service.CustomUserDetailsService;
import com.mmtads.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private UsuarioService usuarioService; 

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String email = authentication.getName();
        String plainPassword = authentication.getCredentials().toString();

        Usuario user = (Usuario) userDetailsService.loadUserByUsername(email);

        String salt = user.getSenhaSalt();
        
        String hashSalvo = user.getSenhaHash();

        String hashCalculado = usuarioService.generateSHA256Hash(plainPassword, salt);

        if (!hashCalculado.equals(hashSalvo)) {
            throw new BadCredentialsException("Senha incorreta");
        }
        
        return new UsernamePasswordAuthenticationToken(user, plainPassword, user.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}