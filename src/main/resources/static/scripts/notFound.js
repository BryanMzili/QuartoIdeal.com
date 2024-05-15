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
