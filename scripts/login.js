function telaCadastro() {
    window.location.href = "home.html";
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
        setTimeout(function (event) { window.location.href = "home.html" }, 3000);
    }else{
        openMessage('Usuário ou senha incorreto(s)');
    }
}

var btn_forgot = document.querySelector('#forgot-password');
btn_forgot.addEventListener('click', forgotPassword);

function forgotPassword() {
    alert('Esta Funcionalidade está indisponível no momento.');
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
