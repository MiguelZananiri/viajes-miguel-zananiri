import Header from './components/Header.jsx'
import Inicio from './components/pages/Inicio.jsx'
import Vuelos from './components/pages/Vuelos.jsx'
import Hoteles from './components/pages/Hoteles.jsx'
import Destinos from './components/pages/Destinos.jsx'
import { Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  
  return (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/destinos" element={<Destinos />} />
      <Route path="/destinos/:destinoId/vuelos" element={<Vuelos />} />
      <Route path="/destinos/:destinoId/hoteles" element={<Hoteles />} />
      <Route path="/destinos/:destinoId/vuelos/:id" element={<Vuelos />} />
      <Route path="/destinos/:destinoId/hoteles/:id" element={<Hoteles />} />
    </Routes>
  </>
)
}

export default App
