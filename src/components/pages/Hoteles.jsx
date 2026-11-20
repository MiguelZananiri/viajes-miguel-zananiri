import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import "./Hoteles.css"
import DetalleHotel from "./DetalleHotel.jsx"

function Hoteles() {
    const [hoteles, setHoteles] = useState([])
    const [estaCargado, setEstaCargado] = useState(null)
    const [error, setError] = useState("")
    const { destinoId, id } = useParams()

    const OBTENER_OPCIONES_DESTINO = `
    query obtenerOpcionesDestino($destinoId: id) {
      hoteles(destinoId: $destinoId) {
        id
        hotel
        precio
        fechas
        disponible
      }
    }
  `

    useEffect(() => {
        const controller = new AbortController()

        async function obtenerHoteles() {
            try {
                const response = await fetch('/graphql', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query: OBTENER_OPCIONES_DESTINO, variables: { destinoId } }),
                    signal: controller.signal,
                })

                if (!response.ok) {
                    throw new Error('No se pudieron obtener los hoteles')
                }

                const resultado = await response.json()

                if (resultado.errors?.length) {
                    throw new Error(resultado.errors[0].message)
                }

                setHoteles(resultado.data.hoteles)
                setEstaCargado(true)
            } catch (error) {
                if (error.name !== 'AbortError') {
                    setError(error.message)
                }
                setEstaCargado(false)
            }
        }

        obtenerHoteles()

        return () => controller.abort()
    }, [destinoId])

    if (id) {
        return <DetalleHotel hoteles={hoteles} />
    }

    return (
        <>
            <h1>HOTELES</h1>

            <Link className="boton" to="/destinos">Volver</Link>

            {error ? (
                <div className="mensaje-error">
                    <h3 role="alert">
                        {error}
                    </h3>
                </div>
            ) : estaCargado === false ? (
                <div className="mensaje-error">
                    <h3>Los datos no se han cargado</h3>
                    <h4>Vuelva mas tarde, y si el error persiste contactese con nosotros</h4>
                </div>
            ) : hoteles.length === 0 ? (
                <div className="mensaje-error">
                    <h3>No hay hoteles disponibles.</h3>
                </div>
            ) : (
                <div className="hoteles-container">
                    {hoteles.map((hotel) => (
                        <div className="hoteles" key={hotel.id}>
                            <img src={hotel.imagen} />
                            <div className="detalle">
                                <p>{hotel.hotel}</p>
                                <p>CLP$ {hotel.precio.toLocaleString("es-CL")}</p>
                                <p>{hotel.disponible ? "Disponible" : "No disponible"}</p>
                                <Link to={`/destinos/${destinoId}/hoteles/${hotel.id}`} className="boton">Ver Detalles</Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}


        </>
    )
}

export default Hoteles