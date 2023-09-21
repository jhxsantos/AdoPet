import { validarEmail } from "./validacoes.js";
import { validarNome }  from "./validacoes.js";
import { validarSenha } from "./validacoes.js";
import { cadastrarUsuario } from "./cadastrarUsuario.js";
import { customAlert } from "./customAlert.js";

const email  = document.getElementById("cadastro__formulario__email");
email.addEventListener("keyup", () => {
    const erro = document.getElementById("cadastro__erro-formulario__email");
    validarEmail(email, erro);
})

const nome   = document.getElementById("cadastro__formulario__nome");
nome.addEventListener("keyup", () => {
    const erro = document.getElementById("cadastro__erro-formulario__nome");
    validarNome(nome, erro);
})

const senha1 = document.getElementById("cadastro__formulario__senha");
senha1.addEventListener("keyup", () => {
    const erro = document.getElementById("cadastro__erro-formulario__senha");
    validarSenha(senha1, erro);
});

const senha2 = document.getElementById("cadastro__formulario__confirmar-senha");
senha2.addEventListener("keyup", () => {
    const erro = document.getElementById("cadastro__erro-formulario__confirmar-senha");
    validarSenha(senha2, erro);
});

const btnCadastrar = document.getElementById("cadastro__container-central__botao-cadastrar");
btnCadastrar.addEventListener("click", async (evento) => {
    evento.preventDefault();

    let erro = "";

    const email  = document.getElementById("cadastro__formulario__email");
    erro = document.getElementById("cadastro__erro-formulario__email");
    if (!validarEmail(email, erro)) {
        email.focus();
        return;
    }
    
    const nome   = document.getElementById("cadastro__formulario__nome");
    erro = document.getElementById("cadastro__erro-formulario__nome");
    if (!validarNome(nome, erro)) {
        nome.focus();
        return;
    }
    
    const senha1 = document.getElementById("cadastro__formulario__senha");
    erro = document.getElementById("cadastro__erro-formulario__senha");
    if (!validarSenha(senha1, erro)) {
        senha1.focus;
        return;
    };
    
    const senha2 = document.getElementById("cadastro__formulario__confirmar-senha");
    erro = document.getElementById("cadastro__erro-formulario__confirmar-senha");
    if (!validarSenha(senha2, erro)) {
        senha2.focus;
        return;
    };

    // Verifica se as senhas informadas são iguais
    const erroSenha1 = document.getElementById("cadastro__erro-formulario__senha");
    const erroSenha2 = document.getElementById("cadastro__erro-formulario__confirmar-senha");

    if (senha1.value !== senha2.value) {
        erroSenha1.textContent = "A senha informada deve ser a mesma nos dois campos";
        erroSenha2.textContent = " ";
        senha1.value = "";
        senha2.value = "";
        senha1.focus();
        return;
    } else {
        erroSenha1.textContent = " ";
        erroSenha2.textContent = " ";
    };

    // cadastra o usuário
    try {
        const cadastrou = await cadastrarUsuario(nome.value, email.value, senha1.value);
        if (cadastrou) {
            window.location.href = "./login.html";
        }
    } catch(erro) {
        await customAlert("", "Problemas ao cadastrar usuário. " + erro, "error", "OK");
        // alert("Problemas ao cadastrar usuário. " + erro);
    }
});