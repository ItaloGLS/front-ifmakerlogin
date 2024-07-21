import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getToken, logout } from '../auth';
import { Reserva } from '../interfaces/Reserva';

const PainelDeControle: React.FC = () => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'pendentes' | 'aprovados' | 'recusados' | 'finalizadas'>('pendentes');
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
      setReservas((prevReservas) =>
        prevReservas.map((reserva) => (reserva.id === id ? { ...reserva, status } : reserva))
      );
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
      setReservas((prevReservas) => prevReservas.filter((reserva) => reserva.id !== id));
    } catch (error) {
      console.error(`Erro ao apagar reserva ${id}`, error);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <main className="principaladm">
      <section className="admpanel">
        <h2>Solicitações de Agendamento</h2>
        <button onClick={handleLogout}>Logout</button>
        <div>
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
          reservas.map((reserva) => (
            <div key={reserva.id} className="solicitacoes">
              <div className="solicitante_id">
                <span>ID: {reserva.id}</span>
              </div>
              <div className="solicitante">
                <span>Nome: {reserva.from_name}</span>
              </div>
              <div className="solicitante_obs">
                <span>Observações: {reserva.activity_nature}</span>
              </div>
              <div className="solicitante_email">
                <span>Email: {reserva.email}</span>
              </div>
              <div className="solicitante_whatsapp">
                <span>WhatsApp: {reserva.whatsapp}</span>
              </div>
              <div className="solicitante_tipo">
                <span>Tipo de Usuário: {reserva.user_type}</span>
              </div>
              <div className="solicitante_detalhes">
                <span>Detalhes do Projeto: {reserva.project_details}</span>
              </div>
              <div className="solicitante_alvo">
                <span>Público-Alvo: {reserva.target_audience}</span>
              </div>
              <div className="solicitante_pessoas">
                <span>Número de Pessoas: {reserva.number_of_people}</span>
              </div>
              <div className="solicitante_horario">
                <span>Horário: {reserva.horario}</span>
              </div>
              <div className="solicitante_estacoes">
                <span>Estações: {reserva.stations}</span>
              </div>
              <div className="solicitante_status">
                <span>Status: {reserva.status}</span>
              </div>
              <div className="solicitante_criacao">
                <span>Criado em: {new Date(reserva.created_at).toLocaleString()}</span>
              </div>
              <div className="solicitante_atualizacao">
                <span>Atualizado em: {new Date(reserva.updated_at).toLocaleString()}</span>
              </div>
              {reserva.status === 'pendente' && (
                <>
                  <button onClick={() => updateReservaStatus(reserva.id, 'aprovado')}>Aprovar</button>
                  <button onClick={() => updateReservaStatus(reserva.id, 'recusado')}>Recusar</button>
                </>
              )}
              {reserva.status === 'aprovado' && (
                <button onClick={() => updateReservaStatus(reserva.id, 'finalizado')}>Finalizar</button>
              )}
              {reserva.status === 'recusado' && (
                <button onClick={() => deleteReserva(reserva.id)}>Apagar</button>
              )}
            </div>
          ))
        ) : (
          <p>Nenhuma solicitação encontrada.</p>
        )}
      </section>
    </main>
  );
};

export default PainelDeControle;
