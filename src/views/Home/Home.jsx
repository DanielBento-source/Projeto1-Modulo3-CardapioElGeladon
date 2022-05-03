import { useState } from "react";
import './Home.css'
import PaletaLista from 'components/PaletaLista/PaletaLista';
import Navbar from 'components/Navbar/Navbar'
import AdicionaPaletaModal from "components/AdicionaPaletaModal/AdicionaPaletaModal";



function Home() {
    const [canShowAdicionaPaletaModal, setCanShowAdicionaPaletaModal] = useState(false);
    const [paletaParaAdicionar, setPaletaParaAdicionar] = useState();

    return <div className="Home">
        <Navbar createPaleta={() => setCanShowAdicionaPaletaModal(true)} />
        <div className="Home__container">
        <PaletaLista paletaCriada={paletaParaAdicionar} />
                {
                    canShowAdicionaPaletaModal && (
                    <AdicionaPaletaModal
                        closeModal={() => setCanShowAdicionaPaletaModal(false)}
                        onCreatePaleta={(paleta) => setPaletaParaAdicionar(paleta)} />
                    )
                }
        </div>
    </div>;
  }
  
  export default Home;