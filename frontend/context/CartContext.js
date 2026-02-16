
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        const savedCart = localStorage.getItem("mamichic_cart");
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    const addToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
        localStorage.setItem("mamichic_cart", JSON.stringify(newCart));
        return true; // Used for toast in components
    };

    const removeFromCart = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
        localStorage.setItem("mamichic_cart", JSON.stringify(newCart));
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("mamichic_cart");
    };

    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            clearCart,
            totalPrice,
            isCartOpen,
            setIsCartOpen
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
