let usuario = document.querySelector("#usuario");
let senha = document.querySelector("#senha");
let btn_forgot = document.querySelector('#forgot-password');
let larguraInicial = $(window).width();

btn_forgot.addEventListener('click', forgotPassword);

// usuario.value = 'bryan';
// senha.value = 'Bryan123@';
// login();

function login() {
    const chave = {};
    chave.usuario = usuario.value;
    chave.senha = senha.value;

    const pessoa = localStorage.getItem(JSON.stringify(chave));

    if (pessoa != null) {
        let token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        sessionStorage.setItem('token', token);
        openMessage('<br>Login feito com sucesso');
    } else {
        openMessage('<br>Usuário ou senha incorreto(s)');
    }
}

$('form').submit(function(event){
    event.preventDefault();
    login();
});

function telaCadastro() {
    window.location.href = "../";
}

function forgotPassword() {
    openMessage('Esta Funcionalidade está<br>indisponível no momento.');
}

$(window).on('resize', function () {
    let larguraAtual = $(window).width();
    if (larguraAtual !== larguraInicial) {
        location.reload();
    }
});