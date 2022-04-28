import React, {useState} from 'react'
import PaletaListaItem from 'components/PaletaIListaItem/PaltetaListaItem';
import { paletas } from 'mocks/paletas.js';
import './PaletaLista.css'

function PaletaLista() {

    const [paletaSelecionada, setPaletaSelecionada] = useState({});

  const adicionarItem = (paletaIndex) => {
          const paleta = { [paletaIndex]: Number(paletaSelecionada[paletaIndex] || 0) +1 }
          setPaletaSelecionada({ ...paletaSelecionada, ...paleta});
  }

  const removerItem = (paletaIndex) => {
    const paleta = { [paletaIndex]: Number(paletaSelecionada[paletaIndex] || 0) -1 }
    setPaletaSelecionada({...paletaSelecionada, ...paleta});
  }


    return <div className="PaletaLista">
	{paletas.map((paleta, index) => (
		<PaletaListaItem key={`PaletaListaItem=${index}`}/> 
))}
</div>
}

export default PaletaLista;
