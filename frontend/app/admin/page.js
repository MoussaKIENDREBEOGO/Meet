
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminInventory from "@/components/admin/AdminInventory";
import AdminOrders from "@/components/admin/AdminOrders";
import AdminProductForm from "@/components/admin/AdminProductForm";
import AdminStats from "@/components/admin/AdminStats";
import AdminTeam from "@/components/admin/AdminTeam";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loginData, setLoginData] = useState({ username: "", password: "" });
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState("inventory");
    const [isEditing, setIsEditing] = useState(null);
    const [productForm, setProductForm] = useState({
        name: "", price: "", category: "Pagnes", description: "", image: "", countInStock: 10
    });
    const [userForm, setUserForm] = useState({ username: "", password: "", role: "admin" });

    const availableImages = [
        "Pagnes/Pagne traditionnel N°1.png", "Pagnes/Pagne traditionnel N°2.png", "Pagnes/Pagne traditionnel N°3.png",
        "Pagnes/Pagne traditionnel N°4.png", "Pagnes/Pagne traditionnel N°5.png", "Pagnes/Pagne traditionnel N°6.png",
        "Pagnes/Pagne traditionnel N°7.png", "Pagnes/Pagne traditionnel N°8.png", "Pagnes/Pagne traditionnel N°9.png",
        "Pagnes/Pagne traditionnel N°10.png", "Pagnes/Pagne traditionnel N°11.png", "Pagnes/Pagne traditionnel N°12.png",
        "Pagnes/Pagne traditionnel N°13.png", "Pagnes/Pagne traditionnel N°14.png", "Pagnes/Pagne traditionnel N°15.png",
        "Pagnes/Pagne traditionnel N°16.png", "Pagnes/Pagne traditionnel N°17.png", "Pagnes/Pagne traditionnel N°18.png",
        "Pagnes/Pagne traditionnel N°19.png", "Pagnes/Pagne traditionnel N°20.png", "Pagnes/Pagne traditionnel N°21.png",
        "Pagnes/Pagne traditionnel N°22.png",
        "chaussures/chaussure1.png", "chaussures/chaussure2.png",
        "robes/robe1.png", "robes/robe2.png", "robes/robe3.png", "robes/traditional.png",
        "sacs/sac1.png", "sacs/sac2.png",
        "autres/autre1.png", "autres/autre2.png", "autres/autre4.png"
    ];

    useEffect(() => {
        const savedToken = localStorage.getItem("mamichic_admin_token");
        if (savedToken) {
            const savedUser = JSON.parse(localStorage.getItem("mamichic_admin_user"));
            setUser(savedUser);
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchProducts();
            fetchOrders();
            if (user?.role === "superadmin") fetchUsers();
        }
    }, [isAuthenticated, user]);

    const getAuthHeaders = () => {
        const token = localStorage.getItem("mamichic_admin_token");
        return {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };
    };

    const fetchProducts = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/products");
            const data = await res.json();
            setProducts(data);
        } catch (err) { console.error(err); }
    };

    const fetchUsers = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/auth/users", {
                headers: getAuthHeaders()
            });
            const data = await res.json();
            if (res.ok) setUsers(data);
        } catch (err) { console.error(err); }
    };

    const fetchOrders = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/orders", {
                headers: getAuthHeaders()
            });
            const data = await res.json();
            if (res.ok) setOrders(data);
        } catch (err) { console.error(err); }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData)
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem("mamichic_admin_token", data.token);
                localStorage.setItem("mamichic_admin_user", JSON.stringify(data.user));
                setUser(data.user);
                setIsAuthenticated(true);
            } else {
                alert(data.message);
            }
        } catch (err) { alert("Erreur de connexion"); }
    };

    const handleProductSubmit = async (e) => {
        e.preventDefault();
        const url = isEditing
            ? `http://localhost:5000/api/products/${isEditing}`
            : "http://localhost:5000/api/products";
        try {
            const res = await fetch(url, {
                method: isEditing ? "PUT" : "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify(productForm)
            });
            if (res.ok) {
                setIsEditing(null);
                setProductForm({ name: "", price: "", category: "Pagnes", description: "", image: "", countInStock: 10 });
                fetchProducts();
                setActiveTab("inventory");
                alert("✨ Catalogue mis à jour !");
            } else {
                const error = await res.json();
                alert(error.message);
            }
        } catch (err) { alert("Erreur lors de l'enregistrement"); }
    };

    const deleteProduct = async (id) => {
        if (window.confirm("Supprimer ce produit ?")) {
            try {
                const res = await fetch(`http://localhost:5000/api/products/${id}`, {
                    method: "DELETE",
                    headers: getAuthHeaders()
                });
                if (res.ok) fetchProducts();
                else alert("Action refusée");
            } catch (err) { alert("Erreur lors de la suppression"); }
        }
    };

    const handleOrderUpdate = async (id, status) => {
        try {
            const res = await fetch(`http://localhost:5000/api/orders/${id}`, {
                method: "PUT",
                headers: getAuthHeaders(),
                body: JSON.stringify({ status })
            });
            if (res.ok) fetchOrders();
        } catch (err) { alert("Erreur de mise à jour"); }
    };

    const handleUserSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/auth/users", {
                method: "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify(userForm)
            });
            if (res.ok) {
                alert("Nouvel admin créé !");
                setUserForm({ username: "", password: "", role: "admin" });
                fetchUsers();
            } else {
                const error = await res.json();
                alert(error.message);
            }
        } catch (err) { alert("Erreur création utilisateur"); }
    };

    const deleteUser = async (id) => {
        if (window.confirm("Révoquer cet admin ?")) {
            try {
                const res = await fetch(`http://localhost:5000/api/auth/users/${id}`, {
                    method: "DELETE",
                    headers: getAuthHeaders()
                });
                if (res.ok) fetchUsers();
            } catch (err) { alert("Erreur lors de la suppression de l'utilisateur"); }
        }
    };

    const logout = () => {
        localStorage.removeItem("mamichic_admin_token");
        localStorage.removeItem("mamichic_admin_user");
        setIsAuthenticated(false);
        setUser(null);
    };

    if (!isAuthenticated) {
        return (
            <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#020202" }}>
                <div className="product-card" style={{ padding: "50px", maxWidth: "450px", width: "90%", border: "1px solid var(--accent)" }}>
                    <div style={{ textAlign: "center", marginBottom: "40px" }}>
                        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", color: "var(--accent)" }}>MAMICHIC</h1>
                        <p style={{ color: "var(--text-muted)", letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "0.7rem" }}>Console d'Accès Admin</p>
                    </div>
                    <form onSubmit={handleLogin}>
                        <input
                            type="text" placeholder="Identifiant" className="search-input"
                            style={{ width: "100%", marginBottom: "15px" }}
                            value={loginData.username} onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                        />
                        <input
                            type="password" placeholder="Mot de passe" className="search-input"
                            style={{ width: "100%", marginBottom: "25px" }}
                            value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        />
                        <button className="btn-checkout" style={{ width: "100%", padding: "18px" }}>Se Connecter</button>
                    </form>
                    <div style={{ marginTop: "30px", textAlign: "center" }}>
                        <Link href="/" style={{ color: "var(--text-muted)", fontSize: "0.8rem", textDecoration: "underline" }}>Retour à la boutique</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ background: "#020202", minHeight: "100vh", color: "white", display: "flex" }}>
            <AdminSidebar
                user={user}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setIsEditing={setIsEditing}
                logout={logout}
            />

            <main style={{ marginLeft: "260px", flex: 1, padding: "50px" }}>
                {activeTab === "inventory" && (
                    <AdminInventory
                        products={products}
                        setIsEditing={setIsEditing}
                        setProductForm={setProductForm}
                        setActiveTab={setActiveTab}
                        deleteProduct={deleteProduct}
                    />
                )}

                {activeTab === "orders" && (
                    <AdminOrders
                        orders={orders}
                        handleOrderUpdate={handleOrderUpdate}
                    />
                )}

                {activeTab === "add-product" && (
                    <AdminProductForm
                        isEditing={isEditing}
                        productForm={productForm}
                        setProductForm={setProductForm}
                        handleProductSubmit={handleProductSubmit}
                        availableImages={availableImages}
                    />
                )}

                {activeTab === "sales" && (
                    <AdminStats
                        orders={orders}
                        products={products}
                    />
                )}

                {activeTab === "team" && user?.role === "superadmin" && (
                    <AdminTeam
                        users={users}
                        user={user}
                        userForm={userForm}
                        setUserForm={setUserForm}
                        handleUserSubmit={handleUserSubmit}
                        deleteUser={deleteUser}
                    />
                )}
            </main>
        </div>
    );
}
