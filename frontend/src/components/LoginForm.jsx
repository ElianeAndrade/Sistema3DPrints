import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro("");

        try {
            const response = await fetch("https://localhost:7281/api/Login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, senha }),
            });

            const data = await response.json();

            if (!response.ok || !data.mensagem) {
                throw new Error(data.message || "Credenciais Inválidas");
            }

            onLogin(data); // Atualiza o estado de login no App.js
            navigate("/clientes"); // Redireciona para a página de clientes

        } catch (error) {
            console.error("Erro ao fazer login:", error.message); // Log do erro
            setErro(error.message); // Exibe erro se ocorrer
        }
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h2>Login</h2>
            {erro && <p style={{ color: "red", textAlign: "center" }}>{erro}</p>}
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            <label>
                Senha:
                <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Entrar</button>
        </form>
    );
};

export default LoginForm;
