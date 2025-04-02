import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/Cliente.css";
import Cliente from "../components/Cliente";
import { FaSearch } from "react-icons/fa"; // Ícones modernos
import AdicionarCliente from "../components/AdicionarCliente";

const ClientesPage = () => {
  const [clientes, setClientes] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [filtro, setFiltro] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [mensagem, setMensagem] = useState(""); // Para exibir mensagens de sucesso ou erro

  const pageSize = 20; // Número de clientes por página

  // Busca os clientes da API
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7281/api/cliente/buscaClientes?filtro=${filtro}&page=${paginaAtual}&pageSize=${pageSize}`
        );
        setClientes(response.data.clientes);
        setTotalPaginas(response.data.total ? Math.ceil(response.data.total / pageSize) : 1);
      } catch (error) {
        console.error("Erro ao buscar clientes", error);
      }
    };

    fetchClientes();
  }, [paginaAtual, filtro]);

  // Atualiza o filtro
  const handleFiltroChange = (e) => {
    setFiltro(e.target.value);
  };

  // Exclui um cliente
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7281/api/cliente/deletaClientes/${id}`);
      setClientes(clientes.filter(cliente => cliente.id !== id));
      setMensagem("Cliente excluído com sucesso!"); // Mensagem de exclusão
      setTimeout(() => setMensagem(""), 3000); // Remove a mensagem após 3 segundos
    } catch (error) {
      console.error("Erro ao deletar cliente", error);
    }
  };

  // Adiciona um novo cliente
  const adicionarCliente = (novoCliente) => {
    setClientes([novoCliente, ...clientes]); // Adiciona o cliente no topo da lista
    setFiltro(novoCliente.nome); // Atualiza o filtro para mostrar o novo cliente
    setMensagem("Cliente salvo com sucesso!"); // Mensagem de sucesso
    setTimeout(() => setMensagem(""), 3000); // Remove a mensagem após 3 segundos
  };

  return (
    <div className="container">
      <div className="topo-container">
        <h1>Clientes</h1>
        <button className="adicionar-cliente" onClick={() => setModalAberto(true)}>+ Adicionar Cliente</button>
      </div>
      
      {/* Mensagem de sucesso ou erro */}
      {mensagem && <div className="mensagem">{mensagem}</div>}

      <AdicionarCliente
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        adicionarCliente={adicionarCliente}
        setFiltro={setFiltro}
      />

      {/* Área de Filtro */}
      <div className="filtro-container">
        <FaSearch className="filtro-icone" />
        <input
          type="text"
          placeholder={`Buscar por Nome ou ID`}
          value={filtro}
          onChange={handleFiltroChange}
          className="filtro-input"
        />
      </div>

      {/* Espaço entre filtro e tabela */}
      <div className="espacamento"></div>

      {/* Tabela de Clientes */}
      <table className="tabela">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Observações</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <Cliente
              key={cliente.id}
              cliente={cliente}
              editandoId={editandoId}
              setEditandoId={setEditandoId} 
              setClientes={setClientes}
              clientes={clientes}
              handleDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>

      {/* Espaço entre tabela e paginação */}
      <div className="espacamento"></div>

      {/* Botões de Paginação */}
      <div className="paginacao">
        <button disabled={paginaAtual === 1} onClick={() => setPaginaAtual(paginaAtual - 1)}>
          ⬅️ Anterior
        </button>
        <span>Página {paginaAtual} de {totalPaginas}</span>
        <button disabled={paginaAtual === totalPaginas} onClick={() => setPaginaAtual(paginaAtual + 1)}>
          Próxima ➡️
        </button>
      </div>
    </div>
  );
};

export default ClientesPage;