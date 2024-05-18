package com.bryanmzili.QuartoIdeal.data;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservaRepository extends JpaRepository<ReservaEntity, Integer> {

    List<ReservaEntity> findByClienteAndCarrinho(UsuarioEntity usuario, boolean carrinho);
    
    ReservaEntity findByCodigo(int codigo);

    void deleteByIdAndClienteAndCarrinho(Integer id, UsuarioEntity usuario, boolean carrinho);
    
    void deleteByClienteAndCarrinho(UsuarioEntity usuario, boolean carrinho);
}
