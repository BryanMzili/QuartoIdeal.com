if (location.href.includes('?nome_hotel=')) {
    let queryString = window.location.search;
    let params = new URLSearchParams(queryString);
    let nome_hotel = params.get('nome_hotel');
    $('#busca').val(nome_hotel);
    $('#busca').focus();
}

function abrirHotel(id_hotel) {
    window.location.href = '/QuartoIdeal/pages/hotel/' + id_hotel;
}

function abrirCarrinho() {
    window.location.href = '/QuartoIdeal/pages/carrinho';
}

document.querySelector('#registered').innerHTML = 'QUARTO IDEAL ' + new Date().getFullYear();

$(window).on('resize', function () {
    location.reload();
});

if (window.innerWidth < 1280) {
    let links = $('#links').html();
    $('#links').html('');
    setLinks(links);
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

$('#busca').on('input', function () {
    if (location.href.includes('?nome_hotel=')) {
        let queryString = window.location.search;
        let params = new URLSearchParams(queryString);
        let nome_hotel = params.get('nome_hotel');
        location.href = "QuartoIdeal?nome_hotel=" + $(this).val();
    } else {
        location.href += "?nome_hotel=" + $(this).val();
    }
});

