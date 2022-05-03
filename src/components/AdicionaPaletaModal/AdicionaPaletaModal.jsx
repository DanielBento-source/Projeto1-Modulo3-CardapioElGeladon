import { useState, useEffect } from "react";
import Modal from "components/Modal/Modal";
import './AdicionaPaletaModal.css'

function AdicionaPaletaModal({ closeModal }) {
    const form = {
        preco: "",
        sabor: "",
        recheio: "",
        descricao: "",
        foto: "",
    };

    const [state, setState] = useState(form);

    const handleChange = (e, name) => {
        setState({ ...state, [name]: e.target.value, });
    };

    const [canDisable, setCanDisable] = useState(true);

const canDisableSendButton = () => {
    const response = !Boolean(
        state.descricao.length
        && state.foto.length
        && state.sabor.length
        && state.preco.length
    );

    setCanDisable(response);
};

useEffect(() => {
    canDisableSendButton();
})

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
                            onChange={(e) => handleChange(e, "preco")} 
                            required/>
                    </div>
                    <div>
                        <label className="AdicionaPaletaModal__text" htmlFor="sabor"> Sabor: </label>
                        <input
                            id="sabor"
                            placeholder="Chocolate"
                            type="text"
                            value={state.sabor}
                            onChange={(e) => handleChange(e, "sabor")}
                            required />
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
                            onChange={(e) => handleChange(e, "descricao")} 
                            required/>
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
                            onChange={(e) => handleChange(e, "foto")} 
                            required/>
                    </div>
                    <button type="button" disabled={canDisable} className="AdicionaPaletaModal__enviar"  >
                        Enviar
                    </button> 
                </form>
            </div>
        </Modal>
    );
}

export default AdicionaPaletaModal;