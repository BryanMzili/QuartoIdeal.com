document.querySelector('#carrinho').addEventListener('click', abrirCarrinho);
document.querySelector('#registered').innerHTML = 'QUARTO IDEAL ' + new Date().getFullYear();
let larguraInicial = $(window).width();

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

    $('#avaliacao').css('margin-left', $('#hotel-image').css('margin-left'));

    let title = $('#title').html();
    $('#title').html('');
    $('#title_mobile').html(title);

    let lbl_entrada = $('#lbl_data_entrada');
    let lbl_saida = $('#lbl_data_saida');
    let data_entrada = $('#data_entrada');
    let data_saida = $('#data_saida');

    $('.datas').html('');
    $('.datas').append(lbl_entrada);
    $('.datas').append(data_entrada);
    $('.datas').append(lbl_saida);
    $('.datas').append(data_saida);
}

$('.bi').click(abrirLateral);

function abrirCarrinho() {
    //window.location.href = 'login.html';
}

$('form').submit(function (event) {
    event.preventDefault();

});

const urlParams = new URLSearchParams(window.location.search);
let id_hotel = urlParams.get('id');

$.getJSON('../hoteis.json', function (data) {
    $.each(data, function (key, value) {
        $.each(value, function (chave, valor) {

            if (id_hotel == valor.id) {
                $('#title').html(valor.nome);
                $('#hotel-image').attr('src', '../images/' + valor.imagem);
                $('#avaliacao').html(valor.nota);
                let nota = " - ";
                if (valor.nota <= 2.9) {
                    nota += 'Muito Ruim'
                } else if (valor.nota <= 5.9) {
                    nota += 'Ruim'
                } else if (valor.nota <= 7.9) {
                    nota += 'Bom'
                } else if (valor.nota <= 8.9) {
                    nota += 'Muito Bom'
                } else if (valor.nota >= 9.0) {
                    nota += 'Excelente'
                }
                $('#avaliacao').append(nota);
                $('#avaliacao').append("(" + valor.numAval + ")");

                $('#localidade').html(valor.regiao);
                $('#valor').html("R$ " + valor.valor.toFixed(2).replace('.', ',') + " p/d");
            }
        });
    });
}).fail(function () {
    console.log('Erro ao carregar o arquivo JSON.');
});