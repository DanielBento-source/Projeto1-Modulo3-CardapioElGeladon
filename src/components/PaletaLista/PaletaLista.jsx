import React, {useState,useEffect} from 'react'
import { PaletaService } from 'Services/PaletaService'
import PaletaListaItem from 'components/PaletaIListaItem/PaltetaListaItem';
import './PaletaLista.css'

function PaletaLista() {
    const [paletas, setPaletas] = useState([])
    const [paletaSelecionada, setPaletaSelecionada] = useState({});

    const getLista = async () => {
      const response = await PaletaService.getLista()
      setPaletas(response)
    }

  const adicionarItem = (paletaIndex) => {
          const paleta = { [paletaIndex]: Number(paletaSelecionada[paletaIndex] || 0) +1 }
          setPaletaSelecionada({ ...paletaSelecionada, ...paleta});
  }

  const removerItem = (paletaIndex) => {
    const paleta = { [paletaIndex]: Number(paletaSelecionada[paletaIndex] || 0) -1 }
    setPaletaSelecionada({...paletaSelecionada, ...paleta});
  }

  useEffect(()=> {
    getLista()
  },[])

    return <div className="PaletaLista">
	{paletas.map((paleta, index) => (
		<PaletaListaItem 
    key={`PaletaListaItem=${index}`}
    paleta={paleta}
    quantidadeSelecionada={paletaSelecionada[index]}
    index={index}
    onRemove={index => removerItem(index) }
    onAdd={index => adicionarItem(index)}
    /> 
))}
</div>
}

export default PaletaLista;
