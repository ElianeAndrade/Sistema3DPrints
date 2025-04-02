import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaClipboardList, FaFileInvoice, FaCog, FaSignOutAlt } from "react-icons/fa";
import "../style/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo">Sistema 3D Prints</div>
      <div className="nav-links">
        <Link to="/clientes" className="nav-item">
          <FaUser /> <span>Clientes</span>
        </Link>
        <Link to="/pedido" className="nav-item">
          <FaClipboardList /> <span>Pedidos</span>
        </Link>
        <Link to="/orcamentos" className="nav-item">
          <FaFileInvoice /> <span>Orçamentos</span>
        </Link>
        <Link to="/configuracoes" className="nav-item">
          <FaCog /> <span>Configurações</span>
        </Link>
        <Link to="/" className="nav-item logout">
          <FaSignOutAlt /> <span>Sair</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
