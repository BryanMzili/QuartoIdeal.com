function etapa_1() {
    let bool2 = vazio(field_2, msg_field2, 'CPF');
    let bool1 = vazio(field_1, msg_field1, 'Nome');

    if (!bool2 && field_2.value.length != 14) {
        msg_field2.textContent = 'CPF inválido';
        msgErro(field_2);
        field_2.addEventListener('input', removeMsg);
        if (!bool1) {
            field_2.focus();
        }
    } else if (!bool1 && field_2.value.length == 14) {
        pessoa.nome = field_1.value;
        pessoa.cpf = field_2.value;
        proximaEtapa();
    }
}

function etapa_2() {
    let bool2 = vazio(field_2, msg_field2, 'Endereço');
    let bool1 = vazio(field_1, msg_field1, 'Data de Nascimento');

    if (!bool1 && !dataValida(field_1.value)) {
        msg_field1.textContent = 'Data de nascimento inválida';
        msgErro(field_1);
        field_1.addEventListener('input', removeMsg);
        field_1.focus();
    } else if (!bool1 && !bool2) {
        pessoa.dataNascimento = formatarData(field_1.value);
        pessoa.endereco = field_2.value;
        proximaEtapa();
    }
}

function etapa_3() {
    let bool2 = vazio(field_2, msg_field2, 'Contato');
    let bool1 = isEmail(field_1, msg_field1);

    if (!bool2 && field_2.value.length < 14) {
        msg_field2.textContent = 'Contato inválido';
        msgErro(field_2);
        field_2.addEventListener('input', removeMsg);
        if (!bool1) {
            field_1.focus();
        } else {
            field_2.focus();
        }
    } else if (bool1 && field_2.value.length == 15) {
        pessoa.email = field_1.value;
        pessoa.contato = field_2.value;
        proximaEtapa();
    }
}

function etapa_4() {
    let bool2 = validarSenha(field_2, msg_field2);
    let bool1 = vazio(field_1, msg_field1, 'Usuário');

    if (bool2 == 0) {
        msg_field2.textContent = 'A senha deve conter no mínimo 8 caracteres, você digitou: ' + field_2.value.length;
        msgErro(field_2);
        field_2.addEventListener('input', removeMsg);
        field_2.focus();
    } else if (!bool1 && bool2 == 1) {
        pessoa.usuario = field_1.value;
        pessoa.senha = field_2.value;
        cadastrar();
    }
}

function proximaEtapa() {
    aux++;
    limparCampos();
    definirEtapa();
}