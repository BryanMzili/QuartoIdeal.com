package com.bryanmzili.QuartoIdeal.controller;

import com.bryanmzili.QuartoIdeal.data.ReservaEntity;
import com.bryanmzili.QuartoIdeal.data.UsuarioEntity;
import com.bryanmzili.QuartoIdeal.model.Cartao;
import com.bryanmzili.QuartoIdeal.model.EsqueciMinhaSenha;
import com.bryanmzili.QuartoIdeal.model.HotelAvaliado;
import com.bryanmzili.QuartoIdeal.model.ReservaCalculada;
import com.bryanmzili.QuartoIdeal.model.Usuario;
import com.bryanmzili.QuartoIdeal.service.HotelService;
import com.bryanmzili.QuartoIdeal.service.ReservaService;
import com.bryanmzili.QuartoIdeal.service.UsuarioService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class MainController {

    @Autowired
    HotelService hotelService;

    @Autowired
    ReservaService reservaService;

    @Autowired
    UsuarioService usuarioService;

    @GetMapping("/QuartoIdeal")
    public String index(Model model, @RequestParam(defaultValue = "") String nome_hotel) {
        if (nome_hotel.replaceAll(" ", "").equals("")) {
            List<HotelAvaliado> hoteis = hotelService.listarTodosHoteis();
            model.addAttribute("hoteis", hoteis);
        } else {
            List<HotelAvaliado> hoteis = hotelService.listarHotelByNome(nome_hotel);
            model.addAttribute("hoteis", hoteis);
        }

        return "index";
    }

    @GetMapping("/QuartoIdeal/")
    public String retornaIndex(Model model) {
        return "redirect:/QuartoIdeal";
    }

    @GetMapping("/QuartoIdeal/pages/antigasReservas")
    public String antigasReservas(Model model, HttpServletRequest request) {
        Usuario sessao = lerSessao(request);
        if (sessao != null) {
            UsuarioEntity usuario = usuarioService.listarUsuarioByUsuarioAndSenha(sessao);
            if (usuario != null) {
                List<ReservaEntity> reservas = reservaService.listarReservaByUsuario(usuario);
                List<ReservaCalculada> reservasCalculadas = new ArrayList();
                for (ReservaEntity reserva : reservas) {
                    reservasCalculadas.add(new ReservaCalculada(reserva));
                }
                model.addAttribute("reservas", reservasCalculadas);
            }
        }
        return "antigasReservas";
    }

    @GetMapping("/QuartoIdeal/pages/cadastro")
    public String cadastro(Model model) {
        return "cadastro";
    }

    @GetMapping("/QuartoIdeal/pages/carrinho")
    public String carrinho(Model model, HttpServletRequest request) {

        Usuario sessao = lerSessao(request);
        if (sessao != null) {
            UsuarioEntity usuario = usuarioService.listarUsuarioByUsuarioAndSenha(sessao);

            List<ReservaEntity> reservas = reservaService.listarReservaByCarrinhoUsuario(usuario);
            List<ReservaCalculada> reservasCalculadas = new ArrayList();
            for (ReservaEntity reserva : reservas) {

                long diferencaMillis = Math.abs(reserva.getData_saida().getTime() - reserva.getData_entrada().getTime());
                long diferencaDias = TimeUnit.DAYS.convert(diferencaMillis, TimeUnit.MILLISECONDS);

                reservasCalculadas.add(new ReservaCalculada(reserva, diferencaDias * reserva.getHotel().getValor()));
            }
            model.addAttribute("reservas", reservasCalculadas);
            model.addAttribute("logado", true);
        } else {
            model.addAttribute("logado", false);
        }

        return "carrinho";
    }

    @GetMapping("/QuartoIdeal/pages/hotel/{id}")
    public String hotel(Model model, @PathVariable Integer id, @ModelAttribute ReservaEntity reserva) {
        HotelAvaliado hotel = hotelService.listarHotelById(id);
        if (hotel == null) {
            return "redirect:/QuartoIdeal";
        } else {
            model.addAttribute("hotel", hotel);
            reserva.setHotel(hotelService.listarHotelEntityById(hotel.getId()));
            model.addAttribute("reserva", reserva);
            return "hotel";
        }
    }

    @GetMapping("/QuartoIdeal/pages/login")
    public String login(Model model, @ModelAttribute Usuario usuario) {
        model.addAttribute("usuario", usuario);
        return "login";
    }

    @GetMapping("/QuartoIdeal/pages/esqueci-minha-senha")
    public String esqueciSenha(Model model, @ModelAttribute EsqueciMinhaSenha cpf) {
        model.addAttribute("cpf", cpf);
        return "esqueciMinhaSenha";
    }

    //Solitar permissão e geração da sessão para efetuar compra
    @PostMapping("/QuartoIdeal/pages/pagamento")
    public ResponseEntity<String> pagamentoReserva(Model model, @RequestBody ReservaEntity reserva, HttpServletRequest request) {

        Usuario sessao = lerSessao(request);
        if (sessao != null) {
            UsuarioEntity usuario = usuarioService.listarUsuarioByUsuarioAndSenha(sessao);

            reserva.setCliente(usuario);
            reserva.setCarrinho(false);

            if (verificarDatas(reserva)) {
                List<ReservaEntity> reservas = new ArrayList();
                reservas.add(reserva);

                HttpSession ses = request.getSession();
                ses.setAttribute("pagamento", reservas);
                return new ResponseEntity<>("Redirecionar Tela Pagamento", HttpStatus.OK);
            }

            return new ResponseEntity<>("Alguma das datas é inválida", HttpStatus.OK);
        }
        return new ResponseEntity<>("Usuário não encontrado", HttpStatus.OK);
    }

    //Solitar permissão e geração da sessão para efetuar pagamento de carrinho
    @PostMapping("/QuartoIdeal/pages/pagamentoCarrinho")
    public ResponseEntity<String> pagamentoCarrinho(Model model, HttpServletRequest request) {

        Usuario sessao = lerSessao(request);
        if (sessao != null) {
            UsuarioEntity usuario = usuarioService.listarUsuarioByUsuarioAndSenha(sessao);

            List<ReservaEntity> reservas = reservaService.listarReservaByCarrinhoUsuario(usuario);

            HttpSession ses = request.getSession();
            ses.setAttribute("pagamento", reservas);

            return new ResponseEntity<>("Redirecionar Tela Pagamento", HttpStatus.OK);
        }
        return new ResponseEntity<>("Usuário não encontrado", HttpStatus.OK);
    }

    //Receber página no Navegador
    @GetMapping("/QuartoIdeal/pages/pagamento")
    public String pagamentoReserva(Model model, HttpServletRequest request, @ModelAttribute Cartao cartao) {

        List<ReservaEntity> reservas = lerSessaoPagamento(request);
        if (reservas != null) {
            double valor = 0.0;
            for (ReservaEntity reserva : reservas) {
                reserva.setHotel(hotelService.listarHotelEntityById(reserva.getHotel().getId()));

                long diferencaMillis = Math.abs(reserva.getData_saida().getTime() - reserva.getData_entrada().getTime());
                long diferencaDias = TimeUnit.DAYS.convert(diferencaMillis, TimeUnit.MILLISECONDS);

                valor += diferencaDias * reserva.getHotel().getValor();
            }

            model.addAttribute("valor", valor);
            model.addAttribute("cartao", cartao);
            return "pagamento";
        }
        return "";
    }

    @GetMapping("/QuartoIdeal/pages/pagamentoEfetuado")
    public String pagamentoEfetuado(Model model, HttpServletRequest request) {
        if (lerSessaoPagamentoEfetuado(request)) {
            HttpSession ses = request.getSession();
            ses.setAttribute("pagamentoEfetuado", false);
            return "pagamentoEfetuado";
        }
        return "";
    }

    @GetMapping("/QuartoIdeal/pages/pagina-nao-encontrada")
    public String erro(Model model, HttpServletRequest request) {
        return "notFound";
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

    public boolean lerSessaoPagamentoEfetuado(HttpServletRequest request) {
        HttpSession ses = request.getSession();
        boolean sesProp = false;
        if (ses != null && ses.getAttribute("pagamentoEfetuado") != null) {
            sesProp = (boolean) ses.getAttribute("pagamentoEfetuado");
        }

        return sesProp;
    }
    
    public boolean verificarDatas(ReservaEntity reserva) {
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
}
