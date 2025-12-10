import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Catalogo from './components/Catalogo';
import Login from './components/Login';
import { jwtDecode } from "jwt-decode"; // Ojo: importación con llaves
import { useCart } from './context/CartContext'; 
import Carrito from './components/Carrito';
import DetalleProducto from './components/DetalleProducto';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [usuario, setUsuario] = useState(null);
  const { count } = useCart();

  // Cada vez que cambia el token, intentamos decodificarlo para sacar el nombre
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Asumiendo que el token tiene el email en 'sub' (subject)
        setUsuario(decoded.sub);
      } catch (error) {
        localStorage.removeItem('token');
        setToken(null);
      }
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUsuario(null);
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-success mb-4">
          <div className="container">
            <Link className="navbar-brand fw-bold" to="/">EcoMarket SPA 🌿</Link>
            
            <div className="d-flex align-items-center gap-3">
              {/* ENLACE AL CARRITO */}
              <Link to="/carrito" className="btn btn-warning position-relative">
                 🛒 Carrito
                 {count > 0 && (
                   <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                     {count}
                   </span>
                 )}
              </Link>

              {token ? (
                <>
                  <span className="text-white">Hola, {usuario}</span>
                  <button onClick={logout} className="btn btn-outline-light btn-sm">Salir</button>
                </>
              ) : (
                <Link to="/login" className="btn btn-light btn-sm">Ingresar</Link>
              )}
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Catalogo />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/login" element={!token ? <Login setToken={setToken} /> : <Navigate to="/" />} />
          <Route path="/carrito" element={<Carrito token={token} />} /> {/* Nueva Ruta */}
        </Routes>
      </div>
    </Router>
  );
}
export default App;