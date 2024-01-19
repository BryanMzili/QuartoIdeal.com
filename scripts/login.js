function telaCadastro(){
    window.location.href = "home.html";
}

function login(){
    var usuario = document.querySelector("#usuario");
    var senha = document.querySelector("#senha");

    usuario.value = 'BryanMzili';
    senha.value = 'Bryan123@';

    const chave = {};
    chave.usuario = usuario.value;
    chave.senha = senha.value;

    const pessoa = localStorage.getItem(JSON.stringify(chave));

    console.log(pessoa);

    var token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem('token', token);
}