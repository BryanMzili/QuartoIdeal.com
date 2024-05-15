package com.bryanmzili.QuartoIdeal.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.br.CPF;

public class EsqueciMinhaSenha {

    @NotNull(message = "CPF é obrigatório")
    @CPF(message = "CPF inválido")
    private String cpf;

    @Size(min = 8, message = "A senha deve ter no mínimo 8 caracteres")
    private String senha1;

    @Size(min = 8, message = "A senha deve ter no mínimo 8 caracteres")
    private String senha2;

    public EsqueciMinhaSenha() {
    }

    public EsqueciMinhaSenha(String cpf, String senha1, String senha2) {
        this.cpf = cpf;
        this.senha1 = senha1;
        this.senha2 = senha2;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getSenha1() {
        return senha1;
    }

    public void setSenha1(String senha1) {
        this.senha1 = senha1;
    }

    public String getSenha2() {
        return senha2;
    }

    public void setSenha2(String senha2) {
        this.senha2 = senha2;
    }
}
