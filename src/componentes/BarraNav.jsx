import { Link, useNavigate } from "react-router-dom";

// Import componentes e imgs //
import BarraPesquisa from "./BarraPesquisa";
import popplayLogo from "../imgs/logo popplay.png";
// ------------------------ //

// CSS //
import "../CSS/BarraNav.css";
// -- //

export default function BarraNav() {
  const navegar = useNavigate();

  const logado = !!localStorage.getItem("token") || localStorage.getItem("logado") === "true";
  const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));


  // Logout //
  function handleSair() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.setItem("logado", "false");
    navegar("/login");
  }
  // ----- //

  return (
    <nav className="barraNav">
      {/* Logo */}
      <div className="logoSite">
        <Link to="/" className="linkNav">
          <img src={popplayLogo} alt="PopPlay" className="logoImg" />
        </Link>
      </div>

      {/* Home */}
      <div className="linkHome">
        <Link to="/" className="linkNav">
          Home
        </Link>
      </div>

      {/* Barra Pesquisa */}
      <BarraPesquisa />

      {/* Favoritos */}
      <div className="linkFavs">
        <Link to="/favoritos" className="linkNav">
          Favoritos
        </Link>
      </div>

      {/* Usuário */}
      <div className="usuarioNav">
        {logado ? (
          <div className="navUsuario">
            <span className="navSaudacao">Olá, {usuarioSalvo?.nome}</span>
            <Link to="/menuUsuario" className="linkNav">Meu Perfil</Link>
            <button onClick={handleSair} className="btnSair">Sair</button>
          </div>
        ) : (
          <Link to="/login" className="linkNav">Entrar</Link>
        )}
      </div>
    </nav>
  );
}