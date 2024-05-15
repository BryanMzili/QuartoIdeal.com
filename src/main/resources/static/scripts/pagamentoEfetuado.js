document.querySelector('#registered').innerHTML = 'QUARTO IDEAL ' + new Date().getFullYear();
let segundos = 3;

iniciarContador(); 

function iniciarContador() {
    if (segundos >= 0) {
        $('#segundo').text(segundos + ' segundo(s)');
        segundos--;
        setTimeout(iniciarContador, 1500);
    } else {
        window.location.href = '/QuartoIdeal/';
    }
}