export const customAlert = async (titulo, texto, icone, textoBtnOk, textoBtnCancel = "") => {

const botaoOk = { 
    text: textoBtnOk,
    value: true,
    visible: true,
    className: "botao",
    closeModal: true
}

const botaoCancel = {
    text: textoBtnCancel,
    value: false,
    visible: textoBtnCancel ? true : false,
    className: "botao",
    closeModal: true
}

    await swal({
        title: titulo,
        text: texto,
        icon: icone,
        closeOnClickOutside: false,
        buttons: { cancel: botaoCancel, confirm: botaoOk }                    
    });
}