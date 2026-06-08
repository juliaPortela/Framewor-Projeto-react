import { Link, useNavigate } from "react-router-dom";
import "../CSS/BarraNav.css";
import BarraPesquisa from "./BarraPesquisa";
import popplayLogo from "../imgs/logo popplay.png";

export default function BarraNav() {
  const navegar = useNavigate();
  const logado = localStorage.getItem("logado") === "true";

  function handleSair() {
    localStorage.removeItem("logado");
    navegar("/login");
  }

  return (
    <nav className="barraNav">
      <div className="logoSite">
        <Link to="/" className="linkNav">
          <img src={popplayLogo} alt="PopPlay" className="logoImg" />
        </Link>
      </div>
      <div className="linkHome">
        <Link to="/" className="linkNav">
          Home
        </Link>
      </div>
      <BarraPesquisa />
      <div className="linkFavs">
        <Link to="/favoritos" className="linkNav">
          Favoritos
        </Link>
      </div>
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
    </nav>
  );
}