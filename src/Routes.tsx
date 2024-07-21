// Routes.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaginaInicial from './pages/paginaInicial';
import Agendamento from './pages/agendamento';
import Equipe from './pages/equipe';
import Login from './pages/login'
import {Navbar} from './components/components';
import PainelDeControle from './pages/painelDeControle';

import PrivateRoute from './components/PrivateRoute';

const AppRoutes: React.FC = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<PaginaInicial />} />
      <Route path="/agendamento" element={<Agendamento />} />
      <Route path="/equipe" element={<Equipe />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/paineldecontrole"
        element={
          <PrivateRoute>
            <PainelDeControle />
          </PrivateRoute>
        }
      />
    </Routes>
  </Router>
);

export default AppRoutes;
