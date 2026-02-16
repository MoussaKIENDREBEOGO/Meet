
"use client";
import { useState } from "react";
import { X, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function CartPanel() {
    const { cart, removeFromCart, isCartOpen, setIsCartOpen, totalPrice, clearCart } = useCart();
    const [showCheckoutForm, setShowCheckoutForm] = useState(false);
    const [customerInfo, setCustomerInfo] = useState({ name: "", city: "" });

    const handleCheckout = async () => {
        if (!customerInfo.name || !customerInfo.city) {
            alert("Veuillez remplir votre nom et ville.");
            return;
        }

        const orderData = {
            customer: { name: customerInfo.name, city: customerInfo.city },
            items: cart.map(item => ({
                name: item.name,
                price: item.price,
                quantity: 1,
                image: item.image,
                product: item._id
            })),
            totalPrice: totalPrice
        };

        try {
            const response = await fetch("http://localhost:5000/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData)
            });

            if (!response.ok) throw new Error("Erreur base de données");

            const numeroVendeur = "22661357833";
            let messageBody = cart.map(item => `• ${item.name} (${item.price.toLocaleString()} FCFA)`).join("\n");
            const message = encodeURIComponent(
                `💎 *NOUVELLE COMMANDE MAMICHIC*\n\n` +
                `👤 *Client:* ${customerInfo.name}\n` +
                `📍 *Ville:* ${customerInfo.city}\n\n` +
                `🛍️ *Produits:*\n${messageBody}\n\n` +
                `💰 *TOTAL:* ${totalPrice.toLocaleString()} FCFA\n\n` +
                `_Envoyé depuis le site Mamichic Luxury_`
            );
            window.open(`https://wa.me/${numeroVendeur}?text=${message}`, "_blank");

            clearCart();
            setIsCartOpen(false);
            setShowCheckoutForm(false);

        } catch (err) {
            console.error(err);
            alert("Erreur lors de l'enregistrement de la commande.");
        }
    };

    return (
        <>
            <div
                className={`cart-panel-overlay ${isCartOpen ? 'open' : ''}`}
                onClick={() => setIsCartOpen(false)}
            ></div>
            <div className={`cart-panel ${isCartOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <h2 className="cart-title">Votre Panier</h2>
                    <button className="theme-toggle" style={{ fontSize: "1rem" }} onClick={() => setIsCartOpen(false)}><X size={20} /></button>
                </div>

                <div className="cart-items">
                    {cart.length === 0 ? (
                        <div style={{ textAlign: "center", marginTop: "60px" }}>
                            <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>Votre panier est vide.</p>
                            <button className="category-btn" onClick={() => setIsCartOpen(false)}>Continuer mes achats</button>
                        </div>
                    ) : (
                        cart.map((item, index) => (
                            <div key={index} className="cart-item">
                                <img src={item.image.startsWith('/') ? item.image : `/${item.image}`} alt={item.name} className="cart-item-img" />
                                <div className="cart-item-info">
                                    <p className="cart-item-name">{item.name}</p>
                                    <p className="cart-item-price">{item.price.toLocaleString()} FCFA</p>
                                    <button className="btn-remove" onClick={() => removeFromCart(index)}>
                                        <Trash2 size={14} style={{ display: "inline", marginRight: "4px" }} /> Retirer
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="cart-footer">
                        {!showCheckoutForm ? (
                            <>
                                <div className="cart-total"><span>Total</span><span>{totalPrice.toLocaleString()} FCFA</span></div>
                                <button className="btn-checkout" onClick={() => setShowCheckoutForm(true)}>Passer à la commande</button>
                            </>
                        ) : (
                            <div className="checkout-form" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                <h3 style={{ marginBottom: "8px", fontFamily: "var(--font-serif)" }}>Vos Informations</h3>
                                <input
                                    type="text"
                                    placeholder="Votre Nom Complet"
                                    className="search-input"
                                    style={{ borderRadius: "var(--radius)", padding: "12px" }}
                                    value={customerInfo.name}
                                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Votre Ville"
                                    className="search-input"
                                    style={{ borderRadius: "var(--radius)", padding: "12px" }}
                                    value={customerInfo.city}
                                    onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                                />
                                <div className="cart-total" style={{ marginTop: "12px", fontSize: "1.2rem" }}>
                                    <span>Total</span><span>{totalPrice.toLocaleString()} FCFA</span>
                                </div>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <button className="category-btn" style={{ flex: 1 }} onClick={() => setShowCheckoutForm(false)}>Retour</button>
                                    <button className="btn-checkout" style={{ flex: 2 }} onClick={handleCheckout}>Commander via WhatsApp</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
