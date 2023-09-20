export function validarEmail(email, erro) {    
    if (email.validity.valueMissing) {
        "Informe o e-mail";
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

/*** Aplicar a máscara no campo telefone ***************************/
const mascaraTelefone = (value) => {
    if (!value) return ''
    
    return value
        .replace(/[\D]/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(value[5] != 9 ? /(\d{4})(\d)/ : /(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})(\d+?)/, '$1')
}
    
export const aplicaMascaraTelefone = (input) => {
input.value = mascaraTelefone(input.value)
}
/******************************************************************/

export function validarTelefone(telefone, erro) {    
    const nroDigitos = ( telefone.value.slice(5, 6) === "9" ) ? 14 : 13;
    if (telefone.value.length === nroDigitos) {
        erro.textContent = " "
        return true
    }
    erro.textContent = "Informe um telefone válido"
    return false;
}
