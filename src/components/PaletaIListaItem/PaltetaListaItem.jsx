import './PaletaListaItem.css'

function PaletaListaItem() {
    
    const removerItem = (i) => console.log('remover' + i);
	const adicionarItem = (i) => console.log('adicionar' + i);
	const paletaSelecionada = [0];
	const index = 0;
	const paleta = {
		titulo: "Açaí com Leite Condensado",
		descricao:
		"Quam vulputate dignissim suspendisse in est ante in nibh mauris.",
		foto: require("assets/images/acai-com-leite-condensado.png"),
		preco: 10.0,
		sabor: "Açaí",
		recheio: "Leite Condensado",
		possuiRecheio: true,
	};

    const badgeCounter = (canRender, index) =>
	Boolean(canRender) && (<span className="PaletaListaItem__badge"> {paletaSelecionada[index]} </span>);

  const removeButton = (canRender, index) =>
	Boolean(canRender) && (<button className="Acoes__remover" onClick={() => removerItem(index)}>remover</button>);

    return(<div className="PaletaListaItem">
    {badgeCounter(paletaSelecionada[index], index)}
    <div>
        <div className="PaletaListaItem__titulo">{paleta.titulo}</div>
        <div className="PaletaListaItem__preco">{paleta.preco.toFixed(2)}</div>
        <div className="PaletaListaItem__descricao">{paleta.descricao}</div>
        <div className="PaletaListaItem__acoes Acoes">
          <button className={`Acoes__adicionar ${!paletaSelecionada[index] && "Acoes__adicionar--preencher"}`} onClick={() => adicionarItem(index)}>adicionar</button>
          {removeButton(paletaSelecionada[index], index)}
        </div>
    </div>
        <img className="PaletaListaItem__foto" src={paleta.foto} alt={`Paleta de ${paleta.sabor}`} />
</div>)
}

export default PaletaListaItem;