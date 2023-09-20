import { listarAnimais } from "./processarAnimais.js";
import { preparaAnimaisParaMostrar } from "./processarAnimais.js";
import { verificaUsuarioLogado } from "./processarLogin.js";

// preenche a tela com os animais cadastrados
const animais = await listarAnimais();

const animaisParaMostrar = preparaAnimaisParaMostrar(animais);
const containerAnimais = document.getElementById("home__container-central");
containerAnimais.innerHTML = animaisParaMostrar;

//precisa chamar aqui porque a validação deve ser feita só 
// após carregar os animais na página, pois os links 
// "Falar com o responsável" dependem dessa validação.
verificaUsuarioLogado();

// se clicar no link "Falar com o responsável"...
const linksResponsavel = document.querySelectorAll(".animal__info__responsavel");
linksResponsavel.forEach( link => {
    link.addEventListener("click", () => {
        const idAnimal = link.dataset.id;
        const nomeAnimal = link.dataset.nome;
        const idadeAnimal = link.dataset.idade;
        const porteAnimal = link.dataset.porte;
        window.location.href = `../html/mensagem.html?idAnimal=${idAnimal}&nomeAnimal=${nomeAnimal}&idadeAnimal=${idadeAnimal}&porteAnimal=${porteAnimal}`;
    })
})

