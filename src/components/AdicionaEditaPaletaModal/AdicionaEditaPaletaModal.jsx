import "./AdicionaEditaPaletaModal.css";
import { useState, useEffect } from "react";
import Modal from "components/Modal/Modal";
import { PaletaService } from "Services/PaletaService";
import { ActionMode } from "constants/index";

function AdicionaEditaPaletaModal({ closeModal, onCreatePaleta, mode, paletaToUpdate, onUpdatePaleta }) {
  const form = {
    preco: paletaToUpdate?.preco ?? '',
    sabor: paletaToUpdate?.sabor ?? '',
    recheio: paletaToUpdate?.recheio ?? '',
    descricao: paletaToUpdate?.descricao ?? '',
    foto: paletaToUpdate?.foto ?? '',
  }

    const [state, setState] = useState(form);
    const [canDisable, setCanDisable] = useState(true);

    const canDisableSendButton = () => {
        const response = !Boolean(
            state.descricao.length &&
            state.foto.length &&
            state.sabor.length &&
            String(state.preco).length
        );

        setCanDisable(response);
    };

    const handleChange = (e, name) => {
        setState({ ...state, [name]: e.target.value });
    };

    useEffect(() => {
        canDisableSendButton();
    });

    const handleSend = async () => {
        const renomeiaCaminhoFoto = (fotoPath) => fotoPath.split(/\\|\//).pop();

        const { sabor, recheio, descricao, preco, foto } = state;

        const titulo = sabor + (recheio && " com " + recheio);

        const paleta = {
            ...(paletaToUpdate && { _id: paletaToUpdate?.id }),
            sabor: titulo,
            descricao,
            preco,
            foto: `assets/images/${renomeiaCaminhoFoto(foto)}`,
        };

        const serviceCall = {
            [ActionMode.NORMAL]: () => PaletaService.create(paleta),
            [ActionMode.ATUALIZAR]: () => PaletaService.updtateById(paletaToUpdate?.id, paleta),
          }
      
          const response = await serviceCall[mode]();
      
          const actionResponse = {
            [ActionMode.NORMAL]: () => onCreatePaleta(response),
            [ActionMode.ATUALIZAR]: () => onUpdatePaleta(response),
          }
      
          actionResponse[mode]();
      
          const reset = {
            preco: '',
            sabor: '',
            recheio: '',
            descricao: '',
            foto: '',
          }
      
          setState(reset);
        closeModal();
    };

    return (
        <Modal closeModal={closeModal}>
            <div className="AdicionaPaletaModal">
                <form autoComplete="off">
                <h2> { ActionMode.ATUALIZAR === mode ? 'Atualizar' : 'Adicionar ao' } Cardápio </h2>
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
                            required
                            onChange={(e) => handleChange(e, "foto")} />
                    </div>

                    <button
                        className="AdicionaPaletaModal__enviar"
                        type="button"
                        disabled={canDisable}
                        onClick={handleSend} >
              { ActionMode.NORMAL === mode ? 'Enviar' : 'Atualizar' }
                    </button>
                </form>
            </div>
        </Modal>
    );
}

export default AdicionaEditaPaletaModal;