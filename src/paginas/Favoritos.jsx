import { useEffect, useState } from "react";
import CardJogo from "../componentes/CardJogo";

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const salvo = JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavoritos(salvo);
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Meus Favoritos</h1>
      {favoritos.length === 0 ? (
        <p>Nenhum jogo favoritado até agora.</p>
      ) : (
        <div className="gridJogos">
          {favoritos.map((jogo) => (
            <CardJogo key={jogo.id} jogo={jogo} />
          ))}
        </div>
      )}
    </div>
  );
}