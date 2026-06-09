import { useState, useEffect } from "react";
import { validarMenuUsuario } from "../services/Validacao.js";
import "../CSS/MenuUsuario.css";
import { useNavigate } from "react-router-dom";

export default function MenuUsuario() {
  const navegar = useNavigate();

  useEffect(() => {
    const logado = localStorage.getItem("logado");

    if (logado !== "true") {
      navegar("/login");
    }
  }, [navegar]);

  const usuarioSalvo =
    JSON.parse(localStorage.getItem("usuario")) || {};

  const [fotoPerfil, setFotoPerfil] = useState(
    usuarioSalvo.foto || ""
  );

  const [nomeUsuario, setNomeUsuario] = useState(
    usuarioSalvo.nome || ""
  );

  const [email, setEmail] = useState(
    usuarioSalvo.email || ""
  );

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

  function handleSubmit(e) {
    e.preventDefault();

    const erros = validarMenuUsuario({ email });

    if (Object.keys(erros).length > 0) {
      alert(erros.email);
      return;
    }

    const usuarioAtualizado = {
      ...usuarioSalvo,
      nome: nomeUsuario,
      email: email,
      foto: fotoPerfil,
    };

    localStorage.setItem(
      "usuario",
      JSON.stringify(usuarioAtualizado)
    );

    alert("Alterações salvas com sucesso!");
  }

  return (
    <div className="menuUsuario-page">
      <div className="menuUsuario-container">
        <h2>Meu Perfil</h2>

        <form
          onSubmit={handleSubmit}
          className="menuUsuario-form"
        >
          <div className="fotoPerfil-section">
            <div className="fotoPerfil-preview">
              {fotoPerfil ? (
                <img
                  src={fotoPerfil}
                  alt="Perfil do usuário"
                />
              ) : (
                <div className="fotoPerfil-placeholder">
                  👤
                </div>
              )}
            </div>

            <label
              htmlFor="inputFoto"
              className="btn-escolher-foto"
            >
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
            <label htmlFor="nomeUsuario">
              Nome de Usuário:
            </label>

            <input
              type="text"
              name="nomeUsuario"
              className="inputPadrao"
              placeholder="Digite seu nome"
              value={nomeUsuario}
              onChange={(e) =>
                setNomeUsuario(e.target.value)
              }
            />
          </div>

          <div className="InputForm">
            <label htmlFor="emailUsuario">
              Email:
            </label>

            <input
              type="text"
              name="emailUsuario"
              className="inputPadrao"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <div className="botoes-acao">
            <button
              type="button"
              className="btnSecundario"
              onClick={() =>
                alert(
                  "Página de alterar senha em breve!"
                )
              }
            >
              Alterar senha
            </button>

            <button
              type="submit"
              className="btnPrincipal"
            >
              Salvar alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}