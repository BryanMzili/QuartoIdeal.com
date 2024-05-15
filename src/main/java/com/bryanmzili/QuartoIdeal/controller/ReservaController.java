package com.bryanmzili.QuartoIdeal.controller;

import com.bryanmzili.QuartoIdeal.data.ReservaEntity;
import com.bryanmzili.QuartoIdeal.data.UsuarioEntity;
import com.bryanmzili.QuartoIdeal.model.Cartao;
import com.bryanmzili.QuartoIdeal.model.Usuario;
import com.bryanmzili.QuartoIdeal.service.ReservaService;
import com.bryanmzili.QuartoIdeal.service.UsuarioService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reservas")
@CrossOrigin(origins = "localhost")
public class ReservaController {

    @Autowired
    ReservaService reservaService;

    @Autowired
    UsuarioService usuarioService;

    @GetMapping("/listar")
    public ResponseEntity<List> getAllReservas() {
        List<ReservaEntity> reservas = reservaService.listarTodasReservas();
        return new ResponseEntity<>(reservas, HttpStatus.OK);
    }

    @PostMapping("/addCarrinho")
    public ResponseEntity<String> addReservaCarrinho(@RequestBody ReservaEntity reserva, HttpServletRequest request) {

        Usuario sessao = lerSessao(request);
        if (sessao != null) {
            UsuarioEntity usuario = usuarioService.listarUsuarioByUsuarioAndSenha(sessao);

            reserva.setCliente(usuario);
            reserva.setCarrinho(true);

            reservaService.criarReserva(reserva);
            return new ResponseEntity<>("Adicionado ao Carrinho", HttpStatus.OK);
        }
        return new ResponseEntity<>("Adicionar Carrinho localStorage", HttpStatus.OK);
    }

    @GetMapping("/removerCarrinho/{id}")
    public ResponseEntity<String> removerReservaCarrinho(@PathVariable Integer id, HttpServletRequest request) {

        Usuario sessao = lerSessao(request);
        if (sessao != null) {
            UsuarioEntity usuario = usuarioService.listarUsuarioByUsuarioAndSenha(sessao);

            if (reservaService.removerReservaByCarrinhoUsuario(id, usuario)) {
                return new ResponseEntity<>("Item Removido do Carrinho", HttpStatus.OK);
            }
        }
        return new ResponseEntity<>("Erro", HttpStatus.OK);
    }

    @GetMapping("/limparCarrinho")
    public ResponseEntity<String> limparCarrinho(HttpServletRequest request) {

        Usuario sessao = lerSessao(request);
        if (sessao != null) {
            UsuarioEntity usuario = usuarioService.listarUsuarioByUsuarioAndSenha(sessao);

            if (reservaService.limparReservaByCarrinhoUsuario(usuario)) {
                return new ResponseEntity<>("Carrinho Limpo", HttpStatus.OK);
            }
        }
        return new ResponseEntity<>("Erro", HttpStatus.OK);
    }

    @PostMapping("/finalizarReserva")
    public ResponseEntity<String> finalizarReserva(HttpServletRequest request, @RequestBody Cartao cartao) {
        if (cartao.getMetodo().equals("CARTAO") || cartao.getMetodo().equals("PIX")) {
            List<ReservaEntity> reservas = lerSessaoPagamento(request);
            if (reservas != null) {
                for(ReservaEntity reserva: reservas){
                    reserva.setCarrinho(false);
                    reservaService.criarReserva(reserva);
                }
                
                HttpSession ses = request.getSession();
                ses.setAttribute("pagamento", null);
                ses.setAttribute("pagamentoEfetuado", true);
                return new ResponseEntity<>("Pagamento Finalizado", HttpStatus.OK);
            }
        }

        return new ResponseEntity<>("Erro ao efetuar pagamento", HttpStatus.OK);
    }

    public Usuario lerSessao(HttpServletRequest request) {
        HttpSession ses = request.getSession();
        Usuario sesProp = null;
        if (ses != null && ses.getAttribute("usuario") != null) {
            sesProp = (Usuario) ses.getAttribute("usuario");
        }

        return sesProp;
    }

    public List<ReservaEntity> lerSessaoPagamento(HttpServletRequest request) {
        HttpSession ses = request.getSession();
        List<ReservaEntity> sesProp = null;
        if (ses != null && ses.getAttribute("pagamento") != null) {
            sesProp = (List<ReservaEntity>) ses.getAttribute("pagamento");
        }

        return sesProp;
    }

}
