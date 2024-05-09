package com.bryanmzili.QuartoIdeal.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HotelRepository extends JpaRepository<HotelEntity, Integer> {

    /*@Query(value = "select * from analise where id_filme = :idFilme", nativeQuery = true)
    List<AnaliseEntity> findAnaliseByIdFilme(@Param("idFilme") Integer idFilme);
    
    void deleteByFilme(FilmeEntity filme);*/
}
