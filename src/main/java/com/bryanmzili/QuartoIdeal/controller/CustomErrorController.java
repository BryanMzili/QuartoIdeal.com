package com.bryanmzili.QuartoIdeal.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CustomErrorController implements ErrorController {

    private static final String ERROR_PATH = "/error";

    @RequestMapping(ERROR_PATH)
    public String handleError() {
        return "redirect:/QuartoIdeal/pages/pagina-nao-encontrada";
    }

    public String getErrorPath() {
        return ERROR_PATH;
    }
}
