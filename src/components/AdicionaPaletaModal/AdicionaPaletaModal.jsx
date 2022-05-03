import "./AdicionaPaletaModal.css";
import { useState, useEffect } from "react";
import Modal from "components/Modal/Modal";
import { PaletaService } from "Services/PaletaService";

function AdicionaPaletaModal({ closeModal, onCreatePaleta }) {
    const form = {
        preco: "",
        sabor: "",
        recheio: "",
        descricao: "",
        foto: "",
    };

    const [state, setState] = useState(form);
    const [canDisable, setCanDisable] = useState(true);

    const canDisableSendButton = () => {
        const response = !Boolean(
            state.descricao.length &&
            state.foto.length &&
            state.sabor.length &&
            state.preco.length
        );

        setCanDisable(response);
    };

    const handleChange = (e, name) => {
        setState({ ...state, [name]: e.target.value });
    };

    useEffect(() => {
        canDisableSendButton();
    });

    const createPaleta = async () => {
        const renomeiaCaminhoFoto = (fotoPath) => fotoPath.split("\\").pop();

        const { sabor, recheio, descricao, preco, foto } = state;

        const titulo = sabor + (recheio && " com " + recheio);

        const paleta = {
            sabor: titulo,
            descricao,
            preco,
            foto: `assets/images/${renomeiaCaminhoFoto(foto)}`,
        };

        const response = await PaletaService.create(paleta);
        onCreatePaleta(response);
        closeModal();
    };

    return (
        <Modal closeModal={closeModal}>
            <div className="AdicionaPaletaModal">
                <form autoComplete="off">
                    <h2> Adicionar ao Cardápio </h2>
                    <div>
                        <label className="AdicionaPaletaModal__text" htmlFor="preco"> Preco: </label>
                        <input
                            id="preco"
                            placeholder="10,00"
                            type="text"
                            value={state.preco}
                            required
                            onChange={(e) => handleChange(e, "preco")} />
                    </div>
                    <div>
                        <label className="AdicionaPaletaModal__text" htmlFor="sabor"> Sabor: </label>
                        <input
                            id="sabor"
                            placeholder="Chocolate"
                            type="text"
                            value={state.sabor}
                            required
                            onChange={(e) => handleChange(e, "sabor")} />
                    </div>
                    <div>
                        <label className="AdicionaPaletaModal__text" htmlFor="recheio"> Recheio: </label>
                        <input
                            id="recheio"
                            placeholder="Banana"
                            type="text"
                            value={state.recheio}
                            onChange={(e) => handleChange(e, "recheio")} />
                    </div>
                    <div>
                        <label className="AdicionaPaletaModal__text" htmlFor="descricao"> Descricao: </label>
                        <input
                            id="descricao"
                            placeholder="Detalhe o produto"
                            type="text"
                            value={state.descricao}
                            required
                            onChange={(e) => handleChange(e, "descricao")} />
                    </div>
                    <div>
                        <label className="AdicionaPaletaModal__text  AdicionaPaletaModal__foto-label" htmlFor="foto" >
                            {!state.foto.length ? "Selecionar Imagem" : state.foto}
                        </label>
                        <input
                            className=" AdicionaPaletaModal__foto"
                            id="foto"
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            value={state.foto}
                            required
                            onChange={(e) => handleChange(e, "foto")} />
                    </div>

                    <button
                        className="AdicionaPaletaModal__enviar"
                        type="button"
                        disabled={canDisable}
                        onClick={createPaleta} >
                        Enviar
                    </button>
                </form>
            </div>
        </Modal>
    );
}

export default AdicionaPaletaModal;