var lateral = document.querySelector("#lateral");

handleResize();

function handleResize() {
    var lateral = document.querySelector("#lateral");
    if (screen.height <= 1000) {
        lateral.style.height = '1000px';
    } else if (screen.height > 1000) {
        lateral.style.height = screen.height + 'px';
    }
}

window.addEventListener('resize', handleResize);

function cadastrar(){
    var nome = document.querySelector("#nome");
    var cpf = document.querySelector("#cpf");
    var nascimento = document.querySelector("#nascimento");
    var endereco = document.querySelector("#endereco");
    var email = document.querySelector("#email");
    var telefone = document.querySelector("#telefone");
}

function limpar(){
    document.querySelector("#nome").value = "";
    document.querySelector("#cpf").value = "";
    document.querySelector("#nascimento").value = "";
    document.querySelector("#endereco").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#telefone").value = "";
}
