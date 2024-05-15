package com.bryanmzili.QuartoIdeal.controller;

import com.bryanmzili.QuartoIdeal.data.UsuarioEntity;
import com.bryanmzili.QuartoIdeal.model.EsqueciMinhaSenha;
import com.bryanmzili.QuartoIdeal.model.Usuario;
import com.bryanmzili.QuartoIdeal.service.UsuarioService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/usuario")
@CrossOrigin(origins = "localhost")
public class UsuarioController {

    @Autowired
    UsuarioService usuarioService;

    @PostMapping("/logar")
    public ResponseEntity<String> getUsuarioByUserAndPass(@RequestBody Usuario usuario, HttpServletRequest request) {
        UsuarioEntity usuarioEntity = usuarioService.listarUsuarioByUsuarioAndSenha(usuario);

        if (usuarioEntity != null) {
            HttpSession ses = request.getSession(true);
            ses.setAttribute("usuario", usuario);
            return new ResponseEntity<>("Login Feito com sucesso", HttpStatus.OK);
        }

        return new ResponseEntity<>("Login Falhou", HttpStatus.OK);
    }

    @PostMapping("/esqueciSenha")
    public ResponseEntity<String> alterarSenhaCpf(@RequestBody EsqueciMinhaSenha esqueciSenha) {
        UsuarioEntity usuarioEntity = usuarioService.listarUsuarioByCpf(esqueciSenha);

        if (usuarioEntity != null) {
            return new ResponseEntity<>("Usuário encontrado", HttpStatus.OK);
        }

        return new ResponseEntity<>("Usuário não encontrado", HttpStatus.OK);
    }

    @PostMapping("/mudarSenha")
    public ResponseEntity<String> alterarSenha(@RequestBody EsqueciMinhaSenha esqueciSenha) {
        UsuarioEntity usuarioEntity = usuarioService.listarUsuarioByCpf(esqueciSenha);

        if (usuarioEntity != null) {
            if (!esqueciSenha.getSenha1().equals(esqueciSenha.getSenha2())) {
                return new ResponseEntity<>("Senhas não coincidem", HttpStatus.OK);
            }
            usuarioService.atualizarUsuario(esqueciSenha, usuarioEntity);
            return new ResponseEntity<>("Senha alterada com sucesso", HttpStatus.OK);
        }

        return new ResponseEntity<>("Falha ao alterar senha", HttpStatus.OK);
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<String> cadastrarUsuario(@RequestBody UsuarioEntity usuario) {
        String resultado = usuarioService.criarUsuario(usuario);

        return new ResponseEntity<>(resultado, HttpStatus.OK);
    }
}
