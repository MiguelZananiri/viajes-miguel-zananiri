import { http, HttpResponse } from 'msw';
import { graphql } from 'msw/graphql';

const base = import.meta.env.BASE_URL

const apiGraphQL = graphql.link(`${base}graphql`)

const data = {
     "destinos": [
        {
            "id": 1,
            "imagen": "/images/berlin-img1.jpg",
            "ciudad": "Berlin",
            "pais": "Alemania",
            "actividadPopular": "Recorrer East Side Gallery"
        },
        {
            "id": 2,
            "imagen": "/images/madrid-img.jpg",
            "ciudad": "Madrid",
            "pais": "España",
            "actividadPopular": "Paseo parque retiro"
        },
        {
            "id": 3,
            "imagen": "/images/estocolmo-img.jpg",
            "ciudad": "Estocolmo",
            "pais": "Suecia",
            "actividadPopular": "Visita al museo Vasa"
        }
    ], 
    "vuelos": [
        {
            "id": "v1",
            "destinoId": 1,
            "imagen": "/images/avion1.jpg",
            "vuelo": "Vuelo a Berlin, Alemania",
            "precio": 420000,
            "fecha": "05-11-2026",
            "disponible": true
        },
        {
            "id": "v2",
            "destinoId": 1,
            "imagen": "/images/avion2.jpg",
            "vuelo": "Vuelo a Berlin, Alemania",
            "precio": 380000,
            "fecha": "10-12-2026",
            "disponible": true
        },
        {
            "id": "v3",
            "destinoId": 1,
            "imagen": "/images/avion3.jpg",
            "vuelo": "Vuelo a Berlin, Alemania",
            "precio": 350000,
            "fecha": "20-12-2026",
            "disponible": true
        },
        {
            "id": "v4",
            "destinoId": 2,
            "imagen": "/images/avion1.jpg",
            "vuelo": "Vuelo a Madrid, España",
            "precio": 600000,
            "fecha": "21-11-2026",
            "disponible": true
        },
        {
            "id": "v5",
            "destinoId": 2,
            "imagen": "/images/avion2.jpg",
            "vuelo": "Vuelo a Madrid, España",
            "precio": 540000,
            "fecha": "23-11-2026",
            "disponible": true
        },
        {
            "id": "v6",
            "destinoId": 2,
            "imagen": "/images/avion3.jpg",
            "vuelo": "Vuelo a Madrid, España",
            "precio": 490000,
            "fecha": "05-12-2026",
            "disponible": true
        },
        {
            "id": "v7",
            "destinoId": 3,
            "imagen": "/images/avion1.jpg",
            "vuelo": "Vuelo a Estocolmo, Suecia",
            "precio": 540000,
            "fecha": "08-12-2026",
            "disponible": true
        },
        {
            "id": "v8",
            "destinoId": 3,
            "imagen": "/images/avion2.jpg",
            "vuelo": "Vuelo a Estocolmo, Suecia",
            "precio": 480000,
            "fecha": "10-12-2026",
            "disponible": true
        },
        {
            "id": "v9",
            "destinoId": 3,
            "imagen": "/images/avion3.jpg",
            "vuelo": "Vuelo a Estocolmo, Suecia",
            "precio": 390000,
            "fecha": "14-12-2026",
            "disponible": true
        },
    ],
    "hoteles": [
        {
            "id": "h1",
            "destinoId": 1,
            "imagen": "/images/hotel1.jpg",
            "hotel": "Hotel en Berlin, Alemania",
            "precio": 150000,
            "disponible": true
        },
        {
            "id": "h2",
            "destinoId": 1,
            "imagen": "/images/hotel2.jpg",
            "hotel": "Hotel en Berlin, Alemania",
            "precio": 130000,
            "disponible": true
        },
        {
            "id": "h3",
            "destinoId": 1,
            "imagen": "/images/hotel3.jpg",
            "hotel": "Hotel en Berlin, Alemania",
            "precio": 110000,
            "disponible": true
        },
        {
            "id": "h4",
            "destinoId": 2,
            "imagen": "/images/hotel1.jpg",
            "hotel": "Hotel en Madrid, España",
            "precio": 230000,
            "disponible": true
        },
        {
            "id": "h5",
            "destinoId": 2,
            "imagen": "/images/hotel2.jpg",
            "hotel": "Hotel en Madrid, España",
            "precio": 210000,
            "disponible": true
        },
        {
            "id": "h6",
            "destinoId": 2,
            "imagen": "/images/hotel3.jpg",
            "hotel": "Hotel en Madrid, España",
            "precio": 170000,
            "disponible": true
        },
        {
            "id": "h7",
            "destinoId": 3,
            "imagen": "/images/hotel1.jpg",
            "hotel": "Hotel en Estocolmo, Suecia",
            "precio": 350000,
            "disponible": true
        },
        {
            "id": "h8",
            "destinoId": 3,
            "imagen": "/images/hotel2.jpg",
            "hotel": "Hotel en Estocolmo, Suecia",
            "precio": 320000,
            "disponible": true
        },
        {
            "id": "h9",
            "destinoId": 3,
            "imagen": "/images/hotel3.jpg",
            "hotel": "Hotel en Estocolmo, Suecia",
            "precio": 270000,
            "disponible": true
        },
    ] 
};



export const handlers = [
    http.get(`${base}api/destinos`, () => {
        return HttpResponse.json(data.destinos);
    }),

    apiGraphQL.query("obtenerOpcionesDestino", ({ variables }) => {
        const destinoId = Number(variables.destinoId)

        const destinoExiste = data.destinos.some(
            (destino) => destino.id === destinoId
        )

        if (!destinoExiste) {
            return HttpResponse.json({
                errors: [{ message: 'Este destino no existe' }]
            })
        }

        const vuelos = data.vuelos.filter(
            (vuelo) => vuelo.destinoId === destinoId
        )

        const hoteles = data.hoteles.filter(
            (hotel) => hotel.destinoId === destinoId
        )

        return HttpResponse.json({
            data: { vuelos, hoteles }
        })
    })
];