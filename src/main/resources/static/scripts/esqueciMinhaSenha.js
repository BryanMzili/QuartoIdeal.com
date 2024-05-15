$('#cpf').mask('000.000.000-00');
$('#senha1').hide();
$('#senha2').hide();
$('#senhasDiferentes').hide();
$('#voltarLogin').width($('#cpf').width() + 30);
let aux = false;

$('form').submit(function (event) {
    event.preventDefault();

    let formData = {};
    let formArray = $(this).serializeArray();
    $.each(formArray, function (i, field) {
        formData[field.name] = field.value;
    });

    if (!aux) {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/usuario/esqueciSenha',
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: function (response) {
                if (response == "" || response == "Usuário não encontrado") {
                    openMessage('<br>Usuário não encontrado');
                } else if (response == "Usuário encontrado") {
                    $('#senha1').show();
                    $('#senha1').prop('required', true);
                    $('#senha2').show();
                    $('#senha2').prop('required', true);
                    $('#login').html("Alterar Senha");
                    $('#senha1').focus();
                    aux = true;
                    $('#senha1, #senha2').on('input', function () {
                        let password1 = $('#senha1').val();
                        let password2 = $('#senha2').val();

                        if (password1 !== password2) {
                            $('#senhasDiferentes').show();
                        } else {
                            $('#senhasDiferentes').hide();
                        }
                    });
                }
            },
            error: function () {
                console.error('Erro ao efetuar Login');
            }
        });
    } else {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/usuario/mudarSenha',
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: function (response) {
                if (response == "" || response == "Senhas não coincidem" || response == "Falha ao alterar senha") {
                    openMessage(response);
                } else if (response == "Senha alterada com sucesso") {
                    openMessage(response+"!!");
                }
            },
            error: function () {
                console.error('Erro ao efetuar Login');
            }
        });
    }
});

$(window).on('resize', function () {
    location.reload();
});
