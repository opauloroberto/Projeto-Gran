import React from 'react';
import './App.css';
import Fornecedor from './Fornecedor';
import Produto from './Produtos';
import Associacao from './Associacao';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Projeto Gran</h1>
      </header>

      <main>
        <div className="card">
          <Fornecedor />
        </div>

        <div className="card">
          <Produto />
        </div>

        <div className="card">
          <Associacao />
        </div>
      </main>
    </div>
  );
}

export default App;