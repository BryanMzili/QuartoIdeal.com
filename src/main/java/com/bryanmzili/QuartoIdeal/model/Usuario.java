package com.bryanmzili.QuartoIdeal.model;

import jakarta.validation.constraints.NotNull;

public class Usuario {

    @NotNull(message = "Usuário é obrigatório")
    private String usuario;

    @NotNull(message = "Senha é obrigatório")
    private String senha;

    public Usuario() {
    }

    public Usuario(String usuario, String senha) {
        this.usuario = usuario;
        this.senha = senha;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }
}
