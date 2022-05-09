import { useState } from "react";
import { ActionMode } from "constants/index"
import './Home.css'
import PaletaLista from 'components/PaletaLista/PaletaLista';
import Navbar from 'components/Navbar/Navbar'
import AdicionaEditaPaletaModal from "components/AdicionaEditaPaletaModal/AdicionaEditaPaletaModal";
import DeletaPaletaModal from "components/DeletaPaletaModal/DeletaPaletaModal";
import SacolaModal from "components/SacolaModal/SacolaModal";
import { SacolaService } from "Services/SacolaService";



function Home() {
    const [canOpenBag, setCanOpenBag] = useState();
    const [paletaEditada, setPaletaEditada] = useState();
    const [canShowAdicionaPaletaModal, setCanShowAdicionaPaletaModal] = useState(false);
    const [paletaParaAdicionar, setPaletaParaAdicionar] = useState();
    const [modoAtual, setModoAtual] = useState(ActionMode.NORMAL);
    const [paletaRemovida, setPaletaRemovida] = useState(); 

    const handleActions = (action) => {
        const novaAcao = modoAtual === action ? ActionMode.NORMAL : action;
        setModoAtual(novaAcao);
      }

    const [paletaParaEditar, setPaletaParaEditar] = useState();
    const [paletaParaDeletar, setPaletaParaDeletar] = useState();

    const handleDeletePaleta = (paletaToDelete) => {
  setPaletaParaDeletar(paletaToDelete);
}


const handleUpdatePaleta = (paletaToUpdate) => {
  setPaletaParaEditar(paletaToUpdate);
  setCanShowAdicionaPaletaModal(true);
}

const abrirSacola = async () => {
  const lista = JSON.parse(localStorage.getItem('sacola'));
  const sacola = lista.filter(i => i.quantidade > 0);

  await SacolaService.create(sacola)

  setCanOpenBag(true)
}

const handleCloseModal = () => {
    setCanShowAdicionaPaletaModal(false);
    setPaletaParaAdicionar();
    setPaletaParaDeletar();
    setPaletaParaEditar();
    setModoAtual(ActionMode.NORMAL);
  }

    return <div className="Home">
        <Navbar 
            mode={modoAtual}
            createPaleta={() => setCanShowAdicionaPaletaModal(true)}
            deletePaleta={() => handleActions(ActionMode.DELETAR)}
            updatePaleta={() =>  handleActions(ActionMode.ATUALIZAR)}
            openBag={abrirSacola} />
        <div className="Home__container">
        <PaletaLista 
            mode={modoAtual}
            paletaCriada={paletaParaAdicionar}
            paletaEditada={paletaEditada}
            paletaRemovida={paletaRemovida}
            deletePaleta={handleDeletePaleta}
            updatePaleta={handleUpdatePaleta} />
            {canShowAdicionaPaletaModal && (
             <AdicionaEditaPaletaModal
                mode={modoAtual}
                paletaToUpdate={paletaParaEditar}
                onUpdatePaleta={(paleta) => setPaletaEditada(paleta)}
                closeModal={handleCloseModal}
                onCreatePaleta={(paleta) => setPaletaParaAdicionar(paleta)}
                />)}
            {paletaParaDeletar &&
              <DeletaPaletaModal
                paletaParaDeletar={paletaParaDeletar}
                closeModal={handleCloseModal}
                onDeletePaleta={(paleta) => setPaletaRemovida(paleta)}
                />}
            {canOpenBag &&
            <SacolaModal closeModal={() => setCanOpenBag(false)} />}
        </div>
    </div>;
  }
  
  export default Home;