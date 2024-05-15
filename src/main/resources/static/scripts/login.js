$("#forgot-password").click(forgotPassword);

$('form').submit(function (event) {
    event.preventDefault();

    let formData = {};
    let formArray = $(this).serializeArray();
    $.each(formArray, function (i, field) {
        formData[field.name] = field.value;
    });

    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/usuario/logar',
        data: JSON.stringify(formData),
        contentType: 'application/json',
        success: function (response) {
            if(response == "" || response == "Login Falhou"){
                openMessage('<br>Usuário ou senha incorreto(s)');
            }else if(response == "Login Feito com sucesso"){
                openMessage('<br>Login feito com sucesso');
            }
        },
        error: function () {
            console.error('Erro ao efetuar Login');
        }
    });
});


function forgotPassword() {
    location.href = 'esqueci-minha-senha';
}

$(window).on('resize', function () {
    location.reload();
});
