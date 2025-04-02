import React, { useState } from "react";
import axios from "axios";
import "../style/Cliente.css"; // Importando o CSS globalmente
import { FaEdit, FaTrash, FaChevronUp } from "react-icons/fa"; // Ícones modernos

const Cliente = ({ cliente, editandoId, setEditandoId, setClientes, clientes, handleDelete }) => {
    const [dadosEditados, setDadosEditados] = useState({ ...cliente });

    const handleChange = (e) => {
        setDadosEditados({ ...dadosEditados, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`https://localhost:7281/api/cliente/atualizaClientes/${cliente.id}`, dadosEditados);
            setClientes(clientes.map(c => c.id === cliente.id ? dadosEditados : c));
            setEditandoId(null); // Fecha o dropdown após salvar
        } catch (error) {
            console.error("Erro ao atualizar cliente", error);
        }
    };

    return (
        <tr>
            <td>{cliente.id}</td>
            <td>{cliente.nome}</td>
            <td>{cliente.cpf}</td>
            <td>{cliente.email}</td>
            <td>{cliente.telefone}</td>
            <td>{cliente.observacao || "—"}</td>
            <td className="acoes">
                {/* Botão de edição com dropdown */}
                <span className="icone editar" onClick={() => setEditandoId(editandoId === cliente.id ? null : cliente.id)}>
                    {editandoId === cliente.id ? <FaChevronUp /> : <FaEdit />}
                </span>

                {/* Botão de deletar */}
                <span className="icone excluir" onClick={() => handleDelete(cliente.id)}>
                    <FaTrash />
                </span>

                {/* Dropdown de edição (só aparece se editandoId for igual ao ID do cliente) */}
                {editandoId === cliente.id && (
                    <div className="dropdown-edicao">
                        <label>Nome:</label>
                        <input type="text" name="nome" value={dadosEditados.nome} onChange={handleChange} />

                        <label>CPF:</label>
                        <input type="text" name="cpf" value={dadosEditados.cpf} onChange={handleChange} />

                        <label>Email:</label>
                        <input type="email" name="email" value={dadosEditados.email} onChange={handleChange} />

                        <label>Telefone:</label>
                        <input type="text" name="telefone" value={dadosEditados.telefone} onChange={handleChange} />

                        <label>Observações:</label>
                        <input type="text" name="observacao" value={dadosEditados.observacao || ""} onChange={handleChange} />

                        <div className="botoes">
                            <button className="salvar" onClick={handleUpdate}>Salvar</button>
                            <button className="cancelar" onClick={() => setEditandoId(null)}>Cancelar</button>
                        </div>
                    </div>
                )}
            </td>
        </tr>
    );
};

export default Cliente;
