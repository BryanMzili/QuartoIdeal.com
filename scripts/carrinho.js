let larguraInicial = $(window).width();
document.querySelector('#registered').innerHTML = 'QUARTO IDEAL ' + new Date().getFullYear();
let hoteis, resumo = 0;
responsividade();
$.getJSON('../hoteis.json', function (data) {
    hoteis = data;
    listarReservas();
    responsividade();
}).fail(function () {
    console.log('Erro ao carregar o arquivo JSON.');
});

function listarReservas() {
    try {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')).carrinho;

        if (carrinho.length >= 1) {

            $.each(carrinho, function (chave, valor) {
                let hotel = $.grep(hoteis.hoteis, function (objeto) {
                    return objeto.id == valor.id;
                })[0];

                let reserva = '<div class="reserva">' +
                    '<p class="reservaTitle inter">' + hotel.nome + '</p>' +
                    '<hr>' +
                    '<div class="infoReserva">' +
                    '<div class="images">' +
                    '<img src="../images/' + hotel.imagem + '" alt="Foto do hotel" class="image_hotel">' +
                    '<img src="../icones/lixeira.png" alt="lixeira" class="lixeira" onclick="removerCarrinho(' + chave + ')">' +
                    '</div>' +

                    '<div class="infoText">' +
                    '<div class="quebraLinha">' +
                    '<p class="periodo inter">Período:</p>' +
                    '<p class="datasReserva poppins">' + formatarData(valor['data-entrada']) + ' à ' + formatarData(valor['data-saida']) + '</p>' +
                    '</div>' +
                    '<div class="quebraLinha">' +
                    '<p class="total inter">Total:</p>' +
                    '<p class="valorReserva poppins">' + calcularValor(valor['data-entrada'], valor['data-saida'], hotel.valor) + '</p>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                $('.reservas').append(reserva);
            });
            $('#total').html('R$ ' + resumo.toFixed(2).replace('.', ','))
        }
    } catch (e) { }
}

function calcularValor(entrada, saida, valor) {
    let miliseconds = new Date(saida) - new Date(entrada);
    let dias = Math.round(miliseconds / (1000 * 60 * 60 * 24));

    let result = valor * dias;
    resumo += result;
    return "R$ " + result.toFixed(2).replace('.', ',');
}

function formatarData(data) {
    let partes = data.split('-');
    return partes[2] + '/' + partes[1] + '/' + partes[0];
}

function removerCarrinho(id_array) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho'));
    carrinho.carrinho.splice(id_array, 1);
    salvarCarrinho(carrinho);
    window.location.reload();
}

function salvarCarrinho(carrinho) {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function limparCarrinho() {
    try {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')).carrinho;
        if (carrinho.length >= 1) {
            if (confirm("Tem certeza que deseja prosseguir?")) {
                localStorage.setItem('carrinho', '{"carrinho":[]}');
                location.reload();
            }
        }
    } catch (e) { }
}

function finalizarReserva() {
    window.location.href = './pagamento.html';
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

        if (reserva.length == 0) {
            $('button').css('margin-left', '75%');
            $('button').css('margin-right', '2%');
        } else {
            $('button').css('margin-left', '10.5%');
            $('button').css('margin-right', '7.3%');
        }

        $.each(reserva, function (key, value) {
            let info = $(this).find(".infoReserva").html();
            let titulo = $(this).find(".reservaTitle");

            $(this).html('');
            $(this).append(info);

            let infoText = $(this).find('.infoText').html();
            $(this).find('.infoText').html('')

            $(this).find('.infoText').html(titulo);
            $(this).find('.infoText').append(infoText);
        });
    }

    $('.bi').click(abrirLateral);
}


