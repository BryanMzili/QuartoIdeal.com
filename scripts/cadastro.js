var field_1 = document.querySelector("#field_1");
var field_2 = document.querySelector("#field_2");
var btn_cadastrar = document.querySelector("#cadastrar");
var aux = 0;

const pessoa = {};
const chave = {};

field_1.addEventListener('keydown', next);
field_2.addEventListener('keydown', next);
field_2.addEventListener('input', maskCpf);

// field_1.value = 'Bryan';
// field_2.value = '000.000.000-00';
// verificar();
// field_1.value = '19/03/2000';
// field_2.value = 'Endereço';
// verificar();
// field_1.value = 'bryan@gmail.com';
// field_2.value = '(00)00000-0000';
// verificar();

 function limpar() {
    location.reload();
//     document.querySelector("#field_1").value = "";
//     document.querySelector("#field_2").value = "";
//     aux = 0;
//     field_1.placeholder = 'Nome Completo';
//     field_2.placeholder = 'CPF xxx.xxx.xxx-xx';
//     field_2.addEventListener('input', maskCpf);
//     field_1.removeEventListener('input', maskDate);
//     field_2.removeEventListener('input', maskContact);
//     field_1.focus();
//     field_2.setAttribute('type', 'text');
//     btn_cadastrar.innerHTML = 'CONTINUAR';
}

function cadastrar() {
    localStorage.setItem(JSON.stringify(chave), JSON.stringify(pessoa));
}

function Login() {
    window.location.href = "login.html";
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