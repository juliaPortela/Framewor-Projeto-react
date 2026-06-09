import { useState, useEffect } from "react";
import { validarMenuUsuario } from "../services/Validacao.js";
import "../CSS/MenuUsuario.css";
import { useNavigate } from "react-router-dom";

export default function MenuUsuario() {
  const navegar = useNavigate();

  const usuarioSalvo = JSON.parse(localStorage.getItem("usuario")) || {};

  const [fotoPerfil, setFotoPerfil] = useState(usuarioSalvo.foto || "");
  const [nomeUsuario, setNomeUsuario] = useState(usuarioSalvo.nome || "");
  const [email, setEmail] = useState(usuarioSalvo.email || "");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navegar("/login");
      return;
    }

    // Valida token e carrega dados atualizados do backend
    fetch("http://localhost:3001/perfil", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (!r.ok) throw new Error("não autorizado");
        return r.json();
      })
      .then((usuario) => {
        localStorage.setItem("usuario", JSON.stringify(usuario));
        setFotoPerfil(usuario.foto || "");
        setNomeUsuario(usuario.nome || "");
        setEmail(usuario.email || "");
      })
      .catch(() => {
        localStorage.removeItem("token");
        navegar("/login");
      });
  }, [navegar]);

  // ✅ Lida com seleção de foto (converte para base64)
  function handleFotoChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPerfil(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  // ✅ Única função handleSubmit: valida, envia ao backend e atualiza localStorage
  function handleSubmit(e) {
    e.preventDefault();

    const erros = validarMenuUsuario({ email });
    if (Object.keys(erros).length > 0) {
      alert(erros.email);
      return;
    }

    const token = localStorage.getItem("token");

fetch("http://localhost:3001/perfil", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ nome: nomeUsuario, foto: fotoPerfil }),
  })
    .then((r) => {
      if (!r.ok) throw new Error(`Erro HTTP: ${r.status}`);
      return r.json();
    })
    .then((data) => {
      localStorage.setItem(
        "usuario",
        JSON.stringify({ nome: data.nome, foto: data.foto, email })
      );
      alert("Alterações salvas com sucesso!");
    })
    .catch((err) => alert("Erro ao salvar: " + err.message));
  }

  return (
    <div className="menuUsuario-page">
      <div className="menuUsuario-container">
        <h2>Meu Perfil</h2>

        <form onSubmit={handleSubmit} className="menuUsuario-form">
          <div className="fotoPerfil-section">
            <div className="fotoPerfil-preview">
              {fotoPerfil ? (
                <img src={fotoPerfil} alt="Perfil do usuário" />
              ) : (
                <div className="fotoPerfil-placeholder">👤</div>
              )}
            </div>

            <label htmlFor="inputFoto" className="btn-escolher-foto">
              Escolher foto
            </label>

            <input
              id="inputFoto"
              type="file"
              accept=".png, .jpeg, .jpg"
              name="fotoPerfil"
              onChange={handleFotoChange}
            />
          </div>

          <div className="InputForm">
            <label htmlFor="nomeUsuario">Nome de Usuário:</label>
            <input
              type="text"
              name="nomeUsuario"
              className="inputPadrao"
              placeholder="Digite seu nome"
              value={nomeUsuario}
              onChange={(e) => setNomeUsuario(e.target.value)}
            />
          </div>

          <div className="InputForm">
            <label htmlFor="emailUsuario">Email:</label>
            <input
              type="text"
              name="emailUsuario"
              className="inputPadrao"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="botoes-acao">
            <button
              type="button"
              className="btnSecundario"
              onClick={() => alert("Página de alterar senha em breve!")}
            >
              Alterar senha
            </button>

            <button type="submit" className="btnPrincipal">
              Salvar alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
