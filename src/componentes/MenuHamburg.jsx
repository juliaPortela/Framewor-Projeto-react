import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// Import compenentes e imgs //
import BarraPesquisa from "./BarraPesquisa";
import popplayLogo from "../imgs/logo popplay.png";
// ------------------------ //

// CSS //
import "../CSS/Menuhamburg.css";
// -- //

// importaões para as barras do menu //
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);
// -------------------------------- //

export default function MenuHamburg() {
  const [aberto, setAberto] = useState(false);
  const navegar = useNavigate();
  const logado = localStorage.getItem("logado") === "true";

  function mostrarBarra() {
    setAberto(!aberto);
  }

  // Logout //
  function handleSair() {
    localStorage.removeItem("logado");
    navegar("/login");
  }
  // ----- //

  return (
    <div id="menuHamburg">
      <div className="topo">
        {/* btn do menu */}
        <button
          className="menuHamburgBars"
          id="menuHamburgBars"
          onClick={mostrarBarra}
        >
          <FontAwesomeIcon icon="fa-solid fa-bars" />
        </button>
        {/* ------------------ */}

        <div
          className={`overlay ${aberto ? "ativo" : ""}`}
          onClick={() => setAberto(false)}
        ></div>

        {/* logo */}
        <div className="logoSite">
          <Link to="/" className="linkNav">
            <img src={popplayLogo} alt="PopPlay" className="logoImg" />
          </Link>
        </div>
        {/* --------------- */}
      </div>

      {/* Menu lateral */}
      <div className={`navBarHamburg ${aberto ? "ativo" : ""}`}>
        {/* Usuário */}
        <div>
          {logado ? (
            <>
              <Link to="/menuUsuario" className="linkNav">
                Meu Perfil
              </Link>
              <button onClick={handleSair} className="linkNav">
                Sair
              </button>
            </>
          ) : (
            <Link to="/login" className="linkNav">
              Entrar
            </Link>
          )}
        </div>
        {/* --------------- */}

        {/* barra pesquisa */}
        <BarraPesquisa />
        {/* --------------- */}

        {/* Home */}
        <div className="linkHome">
          <Link to="/" className="linkNav">
            Home
          </Link>
        </div>
        {/* --------------- */}

        {/* Favoritos */}
        <div className="linkFavs">
          <Link to="/favoritos" className="linkNav">
            Favoritos
          </Link>
        </div>
        {/* --------------- */}
      </div>
      {/* ------------------ */}
    </div>
  );
}
