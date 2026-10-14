import React, { useState, useEffect } from 'react';

function Associacao() {
    const [fornecedorCadastrado, setFornecedorCadastrado] = useState('');
    const [produtoCadastrado, setProdutoCadastrado] = useState('');
    const [listaFornecedores, setListaFornecedores] = useState([]);
    const [listaProdutos, setListaProdutos] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/fornecedores')
            .then((resposta) => resposta.json())
            .then((dados) => setListaFornecedores(dados))
            .catch((erro) => console.error('Erro ao buscar fornecedores:', erro));

        fetch('http://localhost:8080/produtos')
            .then((resposta) => resposta.json())
            .then((dados) => setListaProdutos(dados))
            .catch((erro) => console.error('Erro ao buscar produtos:', erro));
    }, []);

    const salvarAssociacao = (evento) => {
        evento.preventDefault();

        const novaAssociacao = {
            fornecedorCadastrado,
            produtoCadastrado
        };

        fetch('http://localhost:8080/associacoes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novaAssociacao),
        })
        .then((resposta) => resposta.json())
        .then((dados) => {
            console.log('Associação guardada com sucesso:', dados);
            alert('Associação cadastrada com sucesso!');
        })
        .catch((erro) => {
            console.error('Erro ao cadastrar associação:', erro);
        });
    };

    return (
        <div>
            <h2>Cadastro de Associação</h2>
            <form onSubmit={salvarAssociacao}>
                
                <select 
                    value={fornecedorCadastrado} 
                    onChange={(evento) => setFornecedorCadastrado(evento.target.value)}
                >
                    <option value="">Selecione um fornecedor</option>
                    {listaFornecedores.map((fornecedor, index) => (
                        <option key={index} value={fornecedor.nome}>
                            {fornecedor.nome}
                        </option>
                    ))}
                </select>

                <select 
                    value={produtoCadastrado} 
                    onChange={(evento) => setProdutoCadastrado(evento.target.value)}
                >
                    <option value="">Selecione um produto</option>
                    {listaProdutos.map((produto, index) => (
                        <option key={index} value={produto.nomeProduto}>
                            {produto.nomeProduto}
                        </option>
                    ))}
                </select>

                <button type="submit">Cadastrar Associação</button>
            </form>
        </div>
    );
}

export default Associacao;