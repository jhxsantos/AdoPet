import { urlUsuarios } from "./urlAPI.js";
import { aplicaMascaraTelefone } from "./validacoes.js";
import { validarTelefone } from "./validacoes.js";

window.addEventListener("load", () => {
    const usuarioLogado = sessionStorage.getItem("usuarioLogado");
    if (!usuarioLogado) window.location.href = "../index.html";
})

/*** Ler o arquivo de imagem selecionado **************************/
const inputFile = document.getElementById("perfil__input_imagem");
const pictureImage = document.getElementById("perfil__imagem");
const pictureImageTxt = "imagem";
pictureImage.innerHTML = pictureImageTxt;

inputFile.addEventListener("change", function (e) {

  const inputTarget = e.target;
  const arquivo = inputTarget.files[0];

  if (arquivo) {
    const reader = new FileReader();

    reader.addEventListener("load", function (e) {
      const readerTarget = e.target;

      const img = document.createElement("img");
      img.src = readerTarget.result;
      img.classList.add("perfil__imagem__imagem");

      pictureImage.innerHTML = "";
      pictureImage.appendChild(img);
    });

    reader.readAsDataURL(arquivo);
  } else {
    pictureImage.innerHTML = pictureImageTxt;
  }
});
/******************************************************************/
const usuario = JSON.parse(sessionStorage.getItem("usuarioLogado"));

const idUsuario = usuario.id;
document.getElementById("perfil__formulario__nome").value = usuario.nome;
document.getElementById("perfil__formulario__telefone").value = (usuario.telefone === undefined) ? "" : usuario.telefone;
document.getElementById("perfil__formulario__cidade").value = (usuario.cidade === undefined) ? "" : usuario.cidade;
document.getElementById("perfil__formulario__sobre").textContent = (usuario.sobre === undefined) ? "" : usuario.sobre;

if (usuario.foto !== "" && usuario.foto !== undefined) {
    if (document.querySelector(".perfil__imagem__imagem") === null) {
        const img = document.createElement("img");
        img.classList.add("perfil__imagem__imagem");
        pictureImage.innerHTML = "";
        pictureImage.appendChild(img);
    }
    document.querySelector(".perfil__imagem__imagem").src = usuario.foto;
} else {
    console.log("ENTROU");
    document.getElementById("perfil__imagem").innerHTML = "clique para adicionar imagem";
}

const telefone = document.getElementById("perfil__formulario__telefone");

// aplica máscara no telefone da tela
aplicaMascaraTelefone(telefone);

// aplica máscara cada vez que um dígito do telefone é digitado
telefone.addEventListener("keyup", () => {
    aplicaMascaraTelefone(telefone);
} )

const btnSalvar = document.getElementById("perfil__container-central__botao-salvar");
btnSalvar.addEventListener("click", async (evento) => {
    evento.preventDefault();

    let telefone = document.getElementById("perfil__formulario__telefone");
    // valida o telefone informado e sai se inválido
    if (!validarTelefone) return;
    // retira a máscara do telefone antes de gravar no json
    telefone = telefone.value.replace("(", "").replace(")", "").replace(" ", "").replace("-", "");

    const cidade   = document.getElementById("perfil__formulario__cidade").value;
    const sobre    = document.getElementById("perfil__formulario__sobre").value;
    const foto     = document.querySelector(".perfil__imagem__imagem").src;

    const usuarioPUT = {
        id:       idUsuario,
        nome:     usuario.nome,
        email:    usuario.email,
        telefone: telefone,
        cidade:   cidade,
        estado:   "TESTE",
        sobre:    sobre,
        foto:     foto
    }

    const config = {
        method: 'PATCH',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(usuarioPUT)
    }

    try{ 
        const resposta = await fetch(urlUsuarios + '/' + idUsuario, config);
        
        if (!resposta.ok) {
            alert('Erro ao atualizar o perfil: O PUT na API retornou o status "' + resposta.status + '".');
            return;
        }
    } catch(erro) {
        alert('Erro ao atualizar o perfil: ' + erro);
        return;
    }

    sessionStorage.removeItem("usuarioLogado");
    sessionStorage.setItem("usuarioLogado", JSON.stringify(usuarioPUT));
    window.location.href = "../html/home.html";
})