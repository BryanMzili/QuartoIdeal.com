package com.bryanmzili.QuartoIdeal.validator;

import com.bryanmzili.QuartoIdeal.data.ReservaEntity;
import com.bryanmzili.QuartoIdeal.service.ReservaService;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Random;

public class Verificacoes {

    public static boolean verificarDatas(ReservaEntity reserva) {
        Date data_entrada = reserva.getData_entrada();
        Date data_saida = reserva.getData_saida();

        LocalDate hoje = LocalDate.now();

        LocalDate dataEntradaLocal = data_entrada.toLocalDate();
        LocalDate dataSaidaLocal = data_saida.toLocalDate();

        if (dataEntradaLocal.isBefore(hoje)) {
            return false;
        }

        if (!dataSaidaLocal.isAfter(dataEntradaLocal)) {
            return false;
        }

        return true;
    }

    public static int calcularCodigo(ReservaService reservaService) {
        do {
            Random random = new Random();
            int numeroAleatorio = random.nextInt(9000) + 1000; //número de 4 digitos

            if (!reservaService.codigoExistente(numeroAleatorio)) {
                return numeroAleatorio;
            }
        } while (true);
    }

    public static String converterData(Date data) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        java.util.Date utilDate = new java.util.Date(data.getTime());

        return dateFormat.format(utilDate);
    }
}
