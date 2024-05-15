package com.bryanmzili.QuartoIdeal.data;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
@Table(name = "Avaliacao")
public class AvaliacaoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    
    @ManyToOne
    @JoinColumn(name = "id_usuario")
    @NotNull(message = "Usuário é obrigatório")
    private UsuarioEntity cliente;

    @ManyToOne
    @JoinColumn(name = "id_hotel")
    @NotNull(message = "Hotel é obrigatório")
    private HotelEntity hotel;

    @NotNull(message = "Nota é obrigatória")
    private double nota;

}
