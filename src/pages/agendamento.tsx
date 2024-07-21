import React, { useState, useRef } from 'react';
import imagem1 from './styles/img1.png';
import './styles/App.css';
import { Footer } from '../components/components';

function MainSection() {
  return (
    <main className="principaltopo">
      <div className="headline">
        <h1 id="refifmaker1">
          <span id="refifmaker" style={{ color: 'rgb(242,180,0)' }}>Agendamento</span> - IFmaker
        </h1>
        <p>
          Olá Maker! Você pode realizar o agendamento para conhecer e usar o nosso IFMaker. Porém, é necessário seguir as regras do espaço, conforme nosso Regimento, 
          <strong>realizar o agendamento pela agenda e formulário na seção abaixo</strong> 
        </p>
      </div>
    </main>
  );
}

function Formulario() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [userType, setUserType] = useState<string>('');
  const [activityNature, setActivityNature] = useState<string>('');
  const [projectDetails, setProjectDetails] = useState<string>('');
  const [targetAudience, setTargetAudience] = useState<string>('');
  const [numberOfPeople, setNumberOfPeople] = useState<string>('');
  const [horas, setHoras] = useState<string>('');
  const [minutos, setMinutos] = useState<string>('');
  const [stations, setStations] = useState<string[]>([]);
  const [notification, setNotification] = useState<string>('');
  const minutosRef = useRef<HTMLInputElement>(null);

  function handleStationChange(e: React.ChangeEvent<HTMLInputElement>) {
    const station = e.target.value;
    if (e.target.checked) {
      setStations([...stations, station]);
    } else {
      setStations(stations.filter(item => item !== station));
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      name === '' ||
      email === '' ||
      whatsapp === '' ||
      userType === '' ||
      activityNature === '' ||
      projectDetails === '' ||
      targetAudience === '' ||
      numberOfPeople === '' ||
      horas === '' ||
      minutos === '' ||
      stations.length === 0
    ) {
      alert("Preencha todos os campos");
      return;
    }

    const horario = `${horas}:${minutos}`;

    const templateParams = {
      from_name: name,
      email: email,
      whatsapp: whatsapp,
      user_type: userType,
      activity_nature: activityNature,
      project_details: projectDetails,
      target_audience: targetAudience,
      number_of_people: numberOfPeople,
      horario: horario,
      stations: stations.join(', ')
    };
  }

  return (
    <section className='formsection'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Formulario de Agendamento</h1>
        <label htmlFor="name">Qual o seu nome completo?</label>
        <input id="name" className='forminput' type='text' onChange={(e) => setName(e.target.value)} value={name} required />

        <label htmlFor="email">Qual o seu e-mail?</label>
        <input id="email" className='forminput' type='email' onChange={(e) => setEmail(e.target.value)} value={email} required />

        <label htmlFor="whatsapp">Qual o número de WhatsApp?</label>
        <input id="whatsapp" className='forminput' type='text' onChange={(e) => setWhatsapp(e.target.value)} value={whatsapp} required />

        <label htmlFor="userType">Escolha a opção que você se enquadra:</label>
        <select id="userType" value={userType} onChange={(e) => setUserType(e.target.value)} required>
          <option value="">Selecione...</option>
          <option value="Servidor do IFPE - Professor">Servidor do IFPE - Professor</option>
          <option value="Servidor do IFPE - TAE">Servidor do IFPE - TAE</option>
          <option value="Aluno do IFPE">Aluno do IFPE</option>
          <option value="Comunidade Externa">Comunidade Externa</option>
        </select>

        <label htmlFor="activityNature">Sua atividade no IFMaker se enquadra em qual(is) natureza?</label>
        <select id="activityNature" value={activityNature} onChange={(e) => setActivityNature(e.target.value)} required>
          <option value="">Selecione...</option>
          <option value="Projeto de Ensino">Projeto de Ensino</option>
          <option value="Projeto de Pesquisa">Projeto de Pesquisa</option>
          <option value="Projeto de Extensão">Projeto de Extensão</option>
          <option value="Aula do Curso Integrado">Aula do Curso Integrado</option>
          <option value="Aula do Curso Subsequente">Aula do Curso Subsequente</option>
          <option value="Aula do Curso Superior">Aula do Curso Superior</option>
        </select>

        <label htmlFor="projectDetails">Detalhe mais sobre o objetivo do uso do IFMaker, informando o nome e o objetivo do projeto e/ou disciplina.</label>
        <textarea id="projectDetails" className='forminput' onChange={(e) => setProjectDetails(e.target.value)} value={projectDetails} required />

        <label htmlFor="targetAudience">Qual seu público alvo?</label>
        <input id="targetAudience" className='forminput' type='text' onChange={(e) => setTargetAudience(e.target.value)} value={targetAudience} required />

        <label htmlFor="numberOfPeople">A sua atividade envolve quantas pessoas?</label>
        <input id="numberOfPeople" className='forminput' type='text' onChange={(e) => setNumberOfPeople(e.target.value)} value={numberOfPeople} required />

        <label>Escolha o horário desejado:</label>
        <div className="horario-inputs">
          <input
            id="horas"
            className='horas-input'
            type='text'
            onChange={(e) => {
              setHoras(e.target.value);
              if (e.target.value.length === 2) {
                minutosRef.current?.focus();
              }
            }}
            value={horas}
            maxLength={2}
            required
          />
          <span>:</span>
          <input
            id="minutos"
            ref={minutosRef}
            className='minutos-input'
            type='text'
            onChange={(e) => setMinutos(e.target.value)}
            value={minutos}
            maxLength={2}
            required
          />
        </div>

        <label>Quais estações pretende utilizar?</label>
        <div>
          <input
            id="station1"
            type="checkbox"
            value="Estação Impressão 3D (impressoras 3D e multifuncional)"
            onChange={handleStationChange}
            checked={stations.includes("Estação Impressão 3D (impressoras 3D e multifuncional)")}
          />
          <label htmlFor="station1">Estação Impressão 3D (impressoras 3D e multifuncional)</label>
        </div>
        <div>
          <input
            id="station2"
            type="checkbox"
            value="Estação Marcenaria (cortadora e gravadora a laser)"
            onChange={handleStationChange}
            checked={stations.includes("Estação Marcenaria (cortadora e gravadora a laser)")}
          />
          <label htmlFor="station2">Estação Marcenaria (cortadora e gravadora a laser)</label>
        </div>
        <div>
          <input
            id="station3"
            type="checkbox"
            value="Estação Eletrônica"
            onChange={handleStationChange}
            checked={stations.includes("Estação Eletrônica")}
          />
          <label htmlFor="station3">Estação Eletrônica</label>
        </div>
        <div>
          <input
            id="station4"
            type="checkbox"
            value="Estação Papelaria e Arte (plotter)"
            onChange={handleStationChange}
            checked={stations.includes("Estação Papelaria e Arte (plotter)")}
          />
          <label htmlFor="station4">Estação Papelaria e Arte (plotter)</label>
        </div>
        <div>
          <input
            id="station5"
            type="checkbox"
            value="Estação Experimentos"
            onChange={handleStationChange}
            checked={stations.includes("Estação Experimentos")}
          />
          <label htmlFor="station5">Estação Experimentos</label>
        </div>
        <div>
          <input
            id="station6"
            type="checkbox"
            value="Estação Modelagem e Programação (computadores)"
            onChange={handleStationChange}
            checked={stations.includes("Estação Modelagem e Programação (computadores)")}
          />
          <label htmlFor="station6">Estação Modelagem e Programação (computadores)</label>
        </div>

        <button className='submit' type="submit">Enviar</button>
        {notification && <div className="notification">{notification}</div>}
      </form>
    </section>
  );
}

function App() {
  return (
    <div>
      <MainSection />
      <section className="modelsection section1">
        <div className="img-section1">
          <img src={imagem1} alt="detail" />
        </div>
        <div className="texto-section1">
          <h2>Atenção!</h2>
          <p>
            Gostaríamos de ressaltar que o agendamento feito aqui não confirma automaticamente sua reserva no laboratório. Seu pedido será encaminhado para a comissão responsável pelo IFMaker, que irá analisá-lo cuidadosamente.
            <br />
            <br />
            A confirmação final de seu agendamento será enviada para o endereço de e-mail fornecido no formulário de solicitação. Entendemos a importância de garantir que nossos recursos estejam disponíveis para todos os nossos usuários de forma justa e eficiente. Portanto, solicitamos sua paciência enquanto a comissão revisa sua solicitação. Agradecemos sua compreensão e colaboração neste processo. Se houver alguma dúvida ou preocupação, não hesite em entrar em contato conosco através do e-mail.
          </p>
        </div>
      </section>
      <Formulario />
      <Footer />
    </div>
  );
}

export default App;
