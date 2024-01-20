function validarSenha(senha) {
    if (senha.length < 8) {
        return false;
    }

    if (!/[A-Z]/.test(senha)) {
        return false;
    }

    if (!/[a-z]/.test(senha)) {
        return false;
    }

    if (!/\d/.test(senha)) {
        return false;
    }

    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(senha)) {
        return false;
    }

    return true;
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

function isEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
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