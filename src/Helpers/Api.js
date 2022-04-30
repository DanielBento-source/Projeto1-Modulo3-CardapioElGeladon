const PaletaContext = {
    paletaEndpoint: () => `${Api.baseUrl}`,
    paletaLista: () => `${PaletaContext.paletaEndpoint()}/all-paletas`,
    paletaById: (id) => `${PaletaContext.paletaEndpoint()}/chosen-paleta/${id}`,
    createPaleta: () => `${PaletaContext.paletaEndpoint()}/create-paleta`,
    updatePaletaById: (id) => `${PaletaContext.paletaEndpoint()}/update-paleta/${id}`,
    deletePaletaById: (id) => `${PaletaContext.paletaEndpoint()}/delete-paleta/${id}`,
};

export const Api = {
    baseUrl: "http://localhost:3004/paletas",
    ...PaletaContext,
};