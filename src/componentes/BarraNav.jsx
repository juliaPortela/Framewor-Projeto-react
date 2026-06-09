import { Link, useNavigate } from "react-router-dom";

// Import compenentes e imgs //
import BarraPesquisa from "./BarraPesquisa";
import popplayLogo from "../imgs/logo popplay.png";
// ------------------------ //

// CSS //
import "../CSS/BarraNav.css";
// -- //

export default function BarraNav() {
  const navegar = useNavigate();
  const logado = localStorage.getItem("logado") === "true";

  // Logout //
  function handleSair() {
    localStorage.removeItem("logado");
    navegar("/login");
  }
  // ----- //

  return (
    <nav className="barraNav">
      {/* logo */}
      <div className="logoSite">
        <Link to="/" className="linkNav">
          <img src={popplayLogo} alt="PopPlay" className="logoImg" />
        </Link>
      </div>
      {/* --------------- */}

      {/* Home */}
      <div className="linkHome">
        <Link to="/" className="linkNav">
          Home
        </Link>
      </div>
      {/* --------------- */}

      {/* barra pesquisa */}
      <BarraPesquisa />
      {/* --------------- */}

      {/* Favoritos */}
      <div className="linkFavs">
        <Link to="/favoritos" className="linkNav">
          Favoritos
        </Link>
      </div>
      {/* --------------- */}

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
    </nav>
  );
}
