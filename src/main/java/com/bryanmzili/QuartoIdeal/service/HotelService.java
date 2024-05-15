package com.bryanmzili.QuartoIdeal.service;

import com.bryanmzili.QuartoIdeal.data.AvaliacaoRepository;
import com.bryanmzili.QuartoIdeal.data.HotelEntity;
import com.bryanmzili.QuartoIdeal.data.HotelRepository;
import com.bryanmzili.QuartoIdeal.model.HotelAvaliado;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HotelService {

    @Autowired
    HotelRepository hotelRepository;

    @Autowired
    AvaliacaoRepository avaliacaoRepository;

    public HotelEntity criarHotel(HotelEntity hotel) {
        hotelRepository.save(hotel);
        return hotel;
    }
    
    public List<HotelAvaliado> listarTodosHoteis() {
        List<HotelAvaliado> hoteis = new ArrayList();

        for (HotelEntity hotel : hotelRepository.findAll()) {
            hoteis.add(new HotelAvaliado(hotel, avaliacaoRepository.findAvaliacaoByIdHotel(hotel.getId())));
        }

        return hoteis;
    }

    public List<HotelAvaliado> listarHotelByNome(String nome) {
        List<HotelAvaliado> hoteis = new ArrayList();

        for (HotelEntity hotel : hotelRepository.findByNomeContaining(nome)) {
            hoteis.add(new HotelAvaliado(hotel, avaliacaoRepository.findAvaliacaoByIdHotel(hotel.getId())));
        }

        return hoteis;
    }

    public HotelAvaliado listarHotelById(int id) {
        HotelEntity hotel = hotelRepository.findById(id);
        if (hotel == null) {
            return null;
        } else {
            return new HotelAvaliado(hotel, avaliacaoRepository.findAvaliacaoByIdHotel(hotel.getId()));
        }
    }

    public HotelEntity listarHotelEntityById(int id) {
        return hotelRepository.findById(id);
    }

}
