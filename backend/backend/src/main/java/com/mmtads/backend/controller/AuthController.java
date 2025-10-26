package com.mmtads.backend.Controller;

import com.mmtads.backend.Model.Usuario;
import com.mmtads.backend.dto.LoginRequestDto;
import com.mmtads.backend.dto.LoginResponseDto;
import com.mmtads.backend.service.TokenService;

import javax.sound.midi.SysexMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto dadosLogin) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(dadosLogin.email(), dadosLogin.senha());
        try {
            var auth = this.manager.authenticate(usernamePassword);
            var usuarioAutenticado = (Usuario) auth.getPrincipal();
            var token = tokenService.generateToken(usuarioAutenticado);

            return ResponseEntity.ok(new LoginResponseDto(token));

        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body("LOGIN_INVALIDO");

        } catch (Exception e) {
            return ResponseEntity.status(500).body("ERRO_SERVIDOR");
        }
    }
}
