import { useState } from "react";
import './Home.css'
import PaletaLista from 'components/PaletaLista/PaletaLista';
import Navbar from 'components/Navbar/Navbar'
import AdicionaPaletaModal from "components/AdicionaPaletaModal/AdicionaPaletaModal";



function Home() {
    const [canShowAdicionaPaletaModal, setCanShowAdicionaPaletaModal] = useState(false);

    return <div className="Home">
        <Navbar createPaleta={() => setCanShowAdicionaPaletaModal(true)} />
        <div className="Home__container">
            <PaletaLista />
            {canShowAdicionaPaletaModal &&(<AdicionaPaletaModal closeModal={() => setCanShowAdicionaPaletaModal(false)} />)}
        </div>
    </div>;
  }
  
  export default Home;