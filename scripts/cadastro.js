var field_1 = document.querySelector("#field_1");
var field_2 = document.querySelector("#field_2");
var btn_cadastrar = document.querySelector("#cadastrar");
var aux = 0;

const pessoa = {};
const chave = {};

field_1.addEventListener('keydown', next);
field_2.addEventListener('keydown', next);
field_2.addEventListener('input', maskCpf);

function cadastrar() {
    localStorage.setItem(JSON.stringify(chave), JSON.stringify(pessoa));
}

function Login() {
    window.location.href = "login.html";
}

function limpar() {
    document.querySelector("#field_1").value = "";
    document.querySelector("#field_2").value = "";
    aux = 0;
    field_1.placeholder = 'Nome Completo';
    field_2.placeholder = 'CPF xxx.xxx.xxx-xx';
    field_2.addEventListener('input', maskCpf);
    field_1.removeEventListener('input', maskDate);
    field_2.removeEventListener('input', maskContact);
    field_1.focus();
    field_2.setAttribute('type', 'text');
    btn_cadastrar.innerHTML = 'CONTINUAR';
}

function openMessage(text) {
    let background = document.createElement('div');
    let message = document.createElement('div');
    let close = document.createElement('button');

    background.style.backgroundColor = 'rgb(128, 128, 128,0.6)';
    background.style.width = '200vh';
    background.style.height = '100vh';
    background.style.position = 'absolute';
    background.style.top = 0;
    background.style.right = 0;
    background.style.display = 'flex';
    background.style.flexDirection = 'column';
    background.style.justifyContent = 'center';
    background.style.alignItems = 'center';
    background.style.color = '#000';

    message.style.backgroundColor = '#FFF';
    message.style.width = '50%';
    message.style.height = '43%';
    message.style.borderRadius = '30px';
    message.style.fontSize = '160%';
    message.style.padding = '2%';
    message.setAttribute('class', 'poppins');
    message.style.fontWeight = '600';
    message.innerHTML = text;
    message.style.color = '#000';

    close.style.backgroundColor = '#FFF';
    close.style.width = '40%';
    close.style.height = '25%';
    close.style.borderRadius = '30px';
    close.style.fontSize = '150%';
    close.style.position = 'relative';
    close.style.left = '200px';
    close.style.color = '#000';

    close.setAttribute('class', 'poppins');
    close.style.fontWeight = '600';
    close.innerHTML = 'OK';

    message.appendChild(close);
    background.appendChild(message);
    document.body.appendChild(background);

    close.focus();
    setTimeout(function () { close.addEventListener('click', fechar) }, 2000);

    function fechar(event) {
        background.remove();
    }
}

function verificar() {
    switch (aux) {
        case 0:
            case_0();
            break;
        case 1:
            case_1();
            break;
        case 2:
            case_2();
            break;
        case 3:
            case_3();
            break;

    }
}

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

function isEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
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

function formatarData(input) {
    const partes = input.split('/');
    const dataFormatada = partes.reverse().join('-');
    return dataFormatada;
}

function maskCpf(event) {
    let inputValue = event.target.value.replace(/\D/g, '');

    if (inputValue.length > 11) {
        inputValue = inputValue.slice(0, 11);
    }

    let maskedValue = '';
    for (let i = 0; i < inputValue.length; i++) {
        if (i === 3 || i === 6) {
            maskedValue += '.';
        } else if (i === 9) {
            maskedValue += '-';
        }
        maskedValue += inputValue[i];
    }

    event.target.value = maskedValue;
}

function maskDate(event) {
    let inputValue = event.target.value.replace(/\D/g, '');

    if (inputValue.length > 8) {
        inputValue = inputValue.slice(0, 8);
    }

    let maskedValue = '';
    for (let i = 0; i < inputValue.length; i++) {
        if (i === 2 || i === 4) {
            maskedValue += '/';
        }
        maskedValue += inputValue[i];
    }

    event.target.value = maskedValue;
}

