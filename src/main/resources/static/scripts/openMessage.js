let background = document.createElement('div');
let message = document.createElement('div');
let close = document.createElement('button');

function openMessage(text) {
    $('body').css('overflow', 'hidden');
    background.classList.add('background-message');

    message.classList.add('poppins');
    message.classList.add('message');
    message.innerHTML = text;

    close.classList.add('poppins');
    close.classList.add('close-message');
    close.innerHTML = 'OK';

    message.appendChild(close);
    background.appendChild(message);
    document.body.appendChild(background);

    close.focus();

    close.removeEventListener('click', fechar);
    close.removeEventListener('keydown', fechar);

    close.removeEventListener('click', login);
    close.removeEventListener('keydown', login);

    close.removeEventListener('click', telaCadastro);
    close.removeEventListener('keydown', telaCadastro);

    let count = text.length;

    if (count == 196 || count == 52 || count == 33 || count == 26 || count == 20 || count == 22 || count == 48 || count == 58 || count == 12 ||
            count == 16 || count == 14 || count == 24) {
        close.addEventListener('click', fechar);
        close.addEventListener('keydown', fechar);
    } else if (count == 74 || count == 28) {
        close.addEventListener('click', login);
        close.addEventListener('keydown', login);
    } else if (count == 27) {
        close.addEventListener('click', telaCadastro);
        close.addEventListener('keydown', telaCadastro);
    } else if (count == 30) {
        close.addEventListener('click', reload);
        close.addEventListener('keydown', reload);
    }
}

function reload() {
    location.reload();
}

function fechar(event) {
    background.remove();
    $('body').css('overflow', 'visible');
}

function login() {
    window.location.href = "login";
}

function telaCadastro() {
    window.location.href = "../";
}