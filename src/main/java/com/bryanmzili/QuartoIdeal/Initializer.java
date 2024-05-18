package com.bryanmzili.QuartoIdeal;

import com.bryanmzili.QuartoIdeal.data.ReservaEntity;
import com.bryanmzili.QuartoIdeal.service.ReservaService;
import jakarta.annotation.PostConstruct;
import java.sql.Date;
import java.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Component;

@Component
public class Initializer {

    @Autowired
    ReservaService reservaService;

    @PostConstruct
    public void init() {
        //Esse código serve para remover códigos expirados do sistema
        for (ReservaEntity reserva : reservaService.listarTodasReservas()) {
            if (isDateBeforeToday(reserva.getData_saida())) {
                if (reserva.getCodigo() != 0) {
                    reserva.setCodigo(0);
                    reservaService.criarReserva(reserva);// nesse caso é para atualizar informações
                }
            }
        }
    }

    public boolean isDateBeforeToday(Date data) {
        LocalDate localDate = data.toLocalDate();
        LocalDate today = LocalDate.now();

        return localDate.isBefore(today);
    }
}
