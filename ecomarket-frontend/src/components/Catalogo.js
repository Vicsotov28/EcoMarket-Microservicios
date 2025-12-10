import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom'; // <--- Importante para navegar

const Catalogo = () => {
    const [productos, setProductos] = useState([]);
    const { addToCart } = useCart();

    const cargarProductos = () => {
        axios.get('http://localhost:8082/productos')
            .then(response => setProductos(response.data))
            .catch(error => console.error(error));
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    // Función para eliminar
    const eliminarProducto = async (id) => {
        if (window.confirm("¿Estás seguro de borrar este producto?")) {
            try {
                await axios.delete(`http://localhost:8082/productos/${id}`);
                cargarProductos(); // Recargar la lista
            } catch (error) {
                alert("Error al eliminar (quizás ya tiene pedidos asociados)");
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Catálogo EcoMarket 🌿</h2>
            <div className="row">
                {productos.map(prod => (
                    <div className="col-md-4 mb-4" key={prod.id}>
                        <div className="card h-100 shadow-sm border-0 hover-effect position-relative">
                            {/* IMAGEN CLICKEABLE -> LLEVA AL DETALLE */}
                            <Link to={`/producto/${prod.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div style={{ height: '200px', overflow: 'hidden' }}>
                                    <img 
                                        src={prod.imagenUrl || "https://via.placeholder.com/300x200"} 
                                        className="card-img-top" 
                                        alt={prod.nombre}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                    />
                                </div>
                                
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title fw-bold">{prod.nombre}</h5>
                                    <p className="card-text text-muted small text-truncate">
                                        {prod.descripcion}
                                    </p>
                                    
                                    <div className="mt-auto d-flex justify-content-between align-items-center">
                                        <span className="h5 text-success mb-0">${prod.precio}</span>
                                        <span className="badge bg-secondary">Stock: {prod.stock}</span>
                                    </div>
                                </div>
                            </Link>

                            {/* BOTÓN AGREGAR AL CARRITO (FUERA DEL LINK) */}
                            <div className="card-footer bg-white border-0">
                                <button 
                                    className="btn btn-success w-100"
                                    onClick={() => addToCart(prod)}
                                    disabled={prod.stock === 0}
                                >
                                    {prod.stock > 0 ? 'Agregar 🛒' : 'Agotado'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Catalogo;