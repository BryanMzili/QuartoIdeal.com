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
    public String Index(Model model) {
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


    /*
    @PostMapping("/cadastro")
    public String recebeCadastro(Model model, @ModelAttribute Filme filme) {
        filme.setId(filmes.size() + 1);
        filmes.add(filme);
        return "redirect:/listagem";
    }

    @GetMapping("/listagem")
    public String mostraListagem(Model model) {
        model.addAttribute("filmes", filmes);
        return "listagem";
    }

    @GetMapping("/filme")
    public String mostraFilme(Model model, @RequestParam(defaultValue = "0") int id_filme, @ModelAttribute Analise analise) {
        if (id_filme < 1) {
            return "redirect:/listagem";
        }

        Filme filme = procurarPorId(id_filme);

        if (filme != null) {
            model.addAttribute("filme", filme);
            model.addAttribute("analises", analisesPorFilme(id_filme));
            return "filme";
        }

        return "redirect:/listagem";
    }

    @PostMapping("/filme")
    public String recebeAnalise(Model model, @ModelAttribute Analise analise) {
        analise.setId(TodasAnalises.size() + 1);
        TodasAnalises.add(analise);
        return "redirect:/filme?id_filme=" + analise.getId_filme();
    }

    public Filme procurarPorId(int id_filme) {
        for (int i = 0; i < filmes.size(); i++) {
            if (filmes.get(i).getId() == id_filme) {
                return filmes.get(i);
            }
        }
        return null;
    }

    public List<Analise> analisesPorFilme(int id_filme) {
        List<Analise> analises = new ArrayList();

        for (int i = 0; i < TodasAnalises.size(); i++) {
            if (TodasAnalises.get(i).getId_filme() == id_filme) {
                analises.add(TodasAnalises.get(i));
            }
        }

        return analises;
    }*/
}
