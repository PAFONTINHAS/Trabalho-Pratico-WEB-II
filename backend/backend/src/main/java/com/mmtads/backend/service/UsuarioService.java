package com.mmtads.backend.service;

import com.mmtads.backend.Model.Role;
import com.mmtads.backend.Model.Usuario;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets; 
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.HexFormat;

@Service
public class UsuarioService {

    private String generateSalt() {
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        return HexFormat.of().formatHex(salt); 
    }

    public String generateSHA256Hash(String password, String salt) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            
            String textToHash = password + salt;
            
            byte[] encodedhash = digest.digest(textToHash.getBytes(StandardCharsets.UTF_8));
            
            return HexFormat.of().formatHex(encodedhash);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    public void prepararNovoUsuario(Usuario usuario, Role role) {
        String plainPassword = usuario.getSenha();
        
        String salt = generateSalt();
        
        String hash = generateSHA256Hash(plainPassword, salt);

        usuario.setSenhaSalt(salt);
        usuario.setSenhaHash(hash);
        usuario.setRole(role);
    }
}