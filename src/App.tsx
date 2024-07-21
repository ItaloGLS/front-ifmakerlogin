import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import PaginaInicial from './pages/paginaInicial';
import Agendamento from './pages/agendamento';
import Equipe from './pages/equipe';
import PainelDeControle from './pages/painelDeControle';
import { Navbar } from './components/components';

const App: React.FC = () => {
  const location = useLocation();

  const hideNavbarOnPaths: string[] = ['/'];

  const shouldRenderNavbar = !hideNavbarOnPaths.includes(location.pathname);

  return (
    <div>
      {shouldRenderNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<PaginaInicial />} />
        <Route path="/agendamento" element={<Agendamento />} />
        <Route path="/equipe" element={<Equipe />} />
        <Route path="/paineldecontrole" element={<PainelDeControle />} />
      </Routes>
    </div>
  );
}

export default App;
