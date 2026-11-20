import { useParams, Link } from 'react-router-dom'
import "./Detalle.css"

function DetalleHotel({ hoteles }) {
    const { id } = useParams();
    const hotel = hoteles.find((hotel) => String(hotel.id) === id)

    if (!hotel) {
        return <p>No se encontro el hotel</p>
    }

        return (
        <>
            <h1>DETALLE HOTEL</h1>

            <Link className="boton" to="/destinos">Volver a destinos</Link>

            <div className="detalle-container">
                <div>
                    <h2>{hotel.hotel}</h2>
                    <hr />
                    <p>Precio: ${hotel.precio.toLocaleString("es-CL")}</p>
                    <hr />
                    <p>{hotel.disponible ? "Disponible" : "No disponible"}</p>
                </div>
            </div>
        </>
    );
}

export default DetalleHotel