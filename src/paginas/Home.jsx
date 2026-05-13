import CardJogo from "../componentes/CardJogo";
import { useState } from "react";
import "../CSS/Home.css";

function Home() {
  const jogos = [
    { id: 1, nome: "Geometric Trash" },
    { id: 2, nome: "      Roblox     " },
    { id: 3, nome: "Fireboy & Watergirl" },
  ];
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJogos = jogos.filter((jogo) =>
    jogo.nome.toLowerCase().includes(searchQuery.toLowerCase().trim()),
  );

  function funcionamentoPesquisa(e) {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchQuery(searchQuery);
  }

  return (
    <div className="home">
      <section className="hero">
        <div className="hero__content">
          <span className="hero__tag">💖 Cantinho dos games indies</span>
          <h1>Descubra jogos divertidos!</h1>
          <p>
            Encontre inspiração gamer, explore os títulos e deixe a sua tarde
            mais divertida.
          </p>
        </div>
        <div className="hero__sparkles">
          <span>✨</span>
          <span>🌸</span>
          <span>💗</span>
        </div>
      </section>

      <section className="searchSection">
        <form onSubmit={funcionamentoPesquisa} className="barraPesquisa">
          <input
            type="text"
            placeholder="Pesquise jogos pelos seus nomes"
            className="barraInput"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="btnPesquisa">
            ⌕
          </button>
        </form>
      </section>

      <div className="gridJogos">
        {filteredJogos.length > 0 ? (
          filteredJogos.map((jogo) => <CardJogo jogo={jogo} key={jogo.id} />)
        ) : (
          <div className="emptyState">
            Nenhum jogo encontrado. Tente outro nome para encontrar algo mais
            fofo.
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
