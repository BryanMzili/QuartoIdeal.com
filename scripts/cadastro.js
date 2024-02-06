var field_1 = document.querySelector("#field_1");
var field_2 = document.querySelector("#field_2");
var msg_field1 = document.querySelector("#msg_field1");
var msg_field2 = document.querySelector("#msg_field2");
var btn_cadastrar = document.querySelector("#cadastrar");
var etapa = document.querySelector('#state');
var aux = 0;

const pessoa = {};
const chave = {};

field_1.addEventListener('keydown', next);
field_2.addEventListener('keydown', next);
field_2.addEventListener('input', maskCpf);

attState();

field_1.value = 'Bryan';
field_2.value = '000.000.000-00';
verificar();
field_1.value = '19/03/2000';
field_2.value = 'Endereço';
verificar();
field_1.value = 'bryan@gmail.com';
field_2.value = '(00)00000-0000';
verificar();
field_1.value = 'bryan';
field_2.value = 'Bryan123@';

function limpar() {
    location.reload();
}

function cadastrar() {
    localStorage.setItem(JSON.stringify(chave), JSON.stringify(pessoa));
}

function Login() {
    window.location.href = "login.html";
}

function attState() {
    etapa.innerHTML = 'Etapa ' + (aux + 1) + ' de 4';
}

function verificar() {
    switch (aux) {
        case 0:
            case_0();
            attState()
            break;
        case 1:
            case_1();
            attState()
            break;
        case 2:
            case_2();
            attState()
            break;
        case 3:
            case_3();
            attState()
            break;
    }
}

function case_0() {
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
    let bool2 = vazio(field_2, msg_field2, 'Endereço');
    let bool1 = vazio(field_1, msg_field1, 'Data de Nascimento');

    if (!bool1 && !dataValida(field_1.value)) {
        msg_field1.textContent = 'Data de nascimento inválida';
        msgErro(field_1);
        field_1.addEventListener('input', removeMsg);
        field_1.focus();
    } else if (!bool1 && !bool2) {
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
    } else if (bool1 && field_2.value.length == 14) {
        aux = 3;
        pessoa.email = field_1.value;
        pessoa.contato = field_2.value;
        field_1.value = ''; field_2.value = '';
        field_1.placeholder = 'Usuário';
        field_2.placeholder = 'Senha';
        field_1.focus();
        field_2.removeEventListener('input', maskContact);
        openMessage('Falta pouco para a conclusão do seu cadastro!!!<br><br>Para finalizarmos é necessário que você nos informe um usuário e senha que será utilizado para você acessar a sua conta dentro do nosso site.');
        field_2.setAttribute('type', 'password');
        btn_cadastrar.innerHTML = 'CADASTRAR';
    }
}

function case_3() {
    let bool2 = validarSenha(field_2, msg_field2);
    let bool1 = vazio(field_1, msg_field1, 'Usuário');

    if (bool2 == 0) {
        msg_field2.textContent = 'Senha inválida';
        msgErro(field_2);
        field_2.addEventListener('input', removeMsg);
        field_2.focus();
    } else if (!bool1 && bool2 == 1) {
        chave.usuario = field_1.value;
        chave.senha = field_2.value;
        openMessage('Cadastro finalizado!!!<br><br>Você será redirecionado para a tela de Login');
        cadastrar();
    }
}

// function obterNavegador() {
//     var navegador = "Desconhecido";

//     if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
//         navegador = 'Opera';
//     } else if (navigator.userAgent.indexOf("Chrome") != -1) {
//         navegador = 'Google Chrome';
//     } else if (navigator.userAgent.indexOf("Safari") != -1) {
//         navegador = 'Safari';
//     } else if (navigator.userAgent.indexOf("Firefox") != -1) {
//         navegador = 'Mozilla Firefox';
//     } else if (navigator.userAgent.indexOf("Edge") != -1) {
//         navegador = 'Edge';
//     } else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)){
//         navegador = 'Internet Explorer';
//     } else {
//         navegador = 'Outro';
//     }

//     return navegador;
// }

// Exemplo de uso
// var nomeDoNavegador = obterNavegador();
// console.log("Você está usando o navegador:", nomeDoNavegador);
// console.log("Você está usando o navegador:", navigator.userAgent);
