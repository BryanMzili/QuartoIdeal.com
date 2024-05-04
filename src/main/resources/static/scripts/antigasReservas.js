document.querySelector('#registered').innerHTML = 'QUARTO IDEAL ' + new Date().getFullYear();
let larguraInicial = $(window).width();
let hoteis;

responsividade();

try {
    $.getJSON('../../hoteis.json', function (data) {
        hoteis = data;
        let reservas = JSON.parse(localStorage.getItem('reservas'));
        listarReservas(reservas.reservas, hoteis);
        responsividade();
    }).fail(function () {
        console.log('Erro ao carregar o arquivo JSON.');
    });

} catch (e) { }

function abrirCarrinho() {
    window.location.href = 'carrinho';
}

$(window).on('resize', function () {
    let larguraAtual = $(window).width();
    if (larguraAtual !== larguraInicial) {
        location.reload();
    }
});

function responsividade() {
    if (window.innerWidth < 1280) {
        let links = $('#links').html();
        if (links != '') {
            $('#links').html('');
            setLinks(links);
        }
    } else {
        let reserva = $('.reserva');

        $.each(reserva, function (key, value) {
            let info = $(this).find(".infoReserva").html();
            let titulo = $(this).find(".reservaTitle");
            let infoText = $(this).find('.infoText').html();

            $(this).html('');
            $(this).append(info);
            $(this).append(titulo);

            $(this).find('.infoText').html('')
            $(this).find('.infoText').html(titulo);
            $(this).find('.infoText').append(infoText);
        });
    }

    $('.bi').click(abrirLateral);
}

function formatarData(data) {
    let partes = data.split('-');
    return partes[2] + '/' + partes[1] + '/' + partes[0];
}

function listarReservas(reservas, hoteis) {
    $.each(reservas, function (chave, valor) {
        let hotel = $.grep(hoteis.hoteis, function (objeto) {
            return objeto.id == valor.id_hotel;
        })[0];

        let reserva = '<div class="reserva">' +
            '<p class="reservaTitle inter">' + hotel.nome + '</p>' +
            '<hr>' +
            '<div class="infoReserva">' +
            '<div class="images">' +
            '<img src="../../images/' + hotel.imagem + '" alt="Foto do hotel" class="image_hotel">' +
            '</div>' +

            '<div class="infoText">' +
            '<div class="quebraLinha">' +
            '<p class="periodo inter">Período:</p>' +
            '<p class="datasReserva poppins">' + formatarData(valor["data-entrada"]) + ' à ' + formatarData(valor["data-saida"]) + '</p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        $('.reservas').append(reserva);
    });
}