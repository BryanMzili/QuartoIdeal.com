document.querySelector('#registered').innerHTML = 'QUARTO IDEAL ' + new Date().getFullYear();
let larguraInicial = $(window).width();

const urlParams = new URLSearchParams(window.location.search);
let apagarCarrinho = urlParams.get('carrinho');

let compra = localStorage.getItem('finalizar-compra');
let hoteis = {};

$.getJSON('../hoteis.json', function (data) {
    hoteis = data;
    cartao();
}).fail(function () {
    console.log('Erro ao carregar o arquivo JSON.');
});

function abrirCarrinho() {
    window.location.href = 'carrinho.html';
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
}

$('.bi').click(abrirLateral);

function anoExpiracao() {
    let dataAtual = new Date().getFullYear();
    let opcoes = $('#ano');

    for (let i = 0; i <= 10; i++) {
        let opcao = $('<option>')
        opcao.val(dataAtual + i);
        opcao.html(dataAtual + i);
        opcoes.append(opcao);
    }
}

function cartao() {
    $('.metodoPagamento').html('<label for="titular" class="poppins">Titular do Cartão<span style="color: #F00;">*</span></label>' +
        '<input type="text" id="titular" class="inter" required>' +

        '<label for="numero" class="poppins">Número do Cartão<span style="color: #F00;">*</span></label>' +
        '<input type="text" id="numero" class="inter" placeholder="XXXX XXXX XXXX XXXX" minlength="19" required>' +

        '<label for="mes" class="poppins">Data de expiração<span style="color: #F00;">*</span></label>' +
        '<div class="datas" class="inter">' +
        '<select id="mes" required class="inter">' +
        '<option value="">Mês</option>' +
        '<option value="01">Janeiro</option>' +
        '<option value="02">Fevereiro</option>' +
        '<option value="03">Março</option>' +
        '<option value="04">Abril</option>' +
        '<option value="05">Maio</option>' +
        '<option value="06">Junho</option>' +
        '<option value="07">Julho</option>' +
        '<option value="08">Agosto</option>' +
        '<option value="09">Setembro</option>' +
        '<option value="10">Outubro</option>' +
        '<option value="11">Novembro</option>' +
        '<option value="12">Dezembro</option>' +
        '</select>' +

        '<select id="ano" required>' +
        '<option value="">Ano</option>' +
        '</select>' +
        '</div>' +

        '<label for="codigo" class="poppins">CVV/CVC<span style="color: #F00;">*</span></label>' +
        '<div>' +
        '<input type="text" id="codigo" maxlength="3" minlength="3" required placeholder="XXX">' +
        '</div>' +
        '<div class="poppins valor">VALOR: <span id="valor">R$</span></div>' +

        '<button id="pagamento" class="poppins" onclick="pagamentoCartao()">Finalizar Pagamento</button>');
    anoExpiracao();
    $('#numero').mask('0000 0000 0000 0000');
    calcularValor(compra, hoteis.hoteis);
}

function pagamentoCartao() {
    let aux = [];

    aux.push(document.querySelector('#codigo').reportValidity());
    aux.push(document.querySelector('#ano').reportValidity());
    aux.push(document.querySelector('#mes').reportValidity());
    aux.push(document.querySelector('#numero').reportValidity());
    aux.push(document.querySelector('#titular').reportValidity());

    if (!aux.includes(false)) {
        pagamentoEfetuado();
    }
}

function pix() {
    $('.metodoPagamento').html('<img id="qrcode" alt="Imagem QR CODE">' +
        '<p class="inter" id="obs">*O QR Code acima contém a url relativa da página de pagamento efetuado, para prosseguir pressione o botão abaixo.*</p>' +
        '<div class="poppins valor" style="text-align:center">VALOR: <span id="valor">R$</span></div>' +
        '<button onclick="pagamentoEfetuado()" id="revisarPagamento" class="poppins">Revisar pagamento</button>');
    let url = './pagamentoEfetuado.html';
    let pixURL = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + url;
    $('#qrcode').attr('src', pixURL);
    calcularValor(compra, hoteis.hoteis);
}

function pagamentoEfetuado() {
    if (apagarCarrinho == 'true') {
        localStorage.setItem('carrinho', '{"carrinho":[]}');
    }
    window.location.href = 'pagamentoEfetuado.html';
}

function calcularValor(compra, hoteis) {
    let carrinho = JSON.parse(compra).carrinho;
    let valor = 0.0;

    $.each(carrinho, function (key, value) {
        let hotel = $.grep(hoteis, function (objeto) {
            return objeto.id == value.id_hotel;
        })[0];

        valor += calcularValorHotel(value['data-entrada'], value['data-saida'], hotel.valor);
    });
    $('#valor').html("R$ " + valor.toFixed(2).replace('.', ','));
}

function calcularValorHotel(entrada, saida, valor) {
    let miliseconds = new Date(saida) - new Date(entrada);
    let dias = Math.round(miliseconds / (1000 * 60 * 60 * 24));

    let result = valor * dias;
    return result;
}