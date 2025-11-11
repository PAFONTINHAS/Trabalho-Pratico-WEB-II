package com.mmtads.backend.controller;

import com.mmtads.backend.Model.Usuario;
import com.mmtads.backend.dto.LoginRequestDto;
import com.mmtads.backend.dto.LoginResponseDto;
import com.mmtads.backend.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto dadosLogin) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(dadosLogin.email(), dadosLogin.senha());
        try {
            var auth = this.manager.authenticate(usernamePassword);
            var usuarioAutenticado = (Usuario) auth.getPrincipal();
            var token = jwtService.generateToken(usuarioAutenticado);

            return ResponseEntity.ok(new LoginResponseDto(token));

        } catch (AuthenticationException e) {
            // Retorna JSON em caso de login inválido
            return ResponseEntity.status(401).body(Map.of("mensagem", "LOGIN_INVALIDO"));

        } catch (Exception e) {
            // Retorna JSON em caso de erro no servidor
            return ResponseEntity.status(500).body(Map.of("mensagem", "ERRO_SERVIDOR"));
        }
    }
}
