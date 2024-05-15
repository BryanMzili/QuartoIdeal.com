package com.bryanmzili.QuartoIdeal.model;

import com.bryanmzili.QuartoIdeal.data.HotelEntity;
import com.bryanmzili.QuartoIdeal.data.ReservaEntity;
import com.bryanmzili.QuartoIdeal.data.UsuarioEntity;
import java.text.SimpleDateFormat;

public class ReservaCalculada {

    private Integer id;

    private UsuarioEntity cliente;
    private HotelEntity hotel;

    private String data_entrada;
    private String data_saida;

    private double valor;
    
    public ReservaCalculada() {
    }

    public ReservaCalculada(ReservaEntity reserva) {
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");

        this.id = reserva.getId();
        this.cliente = reserva.getCliente();
        this.hotel = reserva.getHotel();
        this.data_entrada = sdf.format(reserva.getData_entrada());
        this.data_saida = sdf.format(reserva.getData_saida());
    }
    
    public ReservaCalculada(ReservaEntity reserva, double valor) {
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");

        this.id = reserva.getId();
        this.cliente = reserva.getCliente();
        this.hotel = reserva.getHotel();
        this.data_entrada = sdf.format(reserva.getData_entrada());
        this.data_saida = sdf.format(reserva.getData_saida());
        this.valor = valor;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public UsuarioEntity getCliente() {
        return cliente;
    }

    public void setCliente(UsuarioEntity cliente) {
        this.cliente = cliente;
    }

    public HotelEntity getHotel() {
        return hotel;
    }

    public void setHotel(HotelEntity hotel) {
        this.hotel = hotel;
    }

    public String getData_entrada() {
        return data_entrada;
    }

    public void setData_entrada(String data_entrada) {
        this.data_entrada = data_entrada;
    }

    public String getData_saida() {
        return data_saida;
    }

    public void setData_saida(String data_saida) {
        this.data_saida = data_saida;
    }

    public double getValor() {
        return valor;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }
}
