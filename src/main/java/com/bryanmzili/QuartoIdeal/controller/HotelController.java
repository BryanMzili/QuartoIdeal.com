package com.bryanmzili.QuartoIdeal.controller;

import com.bryanmzili.QuartoIdeal.data.HotelEntity;
import com.bryanmzili.QuartoIdeal.model.HotelAvaliado;
import com.bryanmzili.QuartoIdeal.service.HotelService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/hotel")
@CrossOrigin(origins = "localhost")
public class HotelController {

    @Autowired
    HotelService hotelService;

    @GetMapping("/listar")
    public ResponseEntity<List> getAllHotel() {
        List<HotelAvaliado> hoteis = hotelService.listarTodosHoteis();
        return new ResponseEntity<>(hoteis, HttpStatus.OK);
    }
    
    @PostMapping("/pesquisar/{id}")
    public ResponseEntity<HotelEntity> buscarHotel(@PathVariable Integer id) {
        HotelEntity hotel = hotelService.listarHotelEntityById(id);
        return new ResponseEntity<>(hotel, HttpStatus.OK);
    }
}
