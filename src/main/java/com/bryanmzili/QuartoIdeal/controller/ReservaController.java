package com.bryanmzili.QuartoIdeal.controller;

import com.bryanmzili.QuartoIdeal.EmailService;
import com.bryanmzili.QuartoIdeal.data.ReservaEntity;
import com.bryanmzili.QuartoIdeal.data.UsuarioEntity;
import com.bryanmzili.QuartoIdeal.model.Cartao;
import com.bryanmzili.QuartoIdeal.model.Usuario;
import com.bryanmzili.QuartoIdeal.service.ReservaService;
import com.bryanmzili.QuartoIdeal.service.UsuarioService;
import com.bryanmzili.QuartoIdeal.validator.Sessoes;
import com.bryanmzili.QuartoIdeal.validator.Verificacoes;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import java.text.DecimalFormat;
import java.util.List;
import java.util.concurrent.TimeUnit;
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

    @Autowired
    EmailService emailService;

    @PostMapping("/addCarrinho")
    public ResponseEntity<String> addReservaCarrinho(@RequestBody ReservaEntity reserva, HttpServletRequest request) {

        Usuario sessao = Sessoes.lerSessao(request);
        if (sessao != null) {
            UsuarioEntity usuario = usuarioService.listarUsuarioByUsuarioAndSenha(sessao);

            reserva.setCliente(usuario);
            reserva.setCarrinho(true);
            reserva.setCodigo(0);

            if (Verificacoes.verificarDatas(reserva)) {
                reservaService.criarReserva(reserva);
                return new ResponseEntity<>("Adicionado ao Carrinho", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Alguma das datas é inválida", HttpStatus.OK);
            }
        }
        return new ResponseEntity<>("Adicionar Carrinho localStorage", HttpStatus.OK);
    }

    @GetMapping("/removerCarrinho/{id}")
    public ResponseEntity<String> removerReservaCarrinho(@PathVariable Integer id, HttpServletRequest request) {

        Usuario sessao = Sessoes.lerSessao(request);
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

        Usuario sessao = Sessoes.lerSessao(request);
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
            List<ReservaEntity> reservas = Sessoes.lerSessaoPagamento(request);
            if (reservas != null) {
                try {
                    String nomeCliente = reservas.get(0).getCliente().getNome();
                    String mensagem = "Olá " + nomeCliente + ",\n";
                    String assunto = "";
                    double valor = 0.0;

                    if (reservas.size() == 1) {
                        assunto = "Confirmação de reserva";
                        mensagem += "Agradecemos por escolher o nosso site para realizar sua reserva de Hotel."
                                + "Esta é uma confirmação de que sua reserva foi efetuada com sucesso. Abaixo estão os detalhes da sua reserva:\n";
                    } else {
                        assunto = "Confirmação de reservas";
                        mensagem += "Agradecemos por escolher o nosso site para realizar suas reservas de Hotel."
                                + "Esta é uma confirmação de que suas reservas foram efetuadas com sucesso. Abaixo estão os detalhes das suas reservas:\n";
                    }
                    for (ReservaEntity reserva : reservas) {
                        reserva.setCarrinho(false);
                        reserva.setCodigo(Verificacoes.calcularCodigo(reservaService));
                        reservaService.criarReserva(reserva);

                        long diferencaMillis = Math.abs(reserva.getData_saida().getTime() - reserva.getData_entrada().getTime());
                        long diferencaDias = TimeUnit.DAYS.convert(diferencaMillis, TimeUnit.MILLISECONDS);

                        valor += diferencaDias * reserva.getHotel().getValor();

                        String nomeHotel = reserva.getHotel().getNome();

                        mensagem += nomeHotel + " - Data Entrada: " + Verificacoes.converterData(reserva.getData_entrada())
                                + ", Data Entrada: " + Verificacoes.converterData(reserva.getData_saida())
                                + ", Código de Acesso: " + reserva.getCodigo() + "\n";
                    }

                    DecimalFormat df = new DecimalFormat("#.##");
                    mensagem += "Total do Pedido: R$ " + df.format(valor);

                    HttpSession ses = request.getSession();
                    ses.setAttribute("pagamento", null);
                    ses.setAttribute("pagamentoEfetuado", true);

                    String destinatario = reservas.get(0).getCliente().getEmail();

                    emailService.sendSimpleMessage(destinatario, assunto, mensagem);
                    return new ResponseEntity<>("Pagamento Finalizado", HttpStatus.OK);
                } catch (Exception e) {
                    System.out.println("Erro: " + e.getMessage());
                }
            }
        }

        return new ResponseEntity<>("Erro ao efetuar pagamento", HttpStatus.OK);
    }

}
