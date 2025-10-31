package com.mmtads.backend.service;

import org.springframework.stereotype.Service;
import java.security.SecureRandom;

@Service
public class PasswordGeneratorService {

    private static final SecureRandom random = new SecureRandom();

    public String gerarSenhaAleatoria() {
        int numeroAleatorio = random.nextInt(10000);
        
        return String.format("%04d", numeroAleatorio);
    }
}