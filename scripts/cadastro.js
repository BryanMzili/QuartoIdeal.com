var lateral = document.querySelector("#lateral");

handleResize();

function atualizarPagina() {
    // Lógica de atualização aqui
    location.reload(); // Isso recarregará a página, substitua por sua lógica de atualização se necessário
}

// Configurar a função para ser chamada a cada 5 segundos (5000 milissegundos)
setInterval(atualizarPagina, 3000);

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

function Login(){
    window.location.href = "login.html";
}