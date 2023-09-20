import { verificaUsuarioLogado, logOut } from "./processarLogin.js";

// configura os elementos da tela de 
// acordo com o usuário logado
verificaUsuarioLogado();

const linkSair = document.getElementById("usuario__sair__link");
if (linkSair) {
    linkSair.addEventListener("click", () => {
        logOut();
        window.location.href = "../html/home.html";
    })
}

const linkLogin = document.getElementById("usuario__login__link");
if (linkLogin) {
    linkLogin.addEventListener("click", () => {    
        window.location.href = "../html/login.html";
    })
}

const linkCasa = document.getElementById("menu__home");
linkCasa.addEventListener("click", () => {
    window.location.href = "../html/home.html";
})

const linkPerfil = document.getElementById("menu__perfil");
linkPerfil.addEventListener("click", () => {
    window.location.href = "../html/perfil.html";
})