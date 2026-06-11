import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './views/Home';
import Sobre from './views/Sobre';
import Especialidades from './views/Especialidades';
import Medicos from './views/Medicos';
import Agendamento from './views/Agendamento';
import Contato from './views/Contato';
import './resources/css/global.css';

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/especialidades" element={<Especialidades />} />
      <Route path="/medicos" element={<Medicos />} />
      <Route path="/agendamento" element={<Agendamento />} />
      <Route path="/contato" element={<Contato />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);

export default App;
