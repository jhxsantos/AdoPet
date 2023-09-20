export const carregaListaCidades = async (select) => {
    try {
        const resposta = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome");

        if (!resposta.ok) {
            throw new Error("operação GET não retornou dados. Status: " + resposta.status)
        }

        const cidades = await resposta.json();

        select.innerHTML = '<option value="" selected disabled></option>';

        cidades.forEach( cidade => {
            const option = document.createElement("option");
            option.value = cidade.nome.replaceAll(" ", "").toLowerCase();
            option.textContent = cidade.nome;
            select.appendChild(option);
        });
        return "";

    } catch (erro) {
        return erro;
    }
}