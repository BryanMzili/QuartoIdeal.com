package com.bryanmzili.QuartoIdeal.data;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.util.Date;
import lombok.Data;

@Data
@Entity
@Table(name = "Usuario")
public class UsuarioEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @NotNull(message = "Nome é obrigatório")
    private String nome;

    @NotNull(message = "Usuário é obrigatório")
    private String usuario;

    @NotNull(message = "Senha é obrigatório")
    @Size(min = 8, message = "A senha deve ter no mínimo 8 caracteres")
    private String senha;

    @NotBlank(message = "Contato é obrigatório")
    @Size(min = 14, max = 15, message = "Contato inválido")
    private String contato;

    @NotBlank(message = "Endereço é obrigatório")
    private String endereco;

    @NotNull(message = "CPF é obrigatório")
    @Pattern(regexp = "\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}", message = "CPF inválido")
    private String cpf;

    @NotNull(message = "Email é obrigatório")
    @Email(message = "Email inválido")
    private String email;

    @NotNull(message = "Data de Nascimento é obrigatório")
    @Column(name = "data_nascimento")
    private Date dataNascimento;

}
