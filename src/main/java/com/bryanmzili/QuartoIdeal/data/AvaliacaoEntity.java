package com.bryanmzili.QuartoIdeal.data;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
@Table(name = "Avaliacoes")
public class AvaliacaoEntity {

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
