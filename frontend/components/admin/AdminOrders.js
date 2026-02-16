
"use client";

export default function AdminOrders({ orders, handleOrderUpdate }) {
    return (
        <div>
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", marginBottom: "40px" }}>Dernières Commandes</h1>
            <div style={{ display: "grid", gap: "20px" }}>
                {orders.length > 0 ? orders.map(order => (
                    <div key={order._id} className="product-card" style={{ padding: "30px", border: "1px solid var(--glass-border)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                            <div>
                                <h3 style={{ color: "var(--accent)" }}>{order.customer.name}</h3>
                                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                                    📍 {order.customer.city} | 📅 {new Date(order.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <select
                                    value={order.status}
                                    onChange={(e) => handleOrderUpdate(order._id, e.target.value)}
                                    style={{ background: "#222", color: "var(--accent)", border: "1px solid var(--accent)", padding: "10px", borderRadius: "8px" }}
                                >
                                    <option value="En attente">En attente</option>
                                    <option value="Confirmée">Confirmée</option>
                                    <option value="Expédiée">Expédiée</option>
                                    <option value="Livrée">Livrée</option>
                                    <option value="Annulée">Annulée</option>
                                </select>
                            </div>
                        </div>
                        <div style={{ borderTop: "1px solid var(--glass-border)", paddingTop: "15px" }}>
                            {order.items.map((item, idx) => (
                                <div key={idx} style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                                    <span>{item.name} x {item.quantity}</span>
                                    <span>{item.price.toLocaleString()} FCFA</span>
                                </div>
                            ))}
                            <div style={{ marginTop: "15px", textAlign: "right", fontSize: "1.2rem", fontWeight: "700", color: "var(--accent)" }}>
                                Total: {order.totalPrice.toLocaleString()} FCFA
                            </div>
                        </div>
                    </div>
                )) : (
                    <p>Aucune commande enregistrée pour le moment.</p>
                )}
            </div>
        </div>
    );
}
