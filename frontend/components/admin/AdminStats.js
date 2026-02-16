
"use client";

export default function AdminStats({ orders, products }) {
    const totalPrice = orders
        .filter(o => o.status !== 'Annulée')
        .reduce((sum, o) => sum + o.totalPrice, 0);

    const totalStock = products.reduce((sum, p) => sum + p.countInStock, 0);

    return (
        <div>
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", marginBottom: "40px" }}>Tableau de Bord / Stats</h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "25px" }}>
                <div className="product-card" style={{ padding: "40px", textAlign: "center" }}>
                    <h4 style={{ color: "var(--text-muted)", fontSize: "0.8rem", textTransform: "uppercase" }}>Chiffre d'Affaire</h4>
                    <h2 style={{ fontSize: "2.5rem", color: "var(--accent)" }}>
                        {totalPrice.toLocaleString()} <small style={{ fontSize: "1rem" }}>FCFA</small>
                    </h2>
                </div>
                <div className="product-card" style={{ padding: "40px", textAlign: "center" }}>
                    <h4 style={{ color: "var(--text-muted)", fontSize: "0.8rem", textTransform: "uppercase" }}>Commandes Réalisées</h4>
                    <h2 style={{ fontSize: "2.5rem" }}>{orders.length}</h2>
                </div>
                <div className="product-card" style={{ padding: "40px", textAlign: "center" }}>
                    <h4 style={{ color: "var(--text-muted)", fontSize: "0.8rem", textTransform: "uppercase" }}>Articles en Stock</h4>
                    <h2 style={{ fontSize: "2.5rem" }}>{totalStock}</h2>
                </div>
            </div>
        </div>
    );
}
