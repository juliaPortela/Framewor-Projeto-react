import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

  if (carregando) return <p>Carregando...</p>;
  if (!jogo) return <p>Jogo não encontrado.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{jogo.name}</h1>
      <img
        src={jogo.background_image}
        alt={jogo.name}
        style={{ width: "100%", maxWidth: "600px", borderRadius: "12px" }}
      />
      <p>{jogo.description_raw}</p>

      {screenshots.length > 0 && (
        <div>
          <h2>Screenshots</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            {screenshots.map((s) => (
              <img
                key={s.id}
                src={s.image}
                alt="screenshot"
                style={{ width: "300px", borderRadius: "8px" }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}