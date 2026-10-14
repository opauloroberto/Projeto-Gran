import React, { useState } from 'react';

function Produtos({ onCadastroSucesso }) { // <-- Recebe a função aqui
    const [nomeProduto, setNomeProduto] = useState('');
    const [quantidadeEmEstoque, setQuantidadeEmEstoque] = useState('');
    const [descricao, setDescricao] = useState('');
    const [codigoDeBarras, setCodigoDeBarras] = useState('');
    const [categoria, setCategoria] = useState('');
    const [dataDeValidade, setDataDeValidade] = useState('');
    const [imagem, setImagem] = useState('');
    const [outros, setOutros] = useState('');

    const salvarProduto = (evento) => {
        evento.preventDefault();

        const novoProduto = { nomeProduto, quantidadeEmEstoque, descricao, codigoDeBarras, categoria, dataDeValidade, imagem, outros };

        fetch('http://localhost:8080/produtos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoProduto),
        })
        .then(async (resposta) => {
            const dados = await resposta.json();
            if (!resposta.ok) {
                throw new Error(dados.erro || 'Erro ao cadastrar produto.');
            }
            alert('Produto cadastrado com sucesso!');
            
            setNomeProduto(''); setQuantidadeEmEstoque(''); setDescricao(''); setCodigoDeBarras(''); setCategoria(''); setDataDeValidade(''); setImagem(''); setOutros('');
            
            // Dispara o gatilho para avisar a Associação!
            if (onCadastroSucesso) onCadastroSucesso();
        })
        .catch((erro) => {
            alert(erro.message);
        });
    };

    return (
        <div>
            <h2>Cadastro de Produto</h2>
            <form onSubmit={salvarProduto}>
                <input type="text" placeholder="Nome do Produto" value={nomeProduto} onChange={(e) => setNomeProduto(e.target.value)} required />
                <input type="number" placeholder="Quantidade em Estoque" value={quantidadeEmEstoque} onChange={(e) => setQuantidadeEmEstoque(e.target.value)} required />
                <input type="text" placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
                <input type="text" placeholder="Código de Barras" value={codigoDeBarras} onChange={(e) => setCodigoDeBarras(e.target.value)} required />
                <input type="text" placeholder="Categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} required />
                <input type="date" placeholder="Data de Validade" value={dataDeValidade} onChange={(e) => setDataDeValidade(e.target.value)} required />
                <input type="text" placeholder="Imagem" value={imagem} onChange={(e) => setImagem(e.target.value)} />
                <input type="text" placeholder="Outros" value={outros} onChange={(e) => setOutros(e.target.value)} />
                <button type="submit">Cadastrar Produto</button>
            </form>
        </div>
    );
}

export default Produtos;