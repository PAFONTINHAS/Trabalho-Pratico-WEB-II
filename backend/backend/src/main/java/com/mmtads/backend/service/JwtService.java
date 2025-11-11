package com.mmtads.backend.service;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import com.mmtads.backend.Model.Usuario;
import java.util.Map;

@Service
public class JwtService {
    
    @Value("${api.security.token.secret}")
    private String SECRET_KEY;


    private final long JWT_EXPIRATION = 1000 * 60 * 60;

    public String extractUserEmail(String token){
        return Jwts 
            .parserBuilder()
            .setSigningKey(getSigningKey())
            .build()
            .parseClaimsJws(token)
            .getBody()
            .getSubject();

    }

    public String generateToken(UserDetails userDetails){
        // Converte UserDetails de volta para Usuario para pegar os campos extras
        Usuario usuario = (Usuario) userDetails; 

        // Cria os "claims" (informações) extras
        Map<String, Object> claims = Map.of(
            "nome", usuario.getNome(),
            "role", usuario.getRole().toString() // Converte o Enum para String
        );

        return Jwts.builder()
            .setClaims(claims) // ⬅️ Adiciona os claims extras
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + JWT_EXPIRATION))
            .signWith(getSigningKey(), SignatureAlgorithm.HS256)
            .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String email = extractUserEmail(token);
        return (email.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return Jwts
            .parserBuilder()
            .setSigningKey(getSigningKey())
            .build()
            .parseClaimsJws(token)
            .getBody()
            .getExpiration()
            .before(new Date());
    }

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }


}
