import "../CSS/CardJogo.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { buscarGif } from "../services/ChamadaAPI";

function CardJogo({ jogo }) {
  const navegar = useNavigate();
  const [modalAberto, setModalAberto] = useState(false);
  const [tipo, setTipo] = useState("info");
  const [mensagem, setMensagem] = useState("");
  const [gif, setGif] = useState(null);

  function mostrarModal(msg, tipoMsg = "info", gifUrl = null) {
    setMensagem(msg);
    setTipo(tipoMsg);
    setGif(gifUrl);
    setModalAberto(true);

    setTimeout(() => {
      setModalAberto(false);
    }, 3000);
  }

  async function favoritar(e) {
    e.stopPropagation();

    const usuario = JSON.parse(localStorage.getItem("usuario")) || {};
    const chave = usuario.email ? `favoritos_${usuario.email}` : "favoritos";

    const favoritosSalvos = JSON.parse(localStorage.getItem(chave)) || [];

    const jaFavoritado = favoritosSalvos.some((f) => f.id === jogo.id);

    let tipoMsg;

    if (jaFavoritado) {
      const novosLista = favoritosSalvos.filter((f) => f.id !== jogo.id);
      localStorage.setItem(chave, JSON.stringify(novosLista));

      tipoMsg = "error";
    } else {
      favoritosSalvos.push({
        id: jogo.id,
        name: jogo.name,
        background_image: jogo.background_image,
      });

      localStorage.setItem(chave, JSON.stringify(favoritosSalvos));

      tipoMsg = "success";
    }

    const gif = await buscarGif(tipoMsg);

    mostrarModal(
      tipoMsg === "success" ? "Favoritado!" : "Removido dos favoritos!",
      tipoMsg,
      gif,
    );
  }

  return (
    <div className="cardJogo">
      <Modal
        isOpen={modalAberto}
        onRequestClose={() => setModalAberto(false)}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-conteudo">
          <span className="modal-icone">
            {tipo === "success" ? "✅" : "❌"}
          </span>
          <p className="modal-texto">{mensagem}</p>
          {gif && <img src={gif} alt="gif" className="modal-gif" />}
        </div>
      </Modal>
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
