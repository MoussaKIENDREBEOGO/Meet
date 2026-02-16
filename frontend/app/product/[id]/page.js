
"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, Check, ShieldCheck, Truck, RefreshCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import CartPanel from "@/components/CartPanel";
import ProductCard from "@/components/ProductCard";

export default function ProductPage({ params: paramsPromise }) {
    const params = use(paramsPromise);
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addedToCart, setAddedToCart] = useState(false);
    const [toast, setToast] = useState({ show: false, message: "" });
    const { addToCart } = useCart();
    const { theme } = useTheme();

    const showToast = (message) => {
        setToast({ show: true, message });
        setTimeout(() => setToast({ show: false, message: "" }), 3000);
    };

    useEffect(() => {
        fetch(`http://localhost:5000/api/products/${params.id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
                setLoading(false);
                // Fetch related products
                fetch("http://localhost:5000/api/products")
                    .then(res => res.json())
                    .then(all => {
                        if (Array.isArray(all)) {
                            const filtered = all
                                .filter(p => p.category === data.category && p._id !== data._id)
                                .slice(0, 4);
                            setRelatedProducts(filtered);
                        }
                    });
            })
            .catch((err) => {
                console.error("Erreur:", err);
                setLoading(false);
            });
    }, [params.id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product);
            setAddedToCart(true);
            showToast(`${product.name} ajouté au panier !`);
            setTimeout(() => setAddedToCart(false), 2000);
        }
    };

    if (loading) return (
        <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--background)" }}>
            <div className="skeleton" style={{ width: "60px", height: "60px", borderRadius: "50%" }}></div>
        </div>
    );

    if (!product) return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "var(--background)", color: "var(--foreground)" }}>
            <h2>Produit introuvable</h2>
            <Link href="/" className="btn-buy" style={{ marginTop: "20px" }}>Retour à l'accueil</Link>
        </div>
    );

    return (
        <main style={{ minHeight: "100vh", background: "var(--background)", color: "var(--foreground)" }}>
            <div className={`toast ${toast.show ? 'show' : ''} `}>{toast.message}</div>

            <Navbar showBack={true} />
            <CartPanel />

            <div className="container" style={{ padding: "120px 20px 60px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "60px", alignItems: "start" }}>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{ position: "relative" }}
                    >
                        <div style={{
                            borderRadius: "var(--radius)",
                            overflow: "hidden",
                            boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
                            border: "1px solid var(--glass-border)",
                            aspectRatio: "1/1",
                            background: "var(--card-bg)"
                        }}>
                            <img
                                src={product.image.startsWith('/') ? product.image : `/${product.image}`}
                                alt={product.name}
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                        </div>
                        {product.countInStock < 5 && product.countInStock > 0 && (
                            <div style={{
                                position: "absolute",
                                top: "20px",
                                right: "20px",
                                background: "#ff9800",
                                color: "#000",
                                padding: "8px 16px",
                                borderRadius: "99px",
                                fontWeight: "700",
                                fontSize: "0.8rem"
                            }}>
                                STOCK LIMITÉ
                            </div>
                        )}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <span className="product-category" style={{ fontSize: "1rem" }}>{product.category}</span>
                        <h1 style={{ fontSize: "3.5rem", marginBottom: "16px", lineHeight: "1.1" }}>{product.name}</h1>
                        <p style={{ fontSize: "2rem", color: "var(--accent)", fontWeight: "700", marginBottom: "32px" }}>
                            {product.price.toLocaleString()} FCFA
                        </p>

                        <div style={{ color: "var(--text-muted)", fontSize: "1.1rem", marginBottom: "40px", lineHeight: "1.8", fontWeight: "300" }}>
                            {product.description}
                        </div>

                        <div style={{ display: "flex", gap: "16px", marginBottom: "40px" }}>
                            <button
                                className="btn-checkout"
                                style={{
                                    flex: 1,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "12px",
                                    background: addedToCart ? "#4caf50" : "var(--accent)",
                                    transition: "0.3s"
                                }}
                                onClick={handleAddToCart}
                                disabled={product.countInStock === 0}
                            >
                                {addedToCart ? <><Check size={20} /> Ajouté !</> : <><ShoppingCart size={20} /> Ajouter au Panier</>}
                            </button>
                        </div>

                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "20px",
                            paddingTop: "40px",
                            borderTop: "1px solid var(--glass-border)"
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--text-muted)" }}>
                                <ShieldCheck size={24} style={{ color: "var(--accent)" }} />
                                <span style={{ fontSize: "0.9rem" }}>Qualité Premium Garantie</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--text-muted)" }}>
                                <Truck size={24} style={{ color: "var(--accent)" }} />
                                <span style={{ fontSize: "0.9rem" }}>Livraison sous 24h-48h</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--text-muted)" }}>
                                <RefreshCcw size={24} style={{ color: "var(--accent)" }} />
                                <span style={{ fontSize: "0.9rem" }}>Retours Acceptés</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {relatedProducts.length > 0 && (
                    <section style={{ marginTop: "100px" }}>
                        <h2 style={{ fontSize: "2.5rem", marginBottom: "40px" }}>Complétez votre style</h2>
                        <div className="product-grid">
                            {relatedProducts.map(p => (
                                <ProductCard key={p._id} product={p} showToast={showToast} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
}
