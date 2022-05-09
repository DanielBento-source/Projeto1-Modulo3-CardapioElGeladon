const PaletaContext = {
    paletaEndpoint: () => `${Api.baseUrl}`,
    paletaLista: () => `${PaletaContext.paletaEndpoint()}/all-paletas`,
    paletaById: (id) => `${PaletaContext.paletaEndpoint()}/chosen-paleta/${id}`,
    createPaleta: () => `${PaletaContext.paletaEndpoint()}/create-paleta`,
    updatePaletaById: (id) => `${PaletaContext.paletaEndpoint()}/update-paleta/${id}`,
    deletePaletaById: (id) => `${PaletaContext.paletaEndpoint()}/delete-paleta/${id}`,
};

const SacolaContext = {
    getSacola: () => `${PaletaContext.paletaEndpoint()}/all-carrinho`,
    createSacola: () => `${PaletaContext.paletaEndpoint()}/create-carrinho`,
    purchase: () => `${PaletaContext.paletaEndpoint()}/delete-carrinho`,
}


export const Api = {
    baseUrl: "https://server-elbeladon-daniel-bento.onrender.com/paletas",
    ...PaletaContext,
    ...SacolaContext,
};