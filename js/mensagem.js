import { validarNome, validarMensagem, validarTelefone, aplicarMascaraTelefone } from "./validacoes.js";
import { customAlert } from "./customAlert.js";

window.addEventListener("load", () => {
    const usuarioLogado = sessionStorage.getItem("usuarioLogado");
    if (!usuarioLogado) window.location.href = "../index.html";
})

const usuario = JSON.parse(sessionStorage.getItem("usuarioLogado"));

document.getElementById("mensagem__formulario__nome").value = usuario.nome;

const parametros  = new URLSearchParams(window.location.search);
const idAnimal    = parametros.get("idAnimal");
const nomeAnimal  = parametros.get("nomeAnimal");
const idadeAnimal = parametros.get("idadeAnimal");
const porteAnimal = parametros.get("porteAnimal");
document.getElementById("mensagem__formulario__nome-animal").value = nomeAnimal +"  |  " + idadeAnimal +"  |  Porte "+ porteAnimal;

const nome = document.getElementById("mensagem__formulario__nome");
nome.addEventListener("keyup", () => {
    const erro = document.getElementById("mensagem__erro-formulario__nome");
    validarNome(nome, erro);
})

const telefone = document.getElementById("mensagem__formulario__telefone");

// aplica máscara no telefone da tela
aplicarMascaraTelefone(telefone);
// aplica máscara cada vez que um dígito do telefone é digitado
telefone.addEventListener("keyup", () => {
    aplicaMascaraTelefone(telefone);
} )

if (usuario.telefone) {
    telefone.value = usuario.telefone;
    aplicarMascaraTelefone(telefone);
    telefone.setAttribute("disabled", true);
} 

const mensagem = document.getElementById("mensagem__formulario__mensagem");
mensagem.addEventListener("keyup", () => {
    const erro = document.getElementById("mensagem__erro-formulario__mensagem");
    validarMensagem(mensagem, erro);
})

const btnEnviar = document.getElementById("mensagem__container-central__botao-enviar");
btnEnviar.addEventListener("click", async (evento) => {
    evento.preventDefault();

    let erro = "";

    const nome = document.getElementById("mensagem__formulario__nome");
    erro = document.getElementById("mensagem__erro-formulario__nome");
    if (!validarNome(nome, erro)) {
        nome.focus();
        return;
    };
    
    const telefone = document.getElementById("mensagem__formulario__telefone");
    erro = document.getElementById("mensagem__erro-formulario__telefone");
    if (!validarTelefone(telefone, erro)) {
        telefone.focus();
        return;
    }
    
    const mensagem = document.getElementById("mensagem__formulario__mensagem");
    erro = document.getElementById("mensagem__erro-formulario__mensagem");
    if (!validarMensagem(mensagem, erro)) {
        mensagem.focus();
        return;
    }

    await customAlert("", "Mensagem enviada! Aguarde o retorno do(a) responsável.", "success", "OK");
    // alert("Mensagem enviada! Aguarde o retorno do(a) responsável.");
    window.location.href = "../html/home.html";
})