let field_1 = document.querySelector("#field_1");
let field_2 = document.querySelector("#field_2");
let msg_field1 = document.querySelector("#msg_field1");
let msg_field2 = document.querySelector("#msg_field2");
let iconView = document.querySelector("#iconView");
let btn_cadastrar = document.querySelector("#cadastrar");
let etapa = document.querySelector('#state');
let aux = 0;

const pessoa = {};

if (window.innerWidth < 1280) {
    $('#vc-possui').html('Você já possui um cadastro?');
    $('#login').html('Clique abaixo para fazer login');
    $('#lateral').append('<button class="poppins buttons" onclick="Login()" id="entrar">ENTRAR</button>');
    $('#div_btn_entrar').html('');
    $('#login_mobile').html($('#lateral').html());
    $('#lateral').html('');
}

$(window).on('resize', function () {
    location.reload();
});

field_1.addEventListener('keydown', next);
field_2.addEventListener('keydown', next);

attState();
definirEtapa();

function voltar() {
    if (aux <= 0) {
        location.href = "/QuartoIdeal";
    } else if (aux > 0) {
        salvarPrevia();
        limparCampos();
        aux--;
        attState();
        definirEtapa();
        autoPreenche();
        let eventoInput = new Event('input', {
            bubbles: true,
            cancelable: true,
        });
        field_1.dispatchEvent(eventoInput);
        field_2.dispatchEvent(eventoInput);
    }
}

function cadastrar() {
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/usuario/cadastrar',
        data: JSON.stringify(pessoa),
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
            if (response == 'Usuário criado com sucesso') {
                openMessage('Cadastro finalizado!!!<br><br>Você será redirecionado para a tela de Login');
            } else {
                openMessage(response);
                switch (response) {
                    case "CPF inválido":
                        voltar();
                        voltar();
                        voltar();
                        break;
                    case "Contato inválido":
                    case "Email inválido":
                        voltar();
                        break;
                }
            }
        },
        error: function () {
            console.error('Erro ao adicionar ao carrinho');
        }
    });
}

function Login() {
    location.href = "login";
}

function attState() {
    etapa.innerHTML = 'Etapa ' + (aux + 1) + ' de 4';
}

function limparCampos() {
    field_1.value = '';
    field_2.value = '';
}

function verificarVazio() {
    if (field_1.value == 'undefined') {
        field_1.value = '';
    }

    if (field_2.value == 'undefined') {
        field_2.value = '';
    }
}

function verificar() {
    salvarPrevia();
    switch (aux) {
        case 0:
            etapa_1();
            attState();
            break;
        case 1:
            etapa_2();
            attState();
            break;
        case 2:
            etapa_3();
            attState();
            break;
        case 3:
            etapa_4();
            attState();
            break;
    }
    autoPreenche();
}

function definirEtapa() {
    $('#field_1').unmask();
    $('#field_2').unmask();
    $('#field_1').attr('type', 'text');
    $('#msg_field3').css("visibility", "hidden");
    field_1.focus();
    field_2.setAttribute('type', 'text');
    noIcon();
    btn_cadastrar.innerHTML = 'CONTINUAR';
    switch (aux) {
        case 0:
            field_1.placeholder = 'Nome Completo';
            field_2.placeholder = 'CPF xxx.xxx.xxx-xx';
            $('#field_2').mask('000.000.000-00');
            break;
        case 1:
            field_1.placeholder = 'Data de Nascimento (dd/mm/yyyy)';
            field_2.placeholder = 'Endereço';
            $('#field_1').attr('type', 'date');
            $('#msg_field3').css("visibility", "visible");
            break;
        case 2:
            field_1.placeholder = 'E-mail';
            field_2.placeholder = 'Contato (xx) xxxxx-xxxx';
            $('#field_2').mask('(00) 00000-0000');
            break;
        case 3:
            field_1.placeholder = 'Usuário';
            field_2.placeholder = 'Senha (Minímo 8 caracteres)';
            addListenerView();
            field_2.setAttribute('type', 'password');
            openMessage('Falta pouco para a conclusão do seu cadastro!!!<br><br>Para finalizarmos é necessário que você nos informe um usuário e senha que será utilizado para você acessar a sua conta dentro do nosso site.');
            btn_cadastrar.innerHTML = 'CADASTRAR';
            break;
    }
}

function autoPreenche() {
    switch (aux) {
        case 0:
            field_1.value = pessoa.nome;
            field_2.value = pessoa.cpf;
            break;
        case 1:
            field_1.value = pessoa.dataNascimento;
            field_2.value = pessoa.endereco;
            break;
        case 2:
            field_1.value = pessoa.email;
            field_2.value = pessoa.contato;
            break;
        case 3:
            field_1.value = pessoa.usuario;
            field_2.value = pessoa.senha;
            break;
    }
    verificarVazio();
}

function salvarPrevia() {
    switch (aux) {
        case 0:
            pessoa.nome = field_1.value;
            pessoa.cpf = field_2.value;
            break;
        case 1:
            pessoa.dataNascimento = field_1.value;
            pessoa.endereco = field_2.value;
            break;
        case 2:
            pessoa.email = field_1.value;
            pessoa.contato = field_2.value;
            break;
        case 3:
            pessoa.usuario = field_1.value;
            pessoa.senha = field_2.value;
            break;
    }
}

compareAndAct();

function compareAndAct() {
    let pageSize = $('body').height();
    let screenHeight = $(window).height();

    if (pageSize < screenHeight) {
        $('#login_mobile').css('position', 'absolute');
        $('#login_mobile').css('bottom', '0%');
    }
}