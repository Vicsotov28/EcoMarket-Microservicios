import React, { createContext, useState, useContext } from 'react';

// Creamos el contexto
const CartContext = createContext();

// Hook para usar el carrito fácil en cualquier lado
export const useCart = () => useContext(CartContext);

// Proveedor del carrito (envuelve a toda la app)
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Función para agregar producto
    const addToCart = (product) => {
        setCart((prevCart) => {
            // Si ya existe, aumentamos la cantidad
            const existing = prevCart.find(item => item.id === product.id);
            if (existing) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item
                );
            }
            // Si no existe, lo agregamos con cantidad 1
            return [...prevCart, { ...product, cantidad: 1 }];
        });
    };

    // Función para eliminar producto
    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    // Función para vaciar carrito (al comprar)
    const clearCart = () => setCart([]);

    // Calcular total
    const total = cart.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    const count = cart.reduce((acc, item) => acc + item.cantidad, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total, count }}>
            {children}
        </CartContext.Provider>
    );
};