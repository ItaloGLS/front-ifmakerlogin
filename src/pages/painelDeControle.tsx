import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getToken, logout } from '../auth';
import { Reserva } from '../interfaces/Reserva';
import './styles/PainelDeControle.css';

const PainelDeControle: React.FC = () => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'pendentes' | 'aprovados' | 'recusados' | 'finalizadas'>('pendentes');
  const [selectedReserva, setSelectedReserva] = useState<Reserva | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReservas();
  }, [selectedTab]);

  const fetchReservas = async () => {
    try {
      setLoading(true);
      const token = getToken();
      let url = `${process.env.REACT_APP_API_URL}/reservas`;

      switch (selectedTab) {
        case 'pendentes':
          url += '?filter=pendente';
          break;
        case 'aprovados':
          url += '?filter=aprovado';
          break;
        case 'recusados':
          url += '?filter=recusado';
          break;
        case 'finalizadas':
          url += '?filter=finalizado';
          break;
        default:
          break;
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setReservas(response.data);
    } catch (error) {
      console.error('Erro ao buscar reservas', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const updateReservaStatus = async (id: number, status: string) => {
    try {
      const token = getToken();
      await axios.put(
        `${process.env.REACT_APP_API_URL}/reservas/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      fetchReservas(); 
      setSelectedReserva(null);
    } catch (error) {
      console.error(`Erro ao atualizar status da reserva ${id}`, error);
    }
  };

  const deleteReserva = async (id: number) => {
    try {
      const token = getToken();
      await axios.delete(`${process.env.REACT_APP_API_URL}/reservas/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchReservas()
      setSelectedReserva(null);
    } catch (error) {
      console.error(`Erro ao apagar reserva ${id}`, error);
    }
  };

  const closeModal = () => {
    setSelectedReserva(null);
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <main className="principaladm">
      <section className="admpanel">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
        <h2>Solicitações de Agendamento</h2>
        <div className="tabs">
          <button onClick={() => setSelectedTab('pendentes')} className={selectedTab === 'pendentes' ? 'active' : ''}>
            Pendentes
          </button>
          <button onClick={() => setSelectedTab('aprovados')} className={selectedTab === 'aprovados' ? 'active' : ''}>
            Aprovados
          </button>
          <button onClick={() => setSelectedTab('recusados')} className={selectedTab === 'recusados' ? 'active' : ''}>
            Recusados
          </button>
          <button onClick={() => setSelectedTab('finalizadas')} className={selectedTab === 'finalizadas' ? 'active' : ''}>
            Finalizados
          </button>
        </div>
        {reservas.length > 0 ? (
          <div className="solicitacoes-container">
            {reservas.map((reserva) => (
              <div
                key={reserva.id}
                className="solicitacao"
                onClick={() => setSelectedReserva(reserva)}
              >
                <div className="solicitacao-header">
                  <span className="solicitacao-nome">{reserva.from_name}</span>
                  <span className="solicitacao-tipo">{reserva.user_type}</span>
                  <span className="solicitacao-horario">{reserva.horario}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Nenhuma solicitação encontrada.</p>
        )}
      </section>

      {selectedReserva && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <h3>Detalhes da Solicitação</h3>
            <p><strong>Nome:</strong> {selectedReserva.from_name}</p>
            <p><strong>Email:</strong> {selectedReserva.email}</p>
            <p><strong>WhatsApp:</strong> {selectedReserva.whatsapp}</p>
            <p><strong>Tipo de Usuário:</strong> {selectedReserva.user_type}</p>
            <p><strong>Detalhes do Projeto:</strong> {selectedReserva.project_details}</p>
            <p><strong>Público-Alvo:</strong> {selectedReserva.target_audience}</p>
            <p><strong>Número de Pessoas:</strong> {selectedReserva.number_of_people}</p>
            <p><strong>Horário:</strong> {selectedReserva.horario}</p>
            <p><strong>Estações:</strong> {selectedReserva.stations}</p>
            <p><strong>Status:</strong> {selectedReserva.status}</p>
            <p><strong>Criado em:</strong> {new Date(selectedReserva.created_at).toLocaleString()}</p>
            <p><strong>Atualizado em:</strong> {new Date(selectedReserva.updated_at).toLocaleString()}</p>
            {selectedReserva.status === 'pendente' && (
              <>
                <button className="aprovar" onClick={() => updateReservaStatus(selectedReserva.id, 'aprovado')}>Aprovar</button>
                <button className="recusar" onClick={() => updateReservaStatus(selectedReserva.id, 'recusado')}>Recusar</button>
              </>
            )}
          {selectedReserva.status === 'aprovado' && (
              <button className="finalizar" onClick={() => updateReservaStatus(selectedReserva.id, 'finalizado')}>Finalizar</button>
            )}
          {selectedReserva.status === 'recusado' && (
              <button className="apagar" onClick={() => deleteReserva(selectedReserva.id)}>Apagar</button>
          )}

          </div>
        </div>
      )}
    </main>
  );
};

export default PainelDeControle;
