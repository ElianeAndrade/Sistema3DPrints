import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ClientesPage from "./pages/ClientesPage";
import PedidoPage from "./pages/PedidoPage";
import OrcamentosPage from "./pages/OrcamentosPage";
import Navbar from "./components/Navbar";
import PortifolioPage from "./pages/PortifolioPage";

const App = () => {
    // Estados de login e carregamento
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    // Verifica se há um token no localStorage
    useEffect(() => {
        setLoading(false); // Após verificar, define que o carregamento foi concluído
    }, []);

    const handleLogin = (data) => {
        console.log("Login realizado com sucesso!"); // Log para depuração
        setLoggedIn(true); // Atualiza o estado de login
    };

    const handleLogout = () => {
        console.log("Logout realizado!"); // Log para depuração
        setLoggedIn(false); // Atualiza o estado de login
    };

    if (loading) {
        return <div>Carregando...</div>; // Mostra mensagem de carregamento até a verificação ser concluída
    }

    return (
        <Router>
            {loggedIn && <Navbar onLogout={handleLogout} />}
            <Routes>
                <Route
                    path="/"
                    element={loggedIn ? <Navigate to="/clientes" /> : <LoginPage onLogin={handleLogin} />}
                />
                <Route
                    path="/clientes"
                    element={loggedIn ? <ClientesPage /> : <Navigate to="/" />}
                />
                <Route
                    path="/pedido"
                    element={loggedIn ? <PedidoPage /> : <Navigate to="/" />}
                />
                <Route
                    path="/orcamentos"
                    element={loggedIn ? <OrcamentosPage /> : <Navigate to="/" />}
                />
                <Route
                    path="/portfolio"
                    element={loggedIn ? <PortifolioPage /> : <Navigate to="/" />}
                />
            </Routes>
        </Router>
    );
};

export default App;