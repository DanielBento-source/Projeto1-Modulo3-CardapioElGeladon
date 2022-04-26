import React, {useState} from 'react'
import { paletas } from '../mocks/paletas.js';
import './PaletaLista.css'

function PaletaLista() {

    const [paletaSelecionada, setPaletaSelecionada] = useState({});

  const adicionarItem = (paletaIndex) => {
          const paleta = { [paletaIndex]: Number(paletaSelecionada[paletaIndex] || 0) +1 }
          setPaletaSelecionada({ ...paletaSelecionada, ...paleta});
  }

    return <div className="PaletaLista">
	{paletas.map((paleta, index) => (
		<div className="PaletaListaItem" key={`PaletaListaItem-${index}`}>
            <span className="PaletaListaItem__badge"> {paletaSelecionada[index] || 0} </span>
			<div>
                <div className="PaletaListaItem__titulo">{paleta.titulo}</div>
                <div className="PaletaListaItem__preco">{paleta.preco.toFixed(2)}</div>
                <div className="PaletaListaItem__descricao">{paleta.descricao}</div>
                <div className="PaletaListaItem__acoes Acoes">
                    <button className="Acoes__adicionar Acoes__adicionar--preencher" onClick={() => adicionarItem(index)}>adicionar</button>
                </div>
			</div>
				<img className="PaletaListaItem__foto" src={paleta.foto} alt={`Paleta de ${paleta.sabor}`} />
		</div>
))}
</div>
}
  export default PaletaLista;