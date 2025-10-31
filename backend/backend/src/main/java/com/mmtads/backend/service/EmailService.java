package com.mmtads.backend.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.MimeMessageHelper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public void enviarSenhaDeCadastro(String emailDestinatario, String nomeUsuario, String senhaPura) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(emailDestinatario);
            helper.setSubject("Sua Senha de Acesso - MM-TADS");

            String textoHtml = String.format(
                "<div style='font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding-top: 5px; padding-bottom: 10px; padding-left: 30px; padding-right:30px; border: 1px solid #ddd; border-radius: 8px;'>" +
                "  <h2 style='color: #1a496b; text-align: center;'>Bem-vindo(a) ao MM-TADS!</h2>" +
                "  <p>Olá, <strong>%s</strong>!</p>" +
                "  <p>Seu cadastro no sistema foi realizado com sucesso.</p>" +
                "  <p><strong>Anote sua senha de 4 dígitos para realizar login:</strong></p>" +
                "  <div style='background-image: linear-gradient(to right, #2D89CB, #164BAE); padding: 15px 20px; border-radius: 5px; text-align: center;'>" +
                "    <span style='font-size: 30px; font-weight: bold; color: #fff; letter-spacing: 12px;'>%s</span>" +
                "  </div>" +
                "  <p style='margin-top: 20px; font-size: 0.9em; color: #777;'>Atenciosamente,<br>Equipe MM-TADS</p>" +
                "</div>",
                nomeUsuario, senhaPura
            );
            helper.setText(textoHtml, true); 
            
            mailSender.send(mimeMessage);

        } catch (MessagingException e) { 
            System.err.println("Erro ao enviar e-mail HTML de cadastro: " + e.getMessage());
            throw new RuntimeException("Erro ao enviar e-mail.");
        }
    }
}
