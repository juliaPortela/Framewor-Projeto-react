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
    // chamada ao backend para autenticação via JWT
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: campos.email, senha: campos.senha }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.erro) {
          setErro(data.erro);
          return;
        }

        // salvar token e usuário localmente
        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", JSON.stringify({ nome: data.nome, email: campos.email }));
        localStorage.setItem("logado", "true");

        navegar("/");
      })
      .catch(() => setErro("Erro ao conectar com o servidor."));
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

          <p style={{ textAlign: "center", marginTop: "1rem" }}>
            Não tem conta?{" "}
            <a href="/cadastro" style={{ color: "#e91e8c", fontWeight: "bold" }}>
              Cadastre-se
            </a>
          </p>
        </form>
        </div>
    </div>
  );
}