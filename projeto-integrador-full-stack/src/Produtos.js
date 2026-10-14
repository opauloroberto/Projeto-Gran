import {useState} from 'react';

function Produtos() {
    const [nomeProduto, setNomeProduto] = useState('');
    const [quantidadeEmEstoque, setQuantidadeEmEstoque] = useState(0);
    const [descricao, setDescricao] = useState('');
    const [codigoDeBarras, setCodigoDeBarras] = useState('');
    const [categoria, setCategoria] = useState('');
    const [dataDeValidade, setDataDeValidade] = useState('');
    const [imagem, setImagem] = useState('');
    const [outros, setOutros] = useState('');

    function salvarProduto(evento) {
        evento.preventDefault();

        const dadosParaEnviar = {
            nomeProduto: nomeProduto,
            quantidadeEmEstoque: quantidadeEmEstoque,
            descricao: descricao,
            codigoDeBarras: codigoDeBarras,
            categoria: categoria,
            dataDeValidade: dataDeValidade,
            imagem: imagem,
            outros: outros
        };

        fetch('http://localhost:3000/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosParaEnviar)
        })
    }

    return (
        <div>
            <h2>Cadastro de Produto</h2>
            <form onSubmit={salvarProduto}>
                <input type="text" placeholder="Nome do Produto" value={nomeProduto} onChange={(evento) => setNomeProduto(evento.target.value)} />
                <br />
                <input type="number" placeholder="Quantidade em Estoque" value={quantidadeEmEstoque} onChange={(evento) => setQuantidadeEmEstoque(evento.target.value)} />
                <br />
                <input type="text" placeholder="Descrição" value={descricao} onChange={(evento) => setDescricao(evento.target.value)} />
                <br />
                <input type="text" placeholder="Código de Barras" value={codigoDeBarras} onChange={(evento) => setCodigoDeBarras(evento.target.value)} />
                <br />
                <input type="text" placeholder="Categoria" value={categoria} onChange={(evento) => setCategoria(evento.target.value)} />
                <br />
                <input type="date" placeholder="Data de Validade" value={dataDeValidade} onChange={(evento) => setDataDeValidade(evento.target.value)} />
                <br />
                <input type="text" placeholder="Imagem" value={imagem} onChange={(evento) => setImagem(evento.target.value)} />
                <br />
                <input type="text" placeholder="Outros" value={outros} onChange={(evento) => setOutros(evento.target.value)} />
                <br />

                <button type="submit">Cadastrar Produto</button>
            </form>
        </div>
    );
}

export default Produtos;