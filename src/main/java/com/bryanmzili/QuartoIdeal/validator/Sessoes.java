package com.bryanmzili.QuartoIdeal.validator;

import com.bryanmzili.QuartoIdeal.data.ReservaEntity;
import com.bryanmzili.QuartoIdeal.model.Usuario;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import java.util.List;

public class Sessoes {
    public static Usuario lerSessao(HttpServletRequest request) {
        HttpSession ses = request.getSession();
        Usuario sesProp = null;
        if (ses != null && ses.getAttribute("usuario") != null) {
            sesProp = (Usuario) ses.getAttribute("usuario");
        }

        return sesProp;
    }

    public static List<ReservaEntity> lerSessaoPagamento(HttpServletRequest request) {
        HttpSession ses = request.getSession();
        List<ReservaEntity> sesProp = null;
        if (ses != null && ses.getAttribute("pagamento") != null) {
            sesProp = (List<ReservaEntity>) ses.getAttribute("pagamento");
        }

        return sesProp;
    }
    
    public static boolean lerSessaoPagamentoEfetuado(HttpServletRequest request) {
        HttpSession ses = request.getSession();
        boolean sesProp = false;
        if (ses != null && ses.getAttribute("pagamentoEfetuado") != null) {
            sesProp = (boolean) ses.getAttribute("pagamentoEfetuado");
        }

        return sesProp;
    }
}
