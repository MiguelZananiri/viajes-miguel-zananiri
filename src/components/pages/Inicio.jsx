import { Link } from "react-router-dom"
import "./Inicio.css"

function Inicio() {
    return (
        <>
            <div className="inicio">
                <h1>INICIO</h1>

                <h2>Bienvenido a TILL Airlines</h2>
                <p>Pagina de vuelos y hoteles para hacer turismo</p>
                <div className="boton-c">
                    <Link to={"/destinos"} className="boton">Explorar destinos</Link>
                </div>
            </div>

        </>
    )
}

export default Inicio