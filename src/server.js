import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
 
const app = express();
 
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
 
const usuarios = [];
 
const SEGREDO = "popplayjwt";
 
app.post("/cadastro", async (req, res) => {
  const { nome, email, senha } = req.body;
 
  const usuarioExiste = usuarios.find(
    (u) => u.email === email
  );
 
  if (usuarioExiste) {
    return res.status(400).json({
      erro: "Usuário já existe",
    });
  }
 
  const senhaHash = await bcrypt.hash(senha, 10);
 
  // ✅ foto começa vazia
  usuarios.push({
    nome,
    email,
    senha: senhaHash,
    foto: "",
  });
 
  res.json({ mensagem: "Usuário cadastrado" });
});
 
app.post("/login", async (req, res) => {
  const { email, senha } = req.body;
 
  const usuario = usuarios.find((u) => u.email === email);
 
  if (!usuario) {
    return res.status(401).json({ erro: "Usuário não encontrado" });
  }
 
  const senhaValida = await bcrypt.compare(senha, usuario.senha);
 
  if (!senhaValida) {
    return res.status(401).json({ erro: "Senha inválida" });
  }
 
  const token = jwt.sign(
    { email: usuario.email, nome: usuario.nome },
    SEGREDO,
    { expiresIn: "1h" }
  );
 
  res.json({ token, nome: usuario.nome });
});
 
function verificarToken(req, res, next) {
  const auth = req.headers.authorization;
 
  if (!auth) {
    return res.status(401).json({ erro: "Sem token" });
  }
 
  const token = auth.split(" ")[1];
 
  jwt.verify(token, SEGREDO, (erro, dados) => {
    if (erro) {
      return res.status(403).json({ erro: "Token inválido" });
    }
    req.usuario = dados;
    next();
  });
}
 
// GET /perfil — retorna dados do usuário autenticado
app.get("/perfil", verificarToken, (req, res) => {
  // retornar dados atuais do usuário (sem senha)
  const usuario = usuarios.find((u) => u.email === req.usuario.email);
  if (!usuario) {
    return res.status(404).json({ erro: "Usuário não encontrado" });
  }

  const { nome, email, foto } = usuario;
  res.json({ nome, email, foto });
});

// Atualizar perfil do usuário (nome, foto)
// Atualizar perfil do usuário (nome, foto) — implementado abaixo
 
// ✅ PUT /perfil — atualiza nome e/ou foto
app.put("/perfil", verificarToken, (req, res) => {
  const { nome, foto } = req.body;
  const usuario = usuarios.find((u) => u.email === req.usuario.email);
 
  if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado" });
 
  if (nome) usuario.nome = nome;
  if (foto !== undefined) usuario.foto = foto;
 
  res.json({ mensagem: "Perfil atualizado", nome: usuario.nome, foto: usuario.foto });
});
 
app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});