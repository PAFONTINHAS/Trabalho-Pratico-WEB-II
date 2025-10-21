package com.mmtads.backend.controller;

import com.mmtads.backend.Repository.FuncionarioRepository;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.mmtads.backend.Model.Funcionario;
import java.nio.charset.Charset;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.List;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/funcionarios")
public class FuncionarioController {
    
    private final FuncionarioRepository funciRepo;

    public FuncionarioController(FuncionarioRepository funciRepo) {
        this.funciRepo = funciRepo;
    }

    @GetMapping
    public List<Funcionario> getAllFuncionarios() {
        return this.funciRepo.findAll();
    }

    @GetMapping("/{id}")
    public Funcionario getFuncionarioById(@PathVariable Long id) {
        return this.funciRepo.findByIdAndIsDeleteFalse(id);
    }

    @PostMapping
    public Funcionario createFuncionario(@RequestBody Funcionario funci) {
        String saltedPassword = generateSalt(funci.getSenhaSalt());
        funci.setSenhaSalt(saltedPassword);
        String hash = this.generateSHA256Hash(funci.getSenhaSalt());
        funci.setSenhaHash(hash);
        funci.setTipo("FUNCIONÁRIO");
        return this.funciRepo.save(funci);
    }
    
    @PutMapping
    public Funcionario updateFuncionario(@PathVariable long id, @RequestBody Funcionario funci) {
        funci.setId(id);
        return this.funciRepo.save(funci);
    }

    @DeleteMapping("/{id}")
    public void deleteFuncionarioById(@PathVariable long id) {
        this.funciRepo.softDeleteById(id);
    }
    
    public String generateSHA256Hash(String salt) {
        try {
            // Create a MessageDigest instance for SHA-256
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            
            // Perform the hash computation
            byte[] encodedhash = digest.digest(salt.getBytes());

            // Convert byte array into a hexadecimal string
            StringBuilder hexString = new StringBuilder();
            for (byte b : encodedhash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }
    
    public String generateSalt(String password) {
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        String stringSalt = new String(salt, Charset.forName("UTF-8"));
        
        return password.concat(stringSalt);
    }

}

