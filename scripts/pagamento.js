document.querySelector('#registered').innerHTML = 'QUARTO IDEAL ' + new Date().getFullYear();
let larguraInicial = $(window).width();

cartao();

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

        '<button id="pagamento" class="poppins" onclick="pagamentoCartao()">Finalizar Pagamento</button>');
    anoExpiracao();
    $('#numero').mask('0000 0000 0000 0000');
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
        '<button onclick="pagamentoEfetuado()" id="revisarPagamento" class="poppins">Revisar pagamento</button>');
    let url = './pagamentoEfetuado.html';
    let pixURL = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + url;
    $('#qrcode').attr('src', pixURL);
}

function pagamentoEfetuado() {
    window.location.href = 'pagamentoEfetuado.html';
}