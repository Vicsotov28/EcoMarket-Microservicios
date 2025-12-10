import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Carrito = ({ token }) => {
    const { cart, removeFromCart, clearCart, total } = useCart();
    const [procesando, setProcesando] = useState(false);
    const navigate = useNavigate();

    const handleCompra = async () => {
        if (!token) {
            alert("Debes iniciar sesión para comprar");
            navigate('/login');
            return;
        }

        setProcesando(true);
        try {
            // Enviamos los pedidos al microservicio
            for (const item of cart) {
                await axios.post('http://localhost:8083/pedidos', {
                    usuarioId: 1, // En el futuro esto vendrá del token
                    productoId: item.id,
                    cantidad: item.cantidad,
                    precioTotal: item.precio * item.cantidad
                });
            }
            
            alert("¡Compra realizada con éxito! 🚀 Revisa tu correo.");
            clearCart();
            navigate('/');
        } catch (error) {
            console.error(error);
            alert("Hubo un error al procesar el pedido.");
        } finally {
            setProcesando(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="container mt-5 text-center">
                <div className="p-5 bg-light rounded-3 shadow-sm">
                    <h3>Tu carrito está vacío 😢</h3>
                    <p className="text-muted">Parece que aún no has agregado productos.</p>
                    <Link to="/" className="btn btn-primary mt-3">Ir al Catálogo</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">🛒 Tu Carrito de Compras</h2>
            
            <div className="card shadow-sm">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th className="py-3 ps-4">Producto</th>
                                    <th className="py-3">Precio</th>
                                    <th className="py-3">Cantidad</th>
                                    <th className="py-3">Subtotal</th>
                                    <th className="py-3 text-end pe-4">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map(item => (
                                    <tr key={item.id} className="align-middle">
                                        <td className="ps-4">
                                            <div className="d-flex align-items-center">
                                                {/* --- AQUÍ ESTÁ LA IMAGEN NUEVA --- */}
                                                <img 
                                                    src={item.imagenUrl || "https://via.placeholder.com/60"} 
                                                    alt={item.nombre} 
                                                    className="rounded border"
                                                    style={{ width: '60px', height: '60px', objectFit: 'cover', marginRight: '15px' }}
                                                />
                                                <div>
                                                    <h6 className="mb-0">{item.nombre}</h6>
                                                    <small className="text-muted">ID: {item.id}</small>
                                                </div>
                                            </div>
                                        </td>
                                        <td>${item.precio}</td>
                                        <td>
                                            <span className="badge bg-secondary rounded-pill">
                                                {item.cantidad}
                                            </span>
                                        </td>
                                        <td className="fw-bold text-success">
                                            ${item.precio * item.cantidad}
                                        </td>
                                        <td className="text-end pe-4">
                                            <button 
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() => removeFromCart(item.id)}
                                                title="Eliminar del carrito"
                                            >
                                                <i className="bi bi-trash"></i> Eliminar 🗑️
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* --- RESUMEN DE TOTAL --- */}
            <div className="row justify-content-end mt-4">
                <div className="col-md-5 col-lg-4">
                    <div className="card shadow-sm border-0 bg-light">
                        <div className="card-body">
                            <div className="d-flex justify-content-between mb-2">
                                <span>Subtotal:</span>
                                <span>${total}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Envío:</span>
                                <span className="text-success">Gratis</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between mb-4">
                                <h4 className="fw-bold">Total:</h4>
                                <h4 className="fw-bold text-success">${total}</h4>
                            </div>
                            
                            <button 
                                className="btn btn-success w-100 py-2 fw-bold"
                                onClick={handleCompra}
                                disabled={procesando}
                            >
                                {procesando ? 'Procesando...' : 'Finalizar Compra ✅'}
                            </button>
                            
                            <Link to="/" className="btn btn-link w-100 mt-2 text-decoration-none text-muted">
                                ← Seguir comprando
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Carrito;