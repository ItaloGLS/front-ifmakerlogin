import React, { useEffect } from 'react';
import { setupNavbarScroll } from '../anim/anim';
import logoImage from './styles/logo.jpeg';
import imagem1 from './styles/img1.png';
import './styles/App.css';
import { Navbar, Footer, ProjectCard } from '../components/components';

function MainSection() {
  return (
    <main className="principaltopo">
      <div className="headline">
        <h1 id="refifmaker1">
          <span id="refifmaker" style={{ color: 'rgb(242,180,0)' }}>IFmaker</span> - Seu Espaço de Criação
        </h1>
        <p>
          Bem-vindo ao <strong>IF Maker - Campus Palmares</strong>, onde a imaginação ganha vida por meio da tecnologia e da colaboração.
        </p>
      </div>
      <div className="headlinebtns">
        <a href="" className="headlinebtn">Conheça Nossos Equipamentos</a>
        <a href="" className="headlinebtn">Participe de Uma Oficina</a>
      </div>
    </main>
  );
}

function App() {
  useEffect(() => {
    setupNavbarScroll();
  }, []);

  return (
    <div>
      <Navbar />
      <MainSection />
      <section className="modelsection section1">
        <div className="img-section1">
          <img src={imagem1} alt="detail" />
        </div>

        <div className="texto-section1">
          <h2>O que é o IFMaker Palmares?</h2>
          <p>
            O IFMaker Palmares é um makerspace ou laboratório maker dedicado a inspirar e capacitar a próxima geração de pesquisadores, inventores e empreendedores.
            Oferecemos um ambiente dinâmico e equipado com tecnologia de ponta para transformar suas ideias mais criativas em projetos tangíveis.
            Nosso espaço inclui áreas de prototipagem, eletrônica, impressoras 3D, ferramentas de fabricação digital, marcenaria, programação e muito mais.
          </p>
        </div>
      </section>

      <section className="modelsection section2">
        <ProjectCard title="Prototipagem Rápida" description="Transforme suas ideias em protótipos funcionais em pouco tempo rápida." />
        <ProjectCard title="Experimentação Eletrônica" description="Explore o mundo da eletrônica através da nossa estação equipada com ferramentas e componentes eletrônicos." />
        <ProjectCard title="Inovação Social" description="Desenvolva soluções inovadoras que promovam o impacto positivo em nossa sociedade." />
        <ProjectCard title="Desenvolvimento de Projetos de Ensino, Pesquisa e Extensão" description="Alunos do campus têm a oportunidade de desenvolver projetos acadêmicos inovadores, integrando conhecimentos teóricos com práticas." />
        <ProjectCard title="Colaboração Criativa" description="Conecte-se com outros membros da comunidade, compartilhe conhecimentos e trabalhe em projetos colaborativos que desafiem e inspirem." />
      </section>
      <Footer />
    </div>
  );
}

export default App;
