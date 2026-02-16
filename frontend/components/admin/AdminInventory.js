
"use client";

export default function AdminInventory({ products, setIsEditing, setProductForm, setActiveTab, deleteProduct }) {
    const actionBtn = {
        background: "none",
        border: "1px solid var(--accent)",
        color: "var(--accent)",
        padding: "10px 15px",
        borderRadius: "8px",
        cursor: "pointer",
        flex: 1,
        fontSize: "0.8rem",
        fontWeight: "600"
    };

    return (
        <div>
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", marginBottom: "40px" }}>Gestion de l'Inventaire</h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "25px" }}>
                {products.map(p => (
                    <div key={p._id} className="product-card" style={{ padding: "15px", border: "1px solid var(--glass-border)" }}>
                        <img
                            src={p.image.startsWith('/') ? p.image : `/${p.image}`}
                            style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "12px", marginBottom: "15px" }}
                            alt={p.name}
                        />
                        <h4 style={{ fontSize: "1.1rem", marginBottom: "8px" }}>{p.name}</h4>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontWeight: "700", color: "var(--accent)" }}>{p.price.toLocaleString()} FCFA</span>
                            <span style={{ fontSize: "0.8rem", color: p.countInStock < 5 ? "#f44336" : "var(--text-muted)" }}>Stock: {p.countInStock}</span>
                        </div>
                        <div style={{ display: "flex", gap: "10px", marginTop: "20px", borderTop: "1px solid var(--glass-border)", paddingTop: "15px" }}>
                            <button
                                onClick={() => { setIsEditing(p._id); setProductForm(p); setActiveTab("add-product"); }}
                                style={actionBtn}
                            >
                                Modifier
                            </button>
                            <button
                                onClick={() => deleteProduct(p._id)}
                                style={{ ...actionBtn, color: "#f44336", borderColor: "#f44336" }}
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
