const btnConta = document.getElementById("container-central__botao-conta");
btnConta.addEventListener("click", (evento) => {
    evento.preventDefault();
    window.location.href = "./html/login.html";
})

const btnCadastro = document.getElementById("container-central__botao-cadastro");
btnCadastro.addEventListener("click", (evento) => {
    evento.preventDefault();
    window.location.href = "./html/cadastro.html";
})

window.addEventListener("load", () => {
    const usuarioLogado = sessionStorage.getItem("usuarioLogado");
    if (usuarioLogado) window.location.href = "./html/home.html";
})