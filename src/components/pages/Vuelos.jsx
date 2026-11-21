import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import "./Vuelos.css"
import DetalleVuelo from "./DetalleVuelo.jsx"

function Vuelos() {
    const [vuelos, setVuelos] = useState([])
    const [estaCargado, setEstaCargado] = useState(null)
    const [error, setError] = useState("")
    const { destinoId, id } = useParams()

    const OBTENER_OPCIONES_DESTINO = `
    query obtenerOpcionesDestino($destinoId: id) {
      vuelos(destinoId: $destinoId) {
        id
        vuelo
        precio
        fecha
        disponible
      }
    }
  `

    useEffect(() => {
        const controller = new AbortController()

        async function obtenerVuelos() {
            try {
                const response = await fetch(`${import.meta.env.BASE_URL}graphql`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query: OBTENER_OPCIONES_DESTINO, variables: { destinoId } }),
                    signal: controller.signal,
                })

                if (!response.ok) {
                    throw new Error('No se pudieron obtener los vuelos')
                }

                const resultado = await response.json()

                if (resultado.errors?.length) {
                    throw new Error(resultado.errors[0].message)
                }

                setVuelos(resultado.data.vuelos)
                setEstaCargado(true)
            } catch (error) {
                if (error.name !== 'AbortError') {
                    setError(error.message)
                }
                setEstaCargado(false)
            }
        }

        obtenerVuelos()

        return () => controller.abort()
    }, [destinoId])


    if (id) {
        return <DetalleVuelo vuelos={vuelos} />
    }

    return (
        <>
            <h1>VUELOS</h1>

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
            ) : vuelos.length === 0 ? (
                <div className="mensaje-error">
                    <h3>No hay vuelos disponibles.</h3>
                </div>
            ) : (
                <div className="vuelos-container">
                    {vuelos.map((vuelo) => (
                        <div className="vuelos" key={vuelo.id}>
                            <img src={`${import.meta.env.BASE_URL}${vuelo.imagen.replace(/^\//, '')}`} />
                            <div className="detalle">
                                <p>{vuelo.vuelo}</p>
                                <p>CLP$ {vuelo.precio.toLocaleString("es-CL")}</p>
                                <p>Fecha: {vuelo.fecha}</p>
                                <p>{vuelo.disponible ? "Disponible" : "No disponible"}</p>
                                <Link to={`/destinos/${destinoId}/vuelos/${vuelo.id}`} className="boton">Ver Detalles</Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default Vuelos