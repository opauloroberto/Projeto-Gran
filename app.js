const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8080;

// Middlewares
app.use(cors()); // Permite requisições vindas do React (localhost:3000)
app.use(express.json()); // Permite ao Express entender pacotes em formato JSON

// "Bancos de dados" temporários em memória
const fornecedores = [];
const produtos = [];
const associacoes = [];

// --- ROTAS PARA FORNECEDORES ---
app.post('/fornecedores', (req, res) => {
    const novoFornecedor = req.body;
    fornecedores.push(novoFornecedor);
    console.log('✅ Novo Fornecedor Recebido:', novoFornecedor);
    res.status(201).json({ mensagem: 'Fornecedor cadastrado com sucesso!', dados: novoFornecedor });
});

app.get('/fornecedores', (req, res) => {
    res.json(fornecedores);
});

// --- ROTAS PARA PRODUTOS ---
app.post('/produtos', (req, res) => {
    const novoProduto = req.body;
    produtos.push(novoProduto);
    console.log('✅ Novo Produto Recebido:', novoProduto);
    res.status(201).json({ mensagem: 'Produto cadastrado com sucesso!', dados: novoProduto });
});

app.get('/produtos', (req, res) => {
    res.json(produtos);
});

// --- ROTAS PARA ASSOCIAÇÕES ---
app.post('/associacoes', (req, res) => {
    const novaAssociacao = req.body;
    associacoes.push(novaAssociacao);
    console.log('✅ Nova Associação Recebida:', novaAssociacao);
    res.status(201).json({ mensagem: 'Associação cadastrada com sucesso!', dados: novaAssociacao });
});

app.get('/associacoes', (req, res) => {
    res.json(associacoes);
});

// Arrancar o servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor backend a rodar com sucesso em http://localhost:${PORT}`);
});