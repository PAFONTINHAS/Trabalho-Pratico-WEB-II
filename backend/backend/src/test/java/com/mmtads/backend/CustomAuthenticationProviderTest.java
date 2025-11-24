package com.mmtads.backend;


import com.mmtads.backend.Model.Usuario;
import com.mmtads.backend.config.CustomAuthenticationProvider;
import com.mmtads.backend.service.CustomUserDetailsService;
import com.mmtads.backend.service.UsuarioService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import static org.junit.jupiter.api.Assertions.*;

public class CustomAuthenticationProviderTest {

    private CustomAuthenticationProvider provider;
    private UsuarioService usuarioService;
    private CustomUserDetailsService userDetailsService;

    @BeforeEach
    void setUp() {
        usuarioService = Mockito.mock(UsuarioService.class);
        userDetailsService = Mockito.mock(CustomUserDetailsService.class);
        provider = new CustomAuthenticationProvider();

        provider = new CustomAuthenticationProvider();
        provider.getClass().getDeclaredFields();

        try {
            var f1 = CustomAuthenticationProvider.class.getDeclaredField("usuarioService");
            var f2 = CustomAuthenticationProvider.class.getDeclaredField("userDetailsService");
            f1.setAccessible(true);
            f2.setAccessible(true);
            f1.set(provider, usuarioService);
            f2.set(provider, userDetailsService);
        } catch (Exception ignored) {}
    }

    @Test
    void deveAutenticarComSenhaCorreta() {
        Usuario user = new Usuario();
        user.setEmail("teste@exemplo.com");
        user.setSenhaSalt("SALT123");
        user.setSenhaHash("HASHVALIDO");

        Mockito.when(userDetailsService.loadUserByUsername("teste@exemplo.com")).thenReturn(user);
        Mockito.when(usuarioService.generateSHA256Hash("123456", "SALT123")).thenReturn("HASHVALIDO");

        var authRequest = new UsernamePasswordAuthenticationToken("teste@exemplo.com", "123456");
        var result = provider.authenticate(authRequest);

        assertNotNull(result);
        assertEquals(user, result.getPrincipal());
    }

    @Test
    void deveLancarExcecaoComSenhaIncorreta() {
        Usuario user = new Usuario();
        user.setEmail("teste@exemplo.com");
        user.setSenhaSalt("SALT123");
        user.setSenhaHash("HASHCORRETO");

        Mockito.when(userDetailsService.loadUserByUsername("teste@exemplo.com")).thenReturn(user);
        Mockito.when(usuarioService.generateSHA256Hash("senhaErrada", "SALT123")).thenReturn("HASHERRADO");

        var authRequest = new UsernamePasswordAuthenticationToken("teste@exemplo.com", "senhaErrada");

        assertThrows(BadCredentialsException.class, () -> provider.authenticate(authRequest));
    }
}
