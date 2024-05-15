document.querySelector('#registered').innerHTML = 'QUARTO IDEAL ' + new Date().getFullYear();

let dataAtual = new Date();
$('#data_entrada').attr('min', dataAtual.toISOString().split('T')[0]);

dataAtual.setDate(dataAtual.getDate() + 1);
$('#data_saida').attr('min', dataAtual.toISOString().split('T')[0]);
$('#data_saida').prop('disabled', true);

//Liberar o campo de data de entrada para ser utilizado
document.querySelector('#data_entrada').addEventListener('change', function () {
    if ($('#data_entrada').val().length == 10) {
        dataAtual = new Date();

        if (new Date($('#data_entrada').val()) >= dataAtual) {
            let dataMinima = new Date($('#data_entrada').val());
            dataMinima.setDate(dataMinima.getDate() + 1);
            $('#data_saida').attr('min', (dataMinima).toISOString().split('T')[0]);
        }

        $('#data_saida').prop('disabled', false);
    } else {
        $('#data_saida').val('');
        $('#data_saida').prop('disabled', true);
    }
});

function abrirCarrinho() {
    window.location.href = '../carrinho';
}

$('form').submit(function (event) {
    event.preventDefault();
});

function addCarrinho() {
    criarCarrinho();

    entrada = document.querySelector('#data_entrada').reportValidity();
    saida = document.querySelector('#data_saida').reportValidity();

    if (!$('#data_saida').prop('disabled')) {
        if (entrada && saida) {

            let formData = {};
            let formArray = $('form').serializeArray();
            $.each(formArray, function (i, field) {
                formData[field.name] = field.value;
            });
            let auxData = new Date(formData.data_entrada);
            auxData.setHours(auxData.getHours() + 3);
            formData.data_entrada = auxData;

            auxData = new Date(formData.data_saida);
            auxData.setHours(auxData.getHours() + 3);
            formData.data_saida = auxData;

            formData.hotel = {"id": parseInt(formData.hotel)};

            $.ajax({
                type: 'POST',
                url: 'http://localhost:8080/reservas/addCarrinho',
                data: JSON.stringify(formData),
                contentType: 'application/json',
                success: function (response) {
                    if (response == 'Adicionado ao Carrinho') {
                        openMessage('Reserva adicionada ao Carrinho');
                    } else if (response == 'Adicionar Carrinho localStorage') {
                        let carrinho = JSON.parse(localStorage.getItem('carrinho'));
                        let hotel = {};
                        hotel.id_hotel = parseInt($('input[type="hidden"]').val());
                        hotel['data-entrada'] = $('#data_entrada').val();
                        hotel['data-saida'] = $('#data_saida').val();

                        carrinho.carrinho.push(hotel);
                        salvarCarrinho(carrinho);

                        openMessage('Reserva adicionada ao Carrinho');
                    }
                },
                error: function () {
                    console.error('Erro ao adicionar ao carrinho');
                }
            });
        }
    }
}

function reservarHotel() {
    entrada = document.querySelector('#data_entrada').reportValidity();
    saida = document.querySelector('#data_saida').reportValidity();

    if (!$('#data_saida').prop('disabled')) {
        if (entrada && saida) {

            let formData = {};
            let formArray = $('form').serializeArray();
            $.each(formArray, function (i, field) {
                formData[field.name] = field.value;
            });

            let auxData = new Date(formData.data_entrada);
            auxData.setHours(auxData.getHours() + 3);
            formData.data_entrada = auxData;

            auxData = new Date(formData.data_saida);
            auxData.setHours(auxData.getHours() + 3);
            formData.data_saida = auxData;

            formData.hotel = {"id": parseInt(formData.hotel)};

            $.ajax({
                type: 'POST',
                url: 'http://localhost:8080/QuartoIdeal/pages/pagamento',
                data: JSON.stringify(formData),
                contentType: 'application/json',
                success: function (response) {

                    if (response == "Usuário não encontrado") {
                        openMessage("Você deve efetuar login para efetuar uma reserva");
                    } else if (response == "Redirecionar Tela Pagamento") {
                        location.href = "../pagamento"
                    }
                },
                error: function () {
                    console.error('Erro ao efetuar Reserva');
                }
            });
        }
    }
}

function criarCarrinho() {
    if (localStorage.getItem('carrinho') == null || localStorage.getItem('carrinho') == "") {
        localStorage.setItem('carrinho', '{"carrinho":[]}');
    }
}

function salvarCarrinho(carrinho) {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

$(window).on('resize', function () {
    location.reload();
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

    let title = $('#title').html();
    $('#title').html('');
    $('#title_mobile').html(title);
}

$('.bi').click(abrirLateral);

compareAndAct();

function compareAndAct() {
    let pageSize = $('body').height();
    let screenHeight = $(window).height();

    if (pageSize < screenHeight) {
        $('footer').css('position', 'absolute');
        $('footer').css('bottom', '0%');
    }
}