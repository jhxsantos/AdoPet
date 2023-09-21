import { urlAnimais } from "./urlAPI.js"

export async function listarAnimais() {
    try {
        const resposta = await fetch(urlAnimais);
        if (!resposta.ok) {
            throw new Error('O POST na API retornou o status "' + resposta.status + '".');
        }
        const animais = await resposta.json();
        return animais;
    } catch(error) {
        throw new Error("[GET] " + error);
    } 
}

export function preparaAnimaisParaMostrar(animais) {
    let animaisParaMostrar = "";
    animais.forEach( (animal, i) => {
        const animalDaVez = `<div class="animal" id="animal">
                                <div class="animal__foto" id="animal__foto">
                                    <img class="animal__foto__imagem" src=${animal.foto}>
                                </div>
                                <div class="animal__info">
                                    <p class="label-azul" id="animal__info__nome">${animal.nome}</p>
                                    <p class="animal__info__idade texto-pequeno" id="animal__info__idade">${animal.idade}</p>
                                    <p class="animal__info__porte texto-pequeno" id="animal__info__porte">Porte ${animal.porte}</p>
                                    <p class="animal__info__indole texto-pequeno" id="animal__info__indole">${animal.indole}</p>
                                    <p class="animal__info__cidade legenda" id="animal__info__cidade">${animal.cidade} (${animal.estado})</p>
                                    <a class="animal__info__contato link" id="animal__info__contato" href="#">
                                        <img src="../img/icone-mensagem.png" alt="ícone falar com o responsável.">
                                        <p class="animal__info__responsavel" id="animal__info__responsavel" data-id="${animal.id}" data-nome="${animal.nome}" data-idade="${animal.idade}" data-porte="${animal.porte}">Falar com o responsável</p>
                                    </a>
                                </div>
                            </div>`

        animaisParaMostrar += animalDaVez;
        
    })
    return animaisParaMostrar;
}