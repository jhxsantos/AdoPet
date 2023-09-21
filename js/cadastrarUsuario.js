import { urlUsuarios } from "./urlAPI.js";
import { customAlert } from "./customAlert.js";

export const cadastrarUsuario = async (nome, email, senha) => {

    // verifica se o e-mail informado já existe no cadastro
    try {
        const resposta = await fetch(urlUsuarios + "?email=" + email);
        if (!resposta.ok) {
            throw new Error('O POST na API retornou o status "' + resposta.status + '".');
        }
        const usuarios = await resposta.json();

        if (usuarios.length > 0) {
            await customAlert("", "E-mail já cadastrado! Informe outro ou faça login.", "warning", "OK");
            // alert("E-mail já cadastrado! Informe outro ou faça login.");
            document.getElementById("cadastro__formulario__email").value = "";
            document.getElementById("cadastro__formulario__email").focus();
            return false;
        }

    } catch(error) {
        throw new Error("[GET] " + error);
    } 

    const config = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
                    nome: nome,
                    email: email,
                    senha: senha
                })
    }

    try {
        const resposta = await fetch(urlUsuarios, config);
        if (!resposta.ok) {
            throw new Error('O POST na API retornou o status "' + resposta.status + '".');
        }
    } catch(error) {
        throw new Error("[POST] " + error);
    } 
    return true;
}