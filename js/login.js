import { validarEmail } from "./validacoes.js";
import { validarSenha } from "./validacoes.js";
import { efetuarLogin } from "./processarLogin.js";
import { customAlert } from "./customAlert.js";

const email  = document.getElementById("login__formulario__email");
email.addEventListener("keyup", () => {
    const erro = document.getElementById("login__erro-formulario__email");
    validarEmail(email, erro);
})

const senha = document.getElementById("login__formulario__senha");
senha.addEventListener("keyup", () => {
    const erro = document.getElementById("login__erro-formulario__senha");
    validarSenha(senha, erro);
});

const btnEntrar = document.getElementById("login__container-central__botao-entrar");
btnEntrar.addEventListener("click", async (evento) => {
    evento.preventDefault();

    let erro;

    const email  = document.getElementById("login__formulario__email");
    erro = document.getElementById("login__erro-formulario__email");
    if (!validarEmail(email, erro)) {
        email.focus();
        return;
    }
    
    const senha = document.getElementById("login__formulario__senha");
    erro = document.getElementById("login__erro-formulario__senha");
    if (!validarSenha(senha, erro)) {
        senha1.focus;
        return;
    };
    
    try {
        // busca informações do usuário logado e joga na sessionStorage
        efetuarLogin(email.value, senha.value)
    } catch(erro) {
        await customAlert("", "Problemas ao efetuar o login. " + erro, "error", "OK");
        // alert("Problemas ao efetuar o login. " + erro);
    }
});

window.addEventListener("load", () => {
    email.focus();
})