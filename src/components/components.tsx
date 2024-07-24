import * as React from 'react';
import logoImage from '../pages/styles/logo.jpeg';
import instalogo from '../pages/styles/instagram_white_28dp.png';
import logourl from '../pages/styles/link_white_28dp.png';

interface ProjectCardProps {
  title: string;
  description: string;
}

export function Footer() {
  return (
    <footer>
      <div className="footerleft">
        <p>
          Endereço: Av. José Pretestato de Santana - Palmares, PE, 55540-000.
          IFPE Campus Palmares. Laboratório IFMaker
        </p>
        <a id="logorodape" href="/"><img src={logoImage} alt="Logo" /></a>
        <div className="imgroda">
          <a href="/"><img src={instalogo} alt="Instagram Logo" /></a>
          <a href="/"><img src={logourl} alt="Link Logo" /></a>
        </div>
      </div>

      <div className="footerright">
        <p>Para solicitações e dúvidas, entre em contato:</p>
        <span><strong>ifmaker@palmares.ifpe.edu.br</strong></span>
        <div className='footerlinks'>
          <a href='/'>Inicio</a>
          <a href='/agendamento'>Agendamento</a>
          <a href='/equipe'>Equipe</a>
          <a href='/estacoes'>Estações</a>
          <a href='/atendimento'>Atendimento</a>
        </div>
      </div>
    </footer>
  );
}

export function ProjectCard({ title, description }: ProjectCardProps) {
  return (
    <article className="card">
      <div className="card-img item1">
        <div className="card-imgs pv delete"></div>
      </div>

      <div className="project-info">
        <div className="flex">
          <div className="project-title">{title}</div>
        </div>
        <span className="lighter">{description}</span>
      </div>
    </article>
  );
}

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <a href="/"><img src={logoImage} alt="Logo" /></a>
      </div>
      <div className="links">
        <a className="navlink" href="/">Início</a>
        <a className="navlink" href="/agendamento">Agendamento</a>
        <a className="navlink" href="/equipe">Equipe</a>
        <a className="navlink" id="nav  ref1" href="/">Estações</a>
        <a id="navref2" href="/">Atendimento</a>
        <a id="navref2"  href="/paineldecontrole">Painel de Controle</a>
      </div>
    </nav>
  );
}