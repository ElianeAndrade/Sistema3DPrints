import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ClientesPage = () => {
  const [clientes, setClientes] = useState([]);
  const [clienteEdit, setClienteEdit] = useState(null); // Para editar o cliente
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cidade, setCidade] = useState("");
  const [observacao, setObservacao] = useState("");

  // Buscar os clientes ao carregar a página
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get("http://localhost:7281/api/cliente/buscaClientes");
        setClientes(response.data);
      } catch (error) {
        console.error("Erro ao buscar clientes", error);
      }
    };

    fetchClientes();
  }, []);

  // Deletar cliente
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7281/api/cliente/deletaClientes/${id}`);
      setClientes(clientes.filter(cliente => cliente.id !== id)); // Atualiza a lista removendo o cliente
    } catch (error) {
      console.error("Erro ao excluir cliente", error);
    }
  };

  // Exibir o modal de edição
  const handleEdit = (cliente) => {
    setClienteEdit(cliente);
    setNome(cliente.nome);
    setCpf(cliente.cpf);
    setEmail(cliente.email);
    setTelefone(cliente.telefone);
    setEndereco(cliente.endereco);
    setCidade(cliente.cidade);
    setObservacao(cliente.observacao);
  };

  // Atualizar os dados do cliente
  const handleUpdate = async (id) => {
    const updatedCliente = {
      id,
      nome,
      cpf,
      email,
      telefone,
      endereco,
      cidade,
      observacao,
    };

    try {
      await axios.put(`http://localhost:7281/api/cliente/atualizaClientes/${id}`, updatedCliente);
      setClientes(clientes.map(cliente => cliente.id === id ? updatedCliente : cliente)); // Atualiza a lista
      setClienteEdit(null); // Fecha o modal de edição
    } catch (error) {
      console.error("Erro ao atualizar cliente", error);
    }
  };

  return (
    <div>
      <h1>Clientes</h1>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.nome}</td>
              <td>{cliente.cpf}</td>
              <td>{cliente.email}</td>
              <td>{cliente.telefone}</td>
              <td>
                <button onClick={() => handleEdit(cliente)}>Editar</button>
                <button onClick={() => handleDelete(cliente.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de edição do cliente */}
      {clienteEdit && (
        <div className="modal">
          <h2>Editar Cliente</h2>
          <div>
            <label>Nome:</label>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>
          <div>
            <label>CPF:</label>
            <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Telefone:</label>
            <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
          </div>
          <div>
            <label>Endereço:</label>
            <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
          </div>
          <div>
            <label>Cidade:</label>
            <input type="text" value={cidade} onChange={(e) => setCidade(e.target.value)} />
          </div>
          <div>
            <label>Observação:</label>
            <input type="text" value={observacao} onChange={(e) => setObservacao(e.target.value)} />
          </div>
          <button onClick={() => handleUpdate(clienteEdit.id)}>Salvar</button>
          <button onClick={() => setClienteEdit(null)}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default ClientesPage;
