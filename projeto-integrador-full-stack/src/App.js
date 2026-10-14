import React, { useState } from 'react';
import './App.css';
import Fornecedor from './Fornecedor';
import Produto from './Produtos';
import Associacao from './Associacao';

function App() {
  // Criamos um gatilho numérico. Sempre que ele mudar, a Associação sabe que deve atualizar.
  const [gatilhoAtualizacao, setGatilhoAtualizacao] = useState(0);

  // Função que puxa o gatilho
  const notificarMudanca = () => {
    setGatilhoAtualizacao(gatilhoAtualizacao + 1);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Projeto Gran</h1>
      </header>

      <main>
        <div className="card">
          {/* Passamos a função notificarMudanca para o componente */}
          <Fornecedor onCadastroSucesso={notificarMudanca} />
        </div>

        <div className="card">
          <Produto onCadastroSucesso={notificarMudanca} />
        </div>

        <div className="card">
          {/* A Associação fica a observar este gatilho */}
          <Associacao gatilhoAtualizacao={gatilhoAtualizacao} />
        </div>
      </main>
    </div>
  );
}

export default App;