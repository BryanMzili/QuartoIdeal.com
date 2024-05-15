package com.bryanmzili.QuartoIdeal.data;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AvaliacaoRepository extends JpaRepository<AvaliacaoEntity, Integer> {

    @Query(value = "select * from Avaliacao where id_hotel = :idHotel", nativeQuery = true)
    List<AvaliacaoEntity> findAvaliacaoByIdHotel(@Param("idHotel") Integer idHotel);
}
