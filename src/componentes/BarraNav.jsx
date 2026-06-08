import { Link, useNavigate } from "react-router-dom";
import "../CSS/BarraNav.css";
import BarraPesquisa from "./BarraPesquisa";
import popplayLogo from "../imgs/logo popplay.png";

export default function BarraNav() {
  let logado = true; //provisório-> simulação de login ou não

  //Link é utiizado para conectar as paginas dos sites
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
        <Link to={logado ? "/menuUsuario" : "/cadastro"} className="linkNav">
          <div className="PerfilImg"></div>
        </Link>
      </div>
    </nav>
  );
}
