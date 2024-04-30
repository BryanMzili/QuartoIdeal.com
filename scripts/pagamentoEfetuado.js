document.querySelector('#registered').innerHTML = 'QUARTO IDEAL ' + new Date().getFullYear();
let segundos = 3;

criarReservas();
let reservas = JSON.parse(localStorage.getItem('reservas'));
let compra = JSON.parse(localStorage.getItem('finalizar-compra')).carrinho;

$.each(compra, function (key, value) {
    reservas.reservas.push(value);
});

salvarCarrinho(reservas)

localStorage.setItem('finalizar-compra', '{"carrinho":[]}');

function criarReservas() {
    if (localStorage.getItem('reservas') == null) {
        localStorage.setItem('reservas', '{"reservas":[]}');
    }
}

function salvarCarrinho(reservas) {
    localStorage.setItem('reservas', JSON.stringify(reservas));
}

function iniciarContador() {
    if (segundos >= 0) {
        $('#segundo').text(segundos + ' segundo(s)');
        segundos--;
        setTimeout(iniciarContador, 1500);
    } else {
        window.location.href = '../index.html';
    }
}

iniciarContador(); 