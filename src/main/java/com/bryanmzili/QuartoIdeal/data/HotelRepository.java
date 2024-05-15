package com.bryanmzili.QuartoIdeal.data;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HotelRepository extends JpaRepository<HotelEntity, Integer> {

    List<HotelEntity> findByNomeContaining(String nome);

    HotelEntity findById(int id);
}
