function telaCadastro() {
    window.location.href = "../";
}

function login() {
    var usuario = document.querySelector("#usuario");
    var senha = document.querySelector("#senha");

    const chave = {};
    chave.usuario = usuario.value;
    chave.senha = senha.value;

    const pessoa = localStorage.getItem(JSON.stringify(chave));

    if (pessoa != null) {
        var token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        sessionStorage.setItem('token', token);

        openMessage('Login feito com sucesso');
        setTimeout(function (event) { window.location.href = "../" }, 3000);
    }else{
        openMessage('Usuário ou senha incorreto(s)');
    }
}

var btn_forgot = document.querySelector('#forgot-password');
btn_forgot.addEventListener('click', forgotPassword);

function forgotPassword() {
    alert('Esta Funcionalidade está indisponível no momento.');
}