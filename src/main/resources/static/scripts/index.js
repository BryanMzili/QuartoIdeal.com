let larguraInicial = $(window).width();

function abrirHotel() {
    let id_hotel = $(this).find("#id").val();
    window.location.href = '/QuartoIdeal/pages/hotel?id=' + id_hotel;
}

function abrirCarrinho(){
    window.location.href = '/QuartoIdeal/pages/carrinho';
}

document.querySelector('#registered').innerHTML = 'QUARTO IDEAL ' + new Date().getFullYear();

// <!--Critério avaliação dos Hoteis:
// 0 - 2.9 - Muito Ruim
// 3 - 5.9 - Ruim
// 6 - 7.9 - Bom
// 8 - 8.9 - Muito Bom
// 9 - 10  - Excelente
// -->

$.getJSON('./hoteis.json', function (data) {
    $.each(data, function (key, value) {
        $.each(value, function (chave, valor) {
            let hotel = '<div class="Hotel">';

            hotel += '<input type="hidden" id="id" value="' + valor.id + '">';
            hotel += '<img class="images-hotel" src="images/' + valor.imagem + '" alt="image-hotel">';
            hotel += '<p class="description-hotel inter">' + valor.nome + '</p>';
            hotel += '<div class="assesment-location">';
            hotel += '<div class="hotel-assesment inter"><b>' + valor.nota + ' - ';
            if (valor.nota <= 2.9) {
                hotel += 'Muito Ruim';
            } else if (valor.nota <= 5.9) {
                hotel += 'Ruim';
            } else if (valor.nota <= 7.9) {
                hotel += 'Bom';
            } else if (valor.nota <= 8.9) {
                hotel += 'Muito Bom';
            } else if (valor.nota >= 9.0) {
                hotel += 'Excelente';
            }

            hotel += '(' + valor.numAval + ')</b></div>';
            hotel += '<img src="icones/localizacao.svg" id="localizacao" alt="localizacao">';
            hotel += '<div class="hotel-location inter">' + valor.regiao + '</div>';

            hotel += '</div>';//assesment-location
            hotel += '</div>';//hotel

            $(".Hoteis").append(hotel);
        });
    });

    $('.Hotel').click(abrirHotel);

}).fail(function () {
    console.log('Erro ao carregar o arquivo JSON.');
});

$(window).on('resize', function () {
    let larguraAtual = $(window).width();
    if (larguraAtual !== larguraInicial) {
        location.reload();
    }
});

if (window.innerWidth < 1280) {
    let links = $('#links').html();
    $('#links').html('');
    setLinks(links);
}

$('.bi').click(abrirLateral);
