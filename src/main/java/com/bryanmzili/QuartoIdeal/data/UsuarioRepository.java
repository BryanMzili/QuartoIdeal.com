package com.bryanmzili.QuartoIdeal.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Integer> {

    UsuarioEntity findById(int id);

    UsuarioEntity findByUsuarioAndSenha(String usuario, String senha);

    UsuarioEntity findByCpf(String cpf);
    
    UsuarioEntity findByUsuario(String usuario);
    
    UsuarioEntity findByContato(String contato);
    
    UsuarioEntity findByEmail(String email);
    
    
}
