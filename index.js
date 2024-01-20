document.querySelector('#carrinho').addEventListener('click', abrirCarrinho);
let hotel = document.querySelectorAll('.Hotel');

function abrirCarrinho() {
    //window.location.href = 'login.html';
}

function abrirHotel() {
    alert('Hello World');
}

hotel.forEach(element => {
    element.addEventListener('click', abrirHotel);
});

