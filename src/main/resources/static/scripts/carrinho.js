document.querySelector('#registered').innerHTML = 'QUARTO IDEAL ' + new Date().getFullYear();
let hoteis = [];

if ($('input[type="hidden"]').val() == "false") {
    try {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')).carrinho;

        if (carrinho.length >= 1) {
            let ids_hoteis = [];
            $.each(carrinho, function (chave, valor) {
                let id = $.grep(ids_hoteis, function (objeto) {
                    return objeto == valor.id_hotel;
                })[0];
                if (id == undefined) {
                    ids_hoteis.push(valor.id_hotel);
                }
            });

            $.each(ids_hoteis, function (chave, valor) {
                buscarHotel(valor);
            });
        }

        listarReservas(carrinho);
    } catch (e) {
    }
} else {
    try {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')).carrinho;

        if (carrinho.length >= 1) {
            if (confirm("Você deseja sincronizar as reservas do seu carrinho com sua conta?")) {
                $.each(carrinho, function (chave, valor) {
                    let formData = {};
                    formData.hotel = {"id": valor.id_hotel};
                    formData.data_entrada = valor["data-entrada"];
                    formData.data_saida = valor["data-saida"];

                    $.ajax({
                        type: 'POST',
                        url: 'http://localhost:8080/reservas/addCarrinho',
                        data: JSON.stringify(formData),
                        async: false,
                        contentType: 'application/json',
                        success: function (response) {
                        },
                        error: function () {
                            console.error('Erro ao adicionar ao carrinho');
                        }
                    });
                });
                localStorage.setItem('carrinho', "");
                location.reload();
            }
        }
    } catch (e) {
    }
}

responsividade();
calcularResumo();

function listarReservas(carrinho) {
    try {
        $.each(carrinho, function (chave, valor) {
            let hotel = $.grep(hoteis, function (objeto) {
                return objeto.id == valor.id_hotel;
            })[0];

            let reserva = '<div class="reserva">' +
                    '<p class="reservaTitle inter">' + hotel.nome + '</p>' +
                    '<hr>' +
                    '<div class="infoReserva">' +
                    '<div class="images">' +
                    '<img src="../../images/' + hotel.imagem + '" alt="Foto do hotel" class="image_hotel">' +
                    '<img src="../../icones/lixeira.png" alt="lixeira" class="lixeira" onclick="removerCarrinho(' + chave + ', 1)">' +
                    '</div>' +
                    '<div class="infoText">' +
                    '<div class="quebraLinha">' +
                    '<p class="periodo inter">Período:</p>' +
                    '<p class="datasReserva poppins">' + formatarData(valor['data-entrada']) + ' à ' + formatarData(valor['data-saida']) + '</p>' +
                    '</div>' +
                    '<div class="quebraLinha">' +
                    '<p class="total inter">Total:</p>' +
                    '<p class="valorReserva poppins">' + calcularValor(valor['data-entrada'], valor['data-saida'], hotel.valor) + '</p>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            $('.reservas').append(reserva);
        });

    } catch (e) {
    }
}

function calcularValor(entrada, saida, valor) {
    let miliseconds = new Date(saida) - new Date(entrada);
    let dias = Math.round(miliseconds / (1000 * 60 * 60 * 24));

    let result = valor * dias;
    return "R$ " + result.toFixed(2);
}

function formatarData(data) {
    let partes = data.split('-');
    return partes[2] + '/' + partes[1] + '/' + partes[0];
}

function salvarCarrinho(carrinho) {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function buscarHotel(id) {
    let hotel = $.grep(hoteis, function (objeto) {
        return objeto.id == id;
    })[0];

    if (hotel == undefined) {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/hotel/pesquisar/' + id,
            contentType: 'application/json',
            async: false,
            success: function (response) {
                hoteis.push(response);
            },
            error: function () {
                console.error('Erro ao buscar hotel');
            }
        });
    } else {
        return hotel;
    }
}

function limparCarrinho(armazenamento) {
    if (confirm("Tem certeza que deseja prosseguir?")) {
        if (armazenamento == 1) {
            try {
                let carrinho = JSON.parse(localStorage.getItem('carrinho')).carrinho;
                if (carrinho.length >= 1) {
                    localStorage.setItem('carrinho', '{"carrinho":[]}');
                    location.reload();
                }
            } catch (e) {
            }
        } else if (armazenamento == 2) {
            $.ajax({
                type: 'GET',
                url: 'http://localhost:8080/reservas/limparCarrinho',
                contentType: 'application/json',
                success: function (response) {
                    if (response == "Carrinho Limpo") {
                        location.reload();
                    }
                },
                error: function () {
                    console.error('Erro ao limpar carrinho');
                }
            });
        }
    }
}

function finalizarReserva(armazenamento) {
    if (armazenamento == 1) {
        openMessage("Você deve efetuar login para efetuar pagamento do carrinho");
    } else if (armazenamento == 2) {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/QuartoIdeal/pages/pagamentoCarrinho',
            contentType: 'application/json',
            success: function (response) {

                if (response == "Usuário não encontrado") {
                    openMessage("Você deve efetuar login para efetuar pagamento do carrinho");
                } else if (response == "Redirecionar Tela Pagamento") {
                    location.href = "pagamento"
                }
            },
            error: function () {
                console.error('Erro ao efetuar Pagamento do Carrinho');
            }
        });
    }
}

function removerCarrinho(id, armazenamento) {
    if (armazenamento == 1) {
        let carrinho = JSON.parse(localStorage.getItem('carrinho'));
        carrinho.carrinho.splice(id, 1);
        salvarCarrinho(carrinho);
        location.reload();
    } else if (armazenamento == 2) {

        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/reservas/removerCarrinho/' + id,
            contentType: 'application/json',
            success: function (response) {
                if (response == "Item Removido do Carrinho") {
                    location.reload();
                }
            },
            error: function () {
                console.error('Erro ao remover item do carrinho');
            }
        });
    }
}

function calcularResumo() {
    let reservas = $('.reserva');
    let resumoValor = 0.0;
    $.each(reservas, function () {
        $(this).find('.valorReserva').html($(this).find('.valorReserva').html().replaceAll(".", ","));
        let valor = $(this).find('.valorReserva').html().replaceAll("R$ ", "");

        resumoValor += parseFloat(valor);
    });
    $("#total").html("R$ " + resumoValor.toFixed(2));
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

        if (reserva.length == 0) {
            $('button').css('margin-left', '75%');
            $('button').css('margin-right', '2%');
        } else {
            $('button').css('margin-left', '10.5%');
            $('button').css('margin-right', '7.3%');
        }

        $.each(reserva, function (key, value) {
            let info = $(this).find(".infoReserva").html();
            let titulo = $(this).find(".reservaTitle");

            $(this).html('');
            $(this).append(info);

            let infoText = $(this).find('.infoText').html();
            $(this).find('.infoText').html('')

            $(this).find('.infoText').html(titulo);
            $(this).find('.infoText').append(infoText);
        });
    }

    $('.bi').click(abrirLateral);
}

compareAndAct();

function compareAndAct() {
    let pageSize = $('body').height();
    let screenHeight = $(window).height();

    if (pageSize < screenHeight) {
        $('footer').css('position', 'absolute');
        $('footer').css('bottom', '0%');
    }
}