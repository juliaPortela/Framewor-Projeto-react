import "./App.css";
import Home from "./paginas/Home";
import { Routes, Route } from "react-router-dom";
import Favoritos from "./paginas/Favoritos";
import BarraNav from "./componentes/BarraNav";
import MenuUsuario from "./paginas/MenuUsuario";
import RodaPe from "./componentes/RodaPe";
import Jogo from "./paginas/Jogo";
import Cadastro from "./paginas/Cadastro";
import Login from "./paginas/Login";

function App() {
  return (
    <div className="divPrincipal">
      <BarraNav />
      <main className="conteudoMain">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/menuUsuario" element={<MenuUsuario />} />
          <Route path="/jogo/:id" element={<Jogo />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <RodaPe />
    </div>
  );
}

export default App;
