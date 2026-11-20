import { useParams, Link  } from 'react-router-dom'

function DetalleVuelo({ vuelos }) {
    const { id } = useParams();
    const vuelo = vuelos.find((vuelo) => String(vuelo.id) === id)

    if (!vuelo) {
        return <p>No se encontro el vuelo</p>
    }

        return (
        <>
            <h1>DETALLE VUELO</h1>

            <Link className="boton" to="/destinos">Volver a destinos</Link>

            <div className="detalle-container">
                <div>
                    <h2>{vuelo.vuelo}</h2>
                    <hr />
                    <p>{vuelo.fecha}</p>
                    <hr />
                    <p>Precio: ${vuelo.precio.toLocaleString("es-CL")}</p>
                    <hr />
                    <p>{vuelo.disponible ? "Disponible" : "No disponible"}</p>
                </div>
            </div>
        </>
    );
}

export default DetalleVuelo