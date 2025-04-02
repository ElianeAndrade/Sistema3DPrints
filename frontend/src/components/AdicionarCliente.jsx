import React, { useState } from "react";
import axios from "axios";
import "../style/Cliente.css";

const AdicionarCliente = ({ isOpen, onClose, adicionarCliente, setFiltro }) => {
    const [novoCliente, setNovoCliente] = useState({
        nome: "",
        cpf: "",
        email: "",
        telefone: "",
        observacao: ""
    });

    // Não renderiza o modal se `isOpen` for falso
    if (!isOpen) return null;

    // Atualiza os valores do formulário
    const handleChange = (e) => {
        setNovoCliente({ ...novoCliente, [e.target.name]: e.target.value });
    };

    // Submete o formulário para adicionar um novo cliente
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://localhost:7281/api/cliente/novoCliente", novoCliente);
            adicionarCliente(response.data); // Adiciona o cliente à lista
            setFiltro(novoCliente.nome); // Atualiza o filtro para mostrar o novo cliente
            setNovoCliente({ nome: "", cpf: "", email: "", telefone: "", observacao: "" }); // Limpa os campos
            onClose(); // Fecha o modal
        } catch (error) {
            console.error("Erro ao adicionar cliente", error);
        }
    };

    // Fecha o modal e limpa os campos ao cancelar
    const handleCancel = () => {
        setNovoCliente({ nome: "", cpf: "", email: "", telefone: "", observacao: "" }); // Limpa os campos
        onClose(); // Fecha o modal
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h2>Adicionar Cliente</h2>
                <form onSubmit={handleSubmit}>
                    <label>Nome:</label>
                    <input
                        type="text"
                        name="nome"
                        value={novoCliente.nome}
                        onChange={handleChange}
                        required
                    />
                    
                    <label>CPF:</label>
                    <input
                        type="text"
                        name="cpf"
                        value={novoCliente.cpf}
                        onChange={handleChange}
                    />
                    
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={novoCliente.email}
                        onChange={handleChange}
                    />
                    
                    <label>Telefone:</label>
                    <input
                        type="text"
                        name="telefone"
                        value={novoCliente.telefone}
                        onChange={handleChange}
                    />
                    
                    <label>Observações:</label>
                    <input
                        type="text"
                        name="observacao"
                        value={novoCliente.observacao}
                        onChange={handleChange}
                    />
                    
                    <div className="botoes">
                        <button type="submit" className="salvar">Salvar</button>
                        <button type="button" className="cancelar" onClick={handleCancel}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdicionarCliente;