const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

const fornecedores = [];
const produtos = [];
const associacoes = [];

// --- ROTAS PARA FORNECEDORES ---
app.post('/fornecedores', (req, res) => {
    const novoFornecedor = req.body;
    
    const duplicado = fornecedores.some(f => f.cnpj === novoFornecedor.cnpj || f.nome === novoFornecedor.nome);
    if (duplicado) {
        return res.status(400).json({ erro: 'Já existe um fornecedor cadastrado com este Nome ou CNPJ.' });
    }

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
    
    const duplicado = produtos.some(p => p.codigoDeBarras === novoProduto.codigoDeBarras || p.nomeProduto === novoProduto.nomeProduto);
    if (duplicado) {
        return res.status(400).json({ erro: 'Já existe um produto cadastrado com este Nome ou Código de Barras.' });
    }

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
    
    const duplicado = associacoes.some(a => 
        a.fornecedorCadastrado === novaAssociacao.fornecedorCadastrado && 
        a.produtoCadastrado === novaAssociacao.produtoCadastrado
    );
    if (duplicado) {
        return res.status(400).json({ erro: 'Esta associação entre o fornecedor e o produto já foi efetuada.' });
    }

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