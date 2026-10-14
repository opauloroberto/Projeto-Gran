import React, { useState, useEffect } from 'react';

function Associacao({ gatilhoAtualizacao }) { // <-- Recebe o estado do gatilho aqui
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
            
    // A mágica acontece aqui: ao colocar o gatilho dentro destes parênteses retos,
    // o React sabe que tem de repetir este fetch sempre que o valor do gatilho mudar!
    }, [gatilhoAtualizacao]); 

    const salvarAssociacao = (evento) => {
        evento.preventDefault();

        const novaAssociacao = { fornecedorCadastrado, produtoCadastrado };

        fetch('http://localhost:8080/associacoes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novaAssociacao),
        })
        .then(async (resposta) => {
            const dados = await resposta.json();
            if (!resposta.ok) {
                throw new Error(dados.erro || 'Erro ao cadastrar associação.');
            }
            alert('Associação cadastrada com sucesso!');
            setFornecedorCadastrado('');
            setProdutoCadastrado('');
        })
        .catch((erro) => {
            alert(erro.message);
        });
    };

    return (
        <div>
            <h2>Cadastro de Associação</h2>
            <form onSubmit={salvarAssociacao}>
                
                <select 
                    value={fornecedorCadastrado} 
                    onChange={(evento) => setFornecedorCadastrado(evento.target.value)}
                    required
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
                    required
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