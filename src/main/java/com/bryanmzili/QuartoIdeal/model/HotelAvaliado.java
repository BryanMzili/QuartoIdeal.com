package com.bryanmzili.QuartoIdeal.model;

import com.bryanmzili.QuartoIdeal.data.AvaliacaoEntity;
import com.bryanmzili.QuartoIdeal.data.HotelEntity;
import java.util.List;

public class HotelAvaliado {

    private Integer id;

    private String nome;
    private String imagem;
    private String regiao;

    private double valor;
    private double nota = 0;
    private int numAval = 0;

    public HotelAvaliado() {
    }

    public HotelAvaliado(HotelEntity hotel, List<AvaliacaoEntity> avaliacao) {
        this.id = hotel.getId();
        this.nome = hotel.getNome();
        this.imagem = hotel.getImagem();
        this.regiao = hotel.getRegiao();
        this.valor = hotel.getValor();
        notaAval(avaliacao);
    }

    public void notaAval(List<AvaliacaoEntity> avaliacoes) {
        int aux = 0;
        for (AvaliacaoEntity avaliacao : avaliacoes) {
            this.nota += avaliacao.getNota();
            aux++;
        }
        if(aux > 0){
        this.nota = this.nota / aux;
        }
        
        this.numAval = avaliacoes.size();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getImagem() {
        return imagem;
    }

    public void setImagem(String imagem) {
        this.imagem = imagem;
    }

    public String getRegiao() {
        return regiao;
    }

    public void setRegiao(String regiao) {
        this.regiao = regiao;
    }

    public double getValor() {
        return valor;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }

    public double getNota() {
        return nota;
    }

    public void setNota(double nota) {
        this.nota = nota;
    }

    public int getNumAval() {
        return numAval;
    }

    public void setNumAval(int numAval) {
        this.numAval = numAval;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}
