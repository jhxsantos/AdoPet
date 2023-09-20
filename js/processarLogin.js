import { urlUsuarios } from "./urlAPI.js";

// busca pelo email informado e, se encontrar 
// o usuário, grava na sessionStorage
export async function efetuarLogin(email, senha) {
    try {
        
        console.log(`${urlUsuarios}?email=${email}`);

        const resposta = await fetch(`${urlUsuarios}?email=${email}`);
        const usuario  = await resposta.json();

        if (usuario.length > 0) {

            if (email === usuario[0].email && senha === usuario[0].senha) {
                
                const usarioLogado = {
                    id:       usuario[0].id,
                    nome:     usuario[0].nome,
                    email:    usuario[0].email,
                    telefone: usuario[0].telefone,
                    cidade:   usuario[0].cidade, 
                    estado:   usuario[0].estado,
                    sobre:    usuario[0].sobre,
                    foto:     usuario[0].foto
                }
                sessionStorage.setItem("usuarioLogado", JSON.stringify(usarioLogado));
                window.location.href = "../html/home.html";
            } else {
                alert("Email ou senha inválidos!")
                document.getElementById("login__formulario__email").focus();
            }
        } else {
            alert("Email ou senha inválidos!")
            document.getElementById("login__formulario__email").focus();
        }

    } catch(erro) {  
        alert("Erro ao fazer login! " + erro)            ;
    }
};

// configura os elementos da tela de acordo com o usuário logado
export function verificaUsuarioLogado() {
    const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));
    if (usuarioLogado) {        
        const nome = document.getElementById("usuario__nome__texto");
        if (nome) nome.textContent = usuarioLogado.nome.slice(0, usuarioLogado.nome.indexOf(" "));
        const avatarUsuario = document.getElementById("usuario__avatar__imagem");
        if (usuarioLogado.foto && avatarUsuario) avatarUsuario.src = usuarioLogado.foto;
        const msg =  document.getElementById("menu__perfil");
        if (msg) msg.style.display = "flex";
        const user = document.getElementById("usuario");
        if (user) user.style.display = "flex";
        const login = document.getElementById("login");
        if (login) login.style.display = "none";
        const contatos = document.querySelectorAll(".animal__info__contato");
        if (contatos) {
            contatos.forEach( contato => {
                contato.style.display = "flex"; 
            });        
        }
    } else {
        const nome = document.getElementById("usuario__nome__texto");
        if (nome) document.getElementById("usuario__nome__texto").textContent = "";
        const foto = document.getElementById("usuario__avatar__imagem");
        if (foto) foto.src = "../img/Usuario.png";
        const msg =  document.getElementById("menu__perfil");
        if (msg) msg.style.display = "none";
        const user = document.getElementById("usuario");
        if (user) user.style.display = "none";
        const login = document.getElementById("login");
        if (login) login.style.display = "flex";
        const contatos = document.querySelectorAll(".animal__info__contato");
        if (contatos) {
            contatos.forEach( contato => {
                contato.style.display = "none"; 
            });        
        }
    }
}

// exclui o usuário Logado da sessionStorage
export function logOut() {
    sessionStorage.removeItem("usuarioLogado");
}
