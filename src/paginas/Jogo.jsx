import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../CSS/Jogo.css";

export default function Jogo() {
  const { id } = useParams();
  const [jogo, setJogo] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const APIKEY = "8d56f75105db4a71a30b3f8b7502102d";

  useEffect(() => {
    async function buscarJogo() {
      try {
        setCarregando(true);
        const [resJogo, resScreenshots] = await Promise.all([
          fetch(`https://api.rawg.io/api/games/${id}?key=${APIKEY}`),
          fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=${APIKEY}`),
        ]);
        const dadosJogo = await resJogo.json();
        const dadosScreenshots = await resScreenshots.json();
        setJogo(dadosJogo);
        setScreenshots(dadosScreenshots.results || []);
      } catch (error) {
        console.error("Erro ao buscar jogo:", error);
      } finally {
        setCarregando(false);
      }
    }
    buscarJogo();
  }, [id]);

  if (carregando) return <div className="jogo-carregando">Carregando jogo... 🎮</div>;
  if (!jogo) return <div className="jogo-carregando">Jogo não encontrado.</div>;

  return (
    <div className="jogo-page">
      <div className="jogo-header">
        {jogo.background_image && (
          <img
            src={jogo.background_image}
            alt={jogo.name}
            className="jogo-imagem"
          />
        )}
        <div className="jogo-info">
          <h1>{jogo.name}</h1>
        </div>
      </div>

      {jogo.description_raw && (
        <div className="jogo-descricao">
          <h2>Sobre o jogo</h2>
          <p>{jogo.description_raw}</p>
        </div>
      )}

      {screenshots.length > 0 && (
        <div className="jogo-screenshots">
          <h2>Screenshots</h2>
          <div className="screenshots-grid">
            {screenshots.map((s) => (
              <img key={s.id} src={s.image} alt="screenshot" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}