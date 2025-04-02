import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import "../style/LoginPage.css";

const LoginPage = ({ onLogin }) => {
    const navigate = useNavigate();

    const handleLogin = async (data) => {
        if (data.mensagem === "Login realizado com sucesso!") {
            onLogin(data); // Atualiza o estado de login no App.js
            navigate("/clientes"); // Redireciona para a página de clientes
        } else {
            alert("Login falhou. Verifique suas credenciais.");
        }
    };

    return (
        <div className="login-container">
            <h2>Bem-vindo ao Sistema 3D Prints</h2>
            <LoginForm onLogin={handleLogin} />
        </div>
    );
};

export default LoginPage;
