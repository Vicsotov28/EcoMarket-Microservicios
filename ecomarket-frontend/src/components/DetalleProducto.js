import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const DetalleProducto = () => {
    const { id } = useParams(); // Obtenemos el ID de la URL
    const [producto, setProducto] = useState(null);
    const [cantidad, setCantidad] = useState(1);
    const { addToCart } = useCart();

    useEffect(() => {
        axios.get(`http://localhost:8082/productos/${id}`)
            .then(response => setProducto(response.data))
            .catch(error => console.error("Error buscando producto:", error));
    }, [id]);

    const handleAgregar = () => {
        // Agregamos el producto 'cantidad' veces
        for(let i=0; i<cantidad; i++){
            addToCart(producto);
        }
        alert("Producto agregado al carrito");
    };

    if (!producto) return <div className="text-center mt-5">Cargando...</div>;

    return (
        <div className="container mt-5">
            <Link to="/" className="btn btn-outline-secondary mb-4">← Volver al Catálogo</Link>
            
            <div className="card shadow-lg border-0 overflow-hidden">
                <div className="row g-0">
                    {/* COLUMNA IZQUIERDA: FOTO GRANDE */}
                    <div className="col-md-6">
                        <img 
                            src={producto.imagenUrl || "https://via.placeholder.com/600"} 
                            alt={producto.nombre}
                            className="img-fluid h-100 w-100"
                            style={{ objectFit: 'cover', minHeight: '400px' }}
                        />
                    </div>
                    
                    {/* COLUMNA DERECHA: DATOS */}
                    <div className="col-md-6 p-5 d-flex flex-column justify-content-center">
                        <h1 className="fw-bold mb-3">{producto.nombre}</h1>
                        <h3 className="text-success mb-4">${producto.precio}</h3>
                        
                        <p className="lead text-muted mb-4">{producto.descripcion}</p>
                        
                        <p className="fw-bold">Stock disponible: {producto.stock}</p>

                        <div className="d-flex align-items-center gap-3 mb-4">
                            <label className="fw-bold">Cantidad:</label>
                            <input 
                                type="number" 
                                className="form-control w-25" 
                                value={cantidad}
                                min="1"
                                max={producto.stock}
                                onChange={(e) => setCantidad(parseInt(e.target.value))}
                            />
                        </div>

                        <button 
                            className="btn btn-success btn-lg w-100"
                            onClick={handleAgregar}
                            disabled={producto.stock === 0}
                        >
                            {producto.stock > 0 ? 'Agregar al Carrito 🛒' : 'Agotado 🚫'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetalleProducto;