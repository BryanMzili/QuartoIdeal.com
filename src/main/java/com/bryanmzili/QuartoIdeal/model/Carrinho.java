package com.bryanmzili.QuartoIdeal.model;

import java.util.Date;

public class Carrinho {
    private int id_hotel;
    private Date data_entrada;
    private Date data_saida;
    
    public Carrinho(){
    }
    
    public Carrinho(int id_hotel, Date data_entrada, Date data_saida){
        this.id_hotel = id_hotel;
        this.data_entrada = data_entrada;
        this.data_saida = data_saida;
    }   

    public int getId_hotel() {
        return id_hotel;
    }

    public void setId_hotel(int id_hotel) {
        this.id_hotel = id_hotel;
    }

    public Date getData_entrada() {
        return data_entrada;
    }

    public void setData_entrada(Date data_entrada) {
        this.data_entrada = data_entrada;
    }

    public Date getData_saida() {
        return data_saida;
    }

    public void setData_saida(Date data_saida) {
        this.data_saida = data_saida;
    }
}
