import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Cadastro.css"; // pode reaproveitar o CSS do cadastro por enquanto

export default function Login() {
  const [campos, setCampos] = useState({ email: "", senha: "" });
  const [erro, setErro] = useState("");
  const navegar = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setCampos((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));

    if (!usuarioSalvo) {
      setErro("Nenhum usuário cadastrado.");
      return;
    }

    if (
      campos.email !== usuarioSalvo.email ||
      campos.senha !== usuarioSalvo.senha
    ) {
      setErro("Email ou senha incorretos.");
      return;
    }

    localStorage.setItem("logado", "true");
    navegar("/");
  }

  return (
    <div className="Cadastro-page">
      <div className="Cadastro-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="Cadastro-form">
          <div className="InputForm">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              placeholder="Digite seu email"
              className="inputPadrao"
              value={campos.email}
              onChange={handleChange}
            />
            </div>
          <div className="InputForm">
            <label htmlFor="senha">Senha:</label>
            <input
              type="password"
              name="senha"
              placeholder="Digite sua senha"
              className="inputPadrao"
              value={campos.senha}
              onChange={handleChange}
            />
          </div>
          {erro && <p className="erro">{erro}</p>}
          <input className="btnPrincipal" type="submit" value="Entrar" />
        </form>
        </div>
    </div>
  );
}