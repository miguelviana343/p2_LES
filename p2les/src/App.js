import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './views/Home';
import Sobre from './views/Sobre';
import Especialidades from './views/Especialidades';
import Medicos from './views/Medicos';
import Agendamento from './views/Agendamento';
import Contato from './views/Contato';
import Login from './views/Login';
import Cadastro from './views/Cadastro';
import CadastrarMedico from './views/CadastrarMedico';
import AgendarConsulta from './views/AgendarConsulta';
import './resources/css/global.css';

const ProtectedRoute = ({ children }) => {
  const usuario = JSON.parse(
    localStorage.getItem('usuarioLogado') || 'null'
  );

  return usuario ? children : <Navigate to="/login" replace />;
};

const AppShell = () => {
  const location = useLocation();
  const isAuthPage = ['/login', '/cadastro'].includes(location.pathname);

  return (
    <>
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cadastrar-medico" element={<ProtectedRoute><CadastrarMedico /></ProtectedRoute>} />
        <Route path="/agendar-consulta" element={<ProtectedRoute><AgendarConsulta /></ProtectedRoute>} />
        <Route path="/sobre" element={<ProtectedRoute><Sobre /></ProtectedRoute>} />
        <Route path="/especialidades" element={<ProtectedRoute><Especialidades /></ProtectedRoute>} />
        <Route path="/medicos" element={<ProtectedRoute><Medicos /></ProtectedRoute>} />
        <Route path="/agendamento" element={<ProtectedRoute><Agendamento /></ProtectedRoute>} />
        <Route path="/contato" element={<ProtectedRoute><Contato /></ProtectedRoute>} />
      </Routes>
      {!isAuthPage && <Footer />}
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <AppShell />
  </BrowserRouter>
);

export default App;
