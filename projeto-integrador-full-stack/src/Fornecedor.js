import {useState} from 'react';

function Fornecedor() {
    const [nome, setNome] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [contatoPrincipal, setContatoPrincipal] = useState('');

    function salvarFornecedor(evento) {
        evento.preventDefault();

        const dadosParaEnviar = {
            nome: nome,
            cnpj: cnpj,
            endereco: endereco,
            telefone: telefone,
            email: email,
            contatoPrincipal: contatoPrincipal
        };
    
        fetch('http://localhost:8080/fornecedores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosParaEnviar)
        })
    }
return (
        <div>
            <h2>Cadastro de Fornecedor</h2>
            <form onSubmit={salvarFornecedor}>
                <input type="text" placeholder="Nome da Empresa" value={nome} onChange={(evento) => setNome(evento.target.value)} />
                <br />
                <input type="text" placeholder="CNPJ" value={cnpj} onChange={(evento) => setCnpj(evento.target.value)} />
                <br />
                <input type="text" placeholder="Endereço" value={endereco} onChange={(evento) => setEndereco(evento.target.value)} />
                <br />
                <input type="text" placeholder="Telefone" value={telefone} onChange={(evento) => setTelefone(evento.target.value)} />
                <br />
                <input type="email" placeholder="E-mail" value={email} onChange={(evento) => setEmail(evento.target.value)} />
                <br />
                <input type="text" placeholder="Contato Principal" value={contatoPrincipal} onChange={(evento) => setContatoPrincipal(evento.target.value)} />
                <br />

                <button type="submit">Cadastrar Fornecedor</button>
            </form>
        </div>
    );
}

export default Fornecedor;