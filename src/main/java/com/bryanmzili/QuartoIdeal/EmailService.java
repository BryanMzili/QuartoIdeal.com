package com.bryanmzili.QuartoIdeal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    @Value("${spring.mail.username}")
    private String remetente;

    public String sendSimpleMessage(String destinatario, String assunto, String mensagem) {
        try {
            SimpleMailMessage simpleMailMessege = new SimpleMailMessage();
            simpleMailMessege.setFrom(remetente);
            simpleMailMessege.setTo(destinatario);
            simpleMailMessege.setSubject(assunto);
            simpleMailMessege.setText(mensagem);

            emailSender.send(simpleMailMessege);
            return "Email enviado";
        } catch (Exception e) {
            return "Erro ao tentar enviar email " + e.getLocalizedMessage();
        }
    }
}
