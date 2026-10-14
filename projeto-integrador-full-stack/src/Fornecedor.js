import React, { useState } from 'react';

function Fornecedor({ onCadastroSucesso }) { // <-- Recebe a função aqui
    const [nome, setNome] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [contatoPrincipal, setContatoPrincipal] = useState('');

    const salvarFornecedor = (evento) => {
        evento.preventDefault();

        const novoFornecedor = { nome, cnpj, endereco, telefone, email, contatoPrincipal };

        fetch('http://localhost:8080/fornecedores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoFornecedor),
        })
        .then(async (resposta) => {
            const dados = await resposta.json();
            if (!resposta.ok) {
                throw new Error(dados.erro || 'Erro ao cadastrar fornecedor.');
            }
            alert('Fornecedor cadastrado com sucesso!');
            
            setNome(''); setCnpj(''); setEndereco(''); setTelefone(''); setEmail(''); setContatoPrincipal('');
            
            // Dispara o gatilho para avisar a Associação!
            if (onCadastroSucesso) onCadastroSucesso();
        })
        .catch((erro) => {
            alert(erro.message);
        });
    };

    return (
        <div>
            <h2>Cadastro de Fornecedor</h2>
            <form onSubmit={salvarFornecedor}>
                <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                <input type="text" placeholder="CNPJ" value={cnpj} onChange={(e) => setCnpj(e.target.value)} required />
                <input type="text" placeholder="Endereço" value={endereco} onChange={(e) => setEndereco(e.target.value)} required />
                <input type="text" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="text" placeholder="Contato Principal" value={contatoPrincipal} onChange={(e) => setContatoPrincipal(e.target.value)} required />
                <button type="submit">Cadastrar Fornecedor</button>
            </form>
        </div>
    );
}

export default Fornecedor;