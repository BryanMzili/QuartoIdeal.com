document.querySelector('#registered').innerHTML = 'QUARTO IDEAL ' + new Date().getFullYear();

$(".reservas").hide();
responsividade();

function abrirCarrinho() {
    window.location.href = 'carrinho';
}

if($('.reserva').html() != undefined){
    $('#naoLogado').hide();
    $(".reservas").show();
}

$(window).on('resize', function () {
    location.reload();
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