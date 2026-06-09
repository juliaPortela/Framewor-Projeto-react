import "../CSS/CardJogo.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function CardJogo({ jogo }) {
  const navegar = useNavigate();

  function favoritar(e) {
    e.stopPropagation(); // impede de navegar para a página do jogo ao clicar
    const usuario = JSON.parse(localStorage.getItem("usuario")) || {};
    const chave = usuario.email ? `favoritos_${usuario.email}` : "favoritos";

    const favoritosSalvos = JSON.parse(localStorage.getItem(chave)) || [];

    const jaFavoritado = favoritosSalvos.some((f) => f.id === jogo.id);

    if (jaFavoritado) {
      const novosLista = favoritosSalvos.filter((f) => f.id !== jogo.id);
      localStorage.setItem(chave, JSON.stringify(novosLista));
      alert("Removido dos favoritos!");
    } else {
      favoritosSalvos.push({
        id: jogo.id,
        name: jogo.name,
        background_image: jogo.background_image,
      });
      localStorage.setItem(chave, JSON.stringify(favoritosSalvos));
      alert("Favoritado!");
    }
  }

  return (
    <div className="cardJogo">
      <div className="cardOverlay">
        <button className="btnFavoritar" onClick={favoritar}>
          ☆
        </button>
      </div>
      <Link className="BtnCardJogo" to={`/jogo/${jogo.id}`}>
        <div className="cardJogo__imagem">
          {jogo.background_image ? (
            <img src={jogo.background_image} alt={jogo.name} /> //pega da API a ft do jogo e o nome
          ) : (
            <div className="cardJogo__placeholder">🎀</div>
          )}
        </div>
        <div className="tituloJogo">
          <h2>{jogo.name}</h2>
        </div>
      </Link>
    </div>
  );
}

export default CardJogo;
