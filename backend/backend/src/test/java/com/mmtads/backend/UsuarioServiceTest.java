package com.mmtads.backend;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import org.junit.jupiter.api.Test;

import com.mmtads.backend.service.UsuarioService;

public class UsuarioServiceTest {

    private final UsuarioService usuarioService = new UsuarioService();

    @Test
    void deveGerarMesmoHashParaMesmaSenhaESalt() {
        String senha = "123456";
        String salt = "ABC123";

        String hash1 = usuarioService.generateSHA256Hash(senha, salt);
        String hash2 = usuarioService.generateSHA256Hash(senha, salt);

        assertEquals(hash1, hash2, "O hash deve ser igual quando a senha e o salt são os mesmos");
    }

    @Test
    void deveGerarHashDiferenteQuandoSaltMuda() {
        String senha = "123456";
        String hash1 = usuarioService.generateSHA256Hash(senha, "SALT1");
        String hash2 = usuarioService.generateSHA256Hash(senha, "SALT2");

        assertNotEquals(hash1, hash2, "O hash deve mudar quando o salt muda");
    }

    @Test
    void deveGerarHashDiferenteQuandoSenhaMuda() {
        String salt = "MESMOSALT";
        String hash1 = usuarioService.generateSHA256Hash("senhaA", salt);
        String hash2 = usuarioService.generateSHA256Hash("senhaB", salt);

        assertNotEquals(hash1, hash2, "O hash deve mudar quando a senha muda");
    }
}
