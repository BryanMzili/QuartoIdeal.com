package com.bryanmzili.QuartoIdeal.service;

import com.bryanmzili.QuartoIdeal.data.ReservaEntity;
import com.bryanmzili.QuartoIdeal.data.ReservaRepository;
import com.bryanmzili.QuartoIdeal.data.UsuarioEntity;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReservaService {

    @Autowired
    ReservaRepository reservaRepository;

    public ReservaEntity criarReserva(ReservaEntity reserva) {
        return reservaRepository.save(reserva);
    }

    public List<ReservaEntity> listarTodasReservas() {
        return reservaRepository.findAll();
    }

    public List<ReservaEntity> listarReservaByUsuario(UsuarioEntity usuario) {
        return reservaRepository.findByClienteAndCarrinho(usuario, false);
    }

    public List<ReservaEntity> listarReservaByCarrinhoUsuario(UsuarioEntity usuario) {
        return reservaRepository.findByClienteAndCarrinho(usuario, true);
    }
    
    public boolean codigoExistente(int codigo){
        ReservaEntity reserva = reservaRepository.findByCodigo(codigo);
        
        if(reserva != null){
            return true;
        }
        return false;
    }

    @Transactional
    public boolean removerReservaByCarrinhoUsuario(Integer id, UsuarioEntity usuario) {
        try {
            reservaRepository.deleteByIdAndClienteAndCarrinho(id, usuario, true);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Transactional
    public boolean limparReservaByCarrinhoUsuario(UsuarioEntity usuario) {
        try {
            reservaRepository.deleteByClienteAndCarrinho(usuario, true);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