function maskContact(event) {
    let inputValue = event.target.value.replace(/\D/g, '');

    if (inputValue.length > 11) {
        inputValue = inputValue.slice(0, 11);
    }

    let maskedValue = '';
    for (let i = 0; i < inputValue.length; i++) {
        if (i === 0) {
            maskedValue += '(';
        } else if (i === 2) {
            maskedValue += ')';//(51)98992-5520
        } else if (i === 7) {
            maskedValue += '-';
        }
        maskedValue += inputValue[i];
    }

    event.target.value = maskedValue;
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

function case_0() {
    if (field_1.value.replaceAll(" ", "") == '') {
        alert('Você não digitou nada no campo Nome!!!\nDigite seu nome para continuar o cadastro');
        field_1.value = '';
        field_1.focus();
    } else if (field_2.value.length != 14) {
        alert('Você digitou um CPF inválido!!!\nDigite um CPF válido para continuar o cadastro');
        field_2.focus();
    } else {
        aux = 1;
        pessoa.nome = field_1.value;
        pessoa.cpf = field_2.value;
        field_1.value = ''; field_2.value = '';
        field_1.placeholder = 'Data de Nascimento (dd/mm/yyyy)';
        field_2.placeholder = 'Endereço';
        field_2.removeEventListener('input', maskCpf);
        field_1.addEventListener('input', maskDate);
        field_1.focus();
    }
}

function case_1() {
    if (!dataValida(field_1.value)) {
        alert('Você digitou uma data inválida!!!\nDigite uma data válida para continuar o cadastro');
        field_1.focus();
    } else if (field_2.value.replaceAll(" ", "") == '') {
        alert('Você não digitou nada no campo Endereço!!!\nDigite seu Endereço para continuar o cadastro');
        field_2.focus();
    } else {
        aux = 2;
        pessoa.dataNascimento = formatarData(field_1.value);
        pessoa.endereco = formatarData(field_2.value);
        field_1.value = ''; field_2.value = '';
        field_1.placeholder = 'E-mail';
        field_2.placeholder = 'Contato (xx) xxxxx-xxxx';
        field_1.removeEventListener('input', maskDate);
        field_2.addEventListener('input', maskContact);
        field_1.focus();
    }
}

function case_2() {
    if (!isEmail(field_1.value)) {
        alert('Você digitou um E-mail inválido!!!\nDigite um E-mail válido para continuar o cadastro');
        field_1.value = '';
        field_1.focus();
    } else if (field_2.value.length < 14) {
        alert('Você digitou um contato inválido!!!\nDigite um contato válido para continuar o cadastro');
        field_2.focus();
    } else {
        aux = 3;
        pessoa.email = field_1.value;
        pessoa.contato = field_2.value;
        field_1.value = ''; field_2.value = '';
        field_1.placeholder = 'Usuário';
        field_2.placeholder = 'Senha';
        field_1.focus();
        field_2.removeEventListener('input', maskContact);
        openMessage('Falta pouco para a conclusão do seu cadastro!!!<br><br>Para finalizarmos é necessário que você nos informe um usuário e senha que será utilizado para você acessar a sua conta dentro do nosso site.<br><br>');
        field_2.setAttribute('type', 'password');
        btn_cadastrar.innerHTML = 'CADASTRAR';
    }
}

function case_3() {
    if (field_1.value.replaceAll(" ", "") == '') {
        alert('Você não digitou nada no campo Usuário!!!\nDigite um usuário válido para continuar o cadastro');
        field_1.value = '';
        field_1.focus();
    } else if (!validarSenha(field_2.value)) {
        alert('Você digitou uma senha inválida!!!\nDigite uma senha válida para continuar o cadastro');
        field_2.focus();
    } else {
        chave.usuario = field_1.value;
        chave.senha = field_2.value;
        limpar();
        openMessage('Cadastro finalizado!!!<br>Você será redirecionado para a tela de Login');
        cadastrar();
        setTimeout(function (event) { window.location.href = "login.html" }, 3000);
    }
}