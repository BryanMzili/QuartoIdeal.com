document.querySelector('#registered').innerHTML = 'QUARTO IDEAL ' + new Date().getFullYear();
let larguraInicial = $(window).width();

const urlParams = new URLSearchParams(window.location.search);
let id_hotel = urlParams.get('id');

function abrirCarrinho() {
    window.location.href = 'carrinho.html';
}

$('form').submit(function (event) {
    event.preventDefault();
});

function addCarrinho() {
    criarCarrinho();

    entrada = document.querySelector('#data_entrada').reportValidity();
    saida = document.querySelector('#data_saida').reportValidity();

    if (entrada && saida) {
        let carrinho = JSON.parse(localStorage.getItem('carrinho'));
        let hotel = {};
        hotel.id = id_hotel;
        hotel['data-entrada'] = $('#data_entrada').val() ;
        hotel['data-saida'] = $('#data_saida').val();
        
        carrinho.carrinho.push(hotel);
        salvarCarrinho(carrinho);

        window.location.reload();
    }
}

function criarCarrinho() {
    if (localStorage.getItem('carrinho') == null) {
        localStorage.setItem('carrinho', '{"carrinho":[]}');
    }
}

function salvarCarrinho(carrinho){
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}


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
    if (window.innerWidth < 1280) {
        let title = $('#title').html();
        $('#title').html('');
        $('#title_mobile').html(title);
    }

}).fail(function () {
    console.log('Erro ao carregar o arquivo JSON.');
});