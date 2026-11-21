import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./Destinos.css"

function Destinos() {
    const [destinos, setDestinos] = useState([])
    const [estaCargado, setEstaCargado] = useState(null)

    useEffect(() => {
        const controller = new AbortController()

        async function obtenerDestinos() {
            try {
                const response = await fetch(`${import.meta.env.BASE_URL}api/destinos`, {
                    signal: controller.signal,
                })

                if (!response.ok) {
                    throw new Error('No se pudieron obtener los destinos')
                }

                const resultado = await response.json()

                if (resultado.errors?.length) {
                    throw new Error(resultado.errors[0].message)
                }

                setDestinos(resultado)
                setEstaCargado(true)
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error(error)
                }
                setEstaCargado(false)
            }
        }

        obtenerDestinos()

        return () => controller.abort()
    }, [])

    return (
        <>
            <h1>DESTINOS</h1>

            {estaCargado === false ? (
                <div className="mensaje-error">
                    <h3>Los datos no se han cargado</h3>
                    <h4>Vuelva mas tarde, y si el error persiste contactese con nosotros</h4>
                </div>
            ) : (
                destinos.length === 0 ? (
                    <div className="mensaje-error">
                        <h3>No hay destinos disponibles.</h3>
                    </div>
                ) : (
                    <div className="destinos-container">
                        {destinos.map((destino) => (
                            <div className="destinos" key={destino.id}>
                                <img src={`${import.meta.env.BASE_URL}${destino.imagen.replace(/^\//, '')}`} />
                                <div className="detalle">
                                    <h2>{destino.ciudad}</h2>
                                    <p>Pais: {destino.pais}</p>
                                    <p>Actividad popular: {destino.actividadPopular}</p>
                                    <Link to={`/destinos/${destino.id}/vuelos`} className="boton">Vuelos</Link>
                                    <Link to={`/destinos/${destino.id}/hoteles`} className="boton">Hoteles</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            )}
        </>
    )
}

export default Destinos