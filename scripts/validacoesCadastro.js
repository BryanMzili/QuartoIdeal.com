function validarSenha(field, msg_field) {
    let senha = field.value;

    if (vazio(field, msg_field, 'Senha')) {
        return -1;
    }

    if (senha.length < 8) {
        return 0;
    }

    return 1;
}

function dataValida(text) {
    if (text.length < 10) {
        return false;
    }

    let data = new Date(formatarData(text));
    data.setHours(data.getHours() + 3);

    if (data == 'Invalid Date') {
        return false;
    }

    if (new Date() < data) {
        return false;
    }

    if (new Date('1920-01-01') > data) {
        return false;
    }

    return true;
}

function isEmail(field, msg_field) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (vazio(field, msg_field, 'E-mail')) {
        return false;
    }

    if (!regex.test(field.value)) {
        msg_field.textContent = 'E-mail inválido';
        msgErro(field);
        field.addEventListener('input', removeMsg);
    }

    return regex.test(field.value);
}

function formatarData(input) {
    const partes = input.split('/');
    const dataFormatada = partes.reverse().join('-');
    return dataFormatada;
}

function next(event) {
    if (event.key == 'Enter') {
        if (event.target.id == 'field_1') {
            field_2.focus();
        }

        if (event.target.id == 'field_2') {
            verificar();
        }
    }
}