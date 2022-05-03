import './Overlay.css'

function Overlay({children,OverlayOnClick}){
    return (
        <div className="Overlay" onClick={() => OverlayOnClick()}>
        {children}
        </div>
        )
}

export default Overlay;