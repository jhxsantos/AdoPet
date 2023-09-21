export function validarEmail(email, erro) {   
    
    if (email.validity.valueMissing) {
        erro.textContent = "Informe o e-mail";
        return false;
    }
    if (email.validity.typeMismatch) { 
        erro.textContent = "Informe um e-mail válido";
        return false;
    }
    if (email.validity.tooShort) {
        erro.textContent = `O e-mail deve ter no mínimo ${email.minLength} caracteres`;
        return false;
    }
    erro.textContent = " "
    return true;
}

export function validarNome(nome, erro) {
    if (nome.validity.valueMissing) {
        erro.textContent = "Informe o nome";
        return false;
    }
    if (nome.validity.tooShort) {
        erro.textContent = `O nome deve ter no mínimo ${nome.minLength} caracteres`;
        return false;
    }
    erro.textContent = " ";
    return true;
}

export function validarSenha(senha, erro) {

    if (senha.validity.valueMissing) {
        erro.textContent = "Informe a senha";
        return false;
    }
    if (senha.validity.tooShort) {
        erro.textContent = `A senha deve ter no mínimo ${senha.minLength} caracteres`;
        return false;
    }
    erro.textContent = " ";
    return true;
}

export function validarMensagem(mensagem, erro) {    
    if (mensagem.validity.valueMissing) {
        erro.textContent = "Escreva uma mensagem";
        return false;
    }
    if (mensagem.validity.tooShort) {
        erro.textContent = `A mensagem deve ter no mínimo ${mensagem.minLength} caracteres`;
        return false;
    }
    erro.textContent = " "
    return true;
}

/*** funções de máscara no campo telefone *************************/
const mascaraTelefone = (value) => {
    if (!value) return ''
    
    return value
        .replace(/[\D]/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(value[5] != 9 ? /(\d{4})(\d)/ : /(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})(\d+?)/, '$1')
}
    
export const aplicarMascaraTelefone = (telefone) => {

    /*** GAMBIARRA PRA CORRIGIR O PROBLEMA DA MÁSCARA ***/
    let ultDig = "";
    if (telefone.value.length === 11) {
        ultDig = telefone.value.slice(10, 11);
    }
    telefone.value = mascaraTelefone(telefone.value)
    if (telefone.value.length === 15) {
        ultDig = "";
    }
    telefone.value += ultDig;
    /***************************************************/

    telefone.value = mascaraTelefone(telefone.value)
}

export const limparMascaraTelefone = (telefone) => {
    return telefone.replace("(", "").replace(")", "").replace(" ", "").replace("-", "");
}
/******************************************************************/

export function validarTelefone(telefone, erro) {    

    const tel = limparMascaraTelefone(telefone.value);
    const nroDigitos = ( tel.slice(2, 3) === "9" ) ? 11 : 10;

    if (tel.length === nroDigitos) {
        erro.textContent = " "
        return true
    }

    erro.textContent = "Informe um telefone válido"
    return false;
}
