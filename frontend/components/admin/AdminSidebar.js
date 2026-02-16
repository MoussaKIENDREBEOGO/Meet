
"use client";
import Link from "next/link";

export default function AdminSidebar({ user, activeTab, setActiveTab, setIsEditing, logout }) {
    const navBtn = {
        padding: "14px 20px",
        borderRadius: "12px",
        border: "none",
        cursor: "pointer",
        textAlign: "left",
        fontWeight: "600",
        transition: "0.3s",
        fontSize: "0.9rem",
        width: "100%"
    };

    return (
        <aside style={{ width: "260px", background: "#0a0a0a", borderRight: "1px solid var(--glass-border)", padding: "40px 20px", position: "fixed", height: "100vh", zIndex: 10 }}>
            <div style={{ marginBottom: "50px", textAlign: "center" }}>
                <h2 style={{ fontFamily: "var(--font-serif)", color: "var(--accent)", fontSize: "1.8rem" }}>LUXURY CONTROL</h2>
                <p style={{ fontSize: "0.6rem", color: "var(--text-muted)", letterSpacing: "1px" }}>{user?.username} ({user?.role})</p>
            </div>

            <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <button
                    onClick={() => setActiveTab("inventory")}
                    style={{ ...navBtn, background: activeTab === "inventory" ? "var(--accent)" : "transparent", color: activeTab === "inventory" ? "#000" : "#fff" }}
                >
                    📦 Inventaire
                </button>
                <button
                    onClick={() => { setActiveTab("add-product"); setIsEditing(null); }}
                    style={{ ...navBtn, background: activeTab === "add-product" ? "var(--accent)" : "transparent", color: activeTab === "add-product" ? "#000" : "#fff" }}
                >
                    ➕ Nouvelle Pièce
                </button>
                <button
                    onClick={() => setActiveTab("orders")}
                    style={{ ...navBtn, background: activeTab === "orders" ? "var(--accent)" : "transparent", color: activeTab === "orders" ? "#000" : "#fff" }}
                >
                    🧾 Commandes Client
                </button>
                <button
                    onClick={() => setActiveTab("sales")}
                    style={{ ...navBtn, background: activeTab === "sales" ? "var(--accent)" : "transparent", color: activeTab === "sales" ? "#000" : "#fff" }}
                >
                    📈 Statistiques
                </button>
                {user?.role === "superadmin" && (
                    <button
                        onClick={() => setActiveTab("team")}
                        style={{ ...navBtn, background: activeTab === "team" ? "var(--accent)" : "transparent", color: activeTab === "team" ? "#000" : "#fff" }}
                    >
                        👥 Équipe Admin
                    </button>
                )}
                <div style={{ margin: "20px 0", borderTop: "1px solid var(--glass-border)" }}></div>
                <Link href="/" style={{ ...navBtn, textDecoration: "none", textAlign: "center", display: "block", color: "#fff" }}>
                    🏠 Vue Boutique
                </Link>
            </nav>

            <button
                onClick={logout}
                style={{ position: "absolute", bottom: "40px", left: "20px", right: "20px", padding: "12px", borderRadius: "10px", background: "rgba(244, 67, 54, 0.1)", color: "#f44336", border: "1px solid #f44336", cursor: "pointer", fontSize: "0.8rem" }}
            >
                Déconnexion
            </button>
        </aside>
    );
}
