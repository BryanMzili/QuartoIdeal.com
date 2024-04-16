let link;

function abrirLateral(){
    $('.lista').html(link);
    $('.lista').css('top',$('header').outerHeight(true) -1);
    
    let width = parseInt($('.lista').css('width').replace('px',''));
    if (width > 0) {
        $('.lista').css('width','0');
        $('#carrinho').css('width','0');
        $('body').css('overflow','visible');
        $('body').off('click');
    } else {
        $('.lista').css('width','50%');  
        $('body').css('overflow','hidden');  
        $('body').click(function(event){
            let ids = ["lista", "cadastro", "login", "compras","carrinho"];
            let elemento = event.target;
            if(ids.indexOf(elemento.id) === -1){
                abrirLateral();
            }
        });
    }
}

function setLinks(links){
    link = links;
}