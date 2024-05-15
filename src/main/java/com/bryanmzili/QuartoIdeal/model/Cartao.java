package com.bryanmzili.QuartoIdeal.model;

import com.bryanmzili.QuartoIdeal.validator.ValidMonth;
import com.bryanmzili.QuartoIdeal.validator.ValidYear;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class Cartao {

    @NotNull(message = "Nome é obrigatório")
    private String nomeTitular;

    @NotNull(message = "Número cartão é obrigatório")
    @Pattern(regexp = "\\d{4} \\d{4} \\d{4} \\d{4}", message = "O número do cartão deve estar no formato 'xxxx xxxx xxxx xxxx'")
    private String numeroCartao;
    
    private String metodo;

    @NotNull(message = "Mês é obrigatório")
    @ValidMonth
    private int mes;

    @NotNull(message = "Ano é obrigatório")
    @ValidYear
    private int ano;

    @NotNull(message = "CVV é obrigatório")
    @Size(min = 3, max = 3, message = "CVV deve ter exatamente 3 caracteres")
    private int cvv;

    public Cartao() {
    }

    public Cartao(String nomeTitular, String numeroCartao, int mes, int ano, String metodo) {
        this.nomeTitular = nomeTitular;
        this.numeroCartao = numeroCartao;
        this.mes = mes;
        this.ano = ano;
        this.metodo = metodo;
    }

    public String getNomeTitular() {
        return nomeTitular;
    }

    public void setNomeTitular(String nomeTitular) {
        this.nomeTitular = nomeTitular;
    }

    public String getNumeroCartao() {
        return numeroCartao;
    }

    public void setNumeroCartao(String numeroCartao) {
        this.numeroCartao = numeroCartao;
    }

    public int getMes() {
        return mes;
    }

    public void setMes(int mes) {
        this.mes = mes;
    }

    public int getAno() {
        return ano;
    }

    public void setAno(int ano) {
        this.ano = ano;
    }

    public int getCvv() {
        return cvv;
    }

    public void setCvv(int cvv) {
        this.cvv = cvv;
    }

    public String getMetodo() {
        return metodo;
    }

    public void setMetodo(String metodo) {
        this.metodo = metodo;
    }

}
