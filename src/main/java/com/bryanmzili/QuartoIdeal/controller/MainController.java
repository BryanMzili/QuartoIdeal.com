package com.bryanmzili.QuartoIdeal.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping("/QuartoIdeal")
    public String index(Model model) {
        return "index";
    }

    @GetMapping("/QuartoIdeal/")
    public String retornaIndex(Model model) {
        return "redirect:/QuartoIdeal";
    }


    @GetMapping("/QuartoIdeal/pages/antigasReservas")
    public String antigasReservas(Model model) {
        return "antigasReservas";
    }

    @GetMapping("/QuartoIdeal/pages/cadastro")
    public String cadastro(Model model) {
        return "cadastro";
    }

    @GetMapping("/QuartoIdeal/pages/carrinho")
    public String carrinho(Model model) {
        return "carrinho";
    }

    @GetMapping("/QuartoIdeal/pages/hotel")
    public String hotel(Model model) {
        return "hotel";
    }

    @GetMapping("/QuartoIdeal/pages/login")
    public String login(Model model) {
        return "login";
    }

    @GetMapping("/QuartoIdeal/pages/pagamento")
    public String pagamento(Model model) {
        return "pagamento";
    }

    @GetMapping("/QuartoIdeal/pages/pagamentoEfetuado")
    public String pagamentoEfetuado(Model model) {
        return "pagamentoEfetuado";
    }
}
