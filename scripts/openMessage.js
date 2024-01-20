function openMessage(text) {
    let background = document.createElement('div');
    let message = document.createElement('div');
    let close = document.createElement('button');

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
    setTimeout(function () { close.addEventListener('click', fechar) }, 2000);

    function fechar(event) {
        background.remove();
    }
}