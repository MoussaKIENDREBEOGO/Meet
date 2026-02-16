
"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product, showToast }) {
    const { addToCart } = useCart();

    const handleAddToCart = (e) => {
        e.preventDefault(); // Prevent navigating to product page when clicking buy button
        e.stopPropagation();
        addToCart(product);
        if (showToast) showToast(`${product.name} ajouté !`);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="product-card"
        >
            <Link href={`/product/${product._id}`}>
                <img
                    src={product.image.startsWith('/') ? product.image : `/${product.image}`}
                    alt={product.name}
                    className="product-image"
                />
            </Link>
            <div className="product-info">
                <span className="product-category">{product.category}</span>
                <Link href={`/product/${product._id}`}>
                    <h3 className="product-name">{product.name}</h3>
                </Link>
                <div className="product-footer">
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span className="product-price">{product.price.toLocaleString()} FCFA</span>
                        <span style={{
                            fontSize: "0.8rem",
                            color: product.countInStock > 0 ? (product.countInStock < 5 ? "#ff9800" : "#4caf50") : "#f44336",
                            fontWeight: "500"
                        }}>
                            {product.countInStock > 5 ? "En stock" : (product.countInStock > 0 ? `Plus que ${product.countInStock}!` : "Rupture")}
                        </span>
                    </div>
                    <button
                        className="btn-buy"
                        onClick={handleAddToCart}
                        disabled={product.countInStock === 0}
                    >
                        {product.countInStock === 0 ? "Épuisé" : "+ Panier"}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
