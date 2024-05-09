package com.bryanmzili.QuartoIdeal.data;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
@Table(name = "Hotel")
public class HotelEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @NotBlank(message = "Nome do Hotel é obrigatório")
    private String nome;

    @NotNull(message = "Nome da Imagem do Hotel é obrigatória")
    private String imagem;

    @NotBlank(message = "Região do Hotel é obrigatória")
    private String regiao;

    @NotNull(message = "Valor do Hotel é obrigatório")
    private double valor;
}
