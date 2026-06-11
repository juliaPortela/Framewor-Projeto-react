import { useState } from "react";
import { validarFormulario } from "../services/Validacao.js"; // Importando a validação
import "../CSS/Cadastro.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function Cadastro() {
  // Gerenciamento de estados //
  const [campos, setCampos] = useState({
    nome: "",
    email: "",
    senha: "",
    confirma: "",
  });
  const [erros, setErros] = useState({});
  const [modalAberto, setModalAberto] = useState(false);
  const [tipo, setTipo] = useState("info");
  const [mensagem, setMensagem] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setCampos((prev) => ({ ...prev, [name]: value }));
  }

  function mostrarModal(msg, tipoMsg = "info") {
    setMensagem(msg);
    setTipo(tipoMsg);
    setModalAberto(true);

    setTimeout(() => {
      setModalAberto(false);
    }, 3000);
  }
  // ----------------------------------------- //
  // Lidar com o envio do formulário //
  function handleSubmit(e) {
    e.preventDefault();

    const errosValidacao = validarFormulario(campos);
    setErros(errosValidacao);

    if (Object.keys(errosValidacao).length > 0) return;

    const novoUsuario = {
      nome: campos.nome,
      email: campos.email,
      senha: campos.senha,
    };

    // enviar para o backend
    fetch("http://localhost:3001/cadastro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoUsuario),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.erro) {
          mostrarModal(data.erro, "error");
          return;
        }

        mostrarModal("Cadastro realizado com sucesso! Faça login.", "success");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      })
      .catch(() => mostrarModal("Erro ao cadastrar usuário.", "error"));
  }
  // ----------------------------------------- //
  const estiloModal = {
    content: {},
  };
  const icones = {
    success: "✅",
    error: "❌",
  };

  return (
    <div className="Cadastro-page">
      <Modal
        isOpen={modalAberto}
        onRequestClose={() => setModalAberto(false)}
        closeTimeoutMS={300}
        className={`modal ${tipo === "success" ? "modal-success" : "modal-error"}`}
        overlayClassName="modal-overlay"
      >
        <div className="modal-conteudo">
          <span className="modal-icone">{icones[tipo]}</span>
          <p className="modal-texto">{mensagem}</p>
        </div>
      </Modal>
      
      <div className="Cadastro-container">
        <h2>Cadastro</h2>
        <form onSubmit={handleSubmit} className="Cadastro-form">
          {/* Nome usuário */}
          <div className="InputForm" id="NomeUsuário">
            <label htmlFor="nome">Nome de Usuário: </label>
            <input
              type="text"
              name="nome"
              placeholder="Digites seu nome de usuário"
              className="inputPadrao"
              value={campos.nome} //lida com o valor do campo
              onChange={handleChange}
            ></input>
            <p className="erro" id="erroNomeUsuario">
              {erros.nome}
            </p>
          </div>

          {/* Email Usuário */}
          <div className="InputForm">
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              name="email"
              placeholder="Digites seu email"
              className="inputPadrao"
              value={campos.email}
              onChange={handleChange}
            ></input>
            <p className="erro" id="erroEmail">
              {erros.email}
            </p>
          </div>

          {/* Senha Usuário */}
          <div className="InputForm">
            <label htmlFor="senha">Senha: </label>
            <input
              type="text"
              name="senha"
              placeholder="Digites sua senha"
              className="inputPadrao"
              value={campos.senha}
              onChange={handleChange}
            ></input>
            <p className="erro" id="erroSenha">
              {erros.senha}
            </p>
          </div>

          {/* Confirmação Senha usuário */}
          <div className="InputForm">
            <label htmlFor="confirma">Confirme a Senha: </label>
            <input
              type="text"
              name="confirma"
              placeholder="Confirme sua senha"
              className="inputPadrao"
              value={campos.confirma}
              onChange={handleChange}
            ></input>
            <p className="erro" id="erroSenhaConfirmacao">
              {erros.confirma}
            </p>
          </div>

          <input
            className="btnPrincipal"
            type="submit"
            value="Cadastrar-se"
          ></input>
        </form>
      </div>
    </div>
  );
}
