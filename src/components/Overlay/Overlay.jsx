import './Overlay.css'

function Overlay({children,OverlayOnClick}){
    return (
        <div className="Overlay" onclick={() => OverlayOnClick()}>
        {children}
        </div>
        )
}

export default Overlay;