package com.bryanmzili.QuartoIdeal.service;

import com.bryanmzili.QuartoIdeal.data.UsuarioEntity;
import com.bryanmzili.QuartoIdeal.data.UsuarioRepository;
import com.bryanmzili.QuartoIdeal.model.EsqueciMinhaSenha;
import com.bryanmzili.QuartoIdeal.model.Usuario;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    UsuarioRepository usuarioRepository;

    public String criarUsuario(UsuarioEntity usuario) {

        if (usuarioRepository.findByCpf(usuario.getCpf()) == null) {
            if (usuarioRepository.findByContato(usuario.getContato()) == null) {
                if (usuarioRepository.findByEmail(usuario.getEmail()) == null) {
                    if (usuarioRepository.findByUsuario(usuario.getUsuario()) == null) {
                        usuarioRepository.save(usuario);
                        return "Usuário criado com sucesso";
                    }
                    return "Nome de usuário inválido";
                }
                return "Email inválido";
            }
            return "Contato inválido";
        }
        return "CPF inválido";
    }

    public List<UsuarioEntity> listarTodosUsuarios() {
        return usuarioRepository.findAll();
    }

    public UsuarioEntity listarUsuarioById(int id) {
        return usuarioRepository.findById(id);
    }

    public UsuarioEntity listarUsuarioByUsuarioAndSenha(Usuario usuario) {
        return usuarioRepository.findByUsuarioAndSenha(usuario.getUsuario(), usuario.getSenha());
    }

    public UsuarioEntity listarUsuarioByCpf(EsqueciMinhaSenha senha) {
        return usuarioRepository.findByCpf(senha.getCpf());
    }

    public UsuarioEntity atualizarUsuario(EsqueciMinhaSenha senha, UsuarioEntity usuario) {
        usuario.setSenha(senha.getSenha1());
        return usuarioRepository.save(usuario);
    }

}
