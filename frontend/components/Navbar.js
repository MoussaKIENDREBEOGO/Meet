
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Sun, Moon, ArrowLeft } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useCart } from "@/context/CartContext";

export default function Navbar({ showBack = false }) {
    const { theme, toggleTheme } = useTheme();
    const { cart, setIsCartOpen } = useCart();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container nav">
                {showBack ? (
                    <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "600", color: "var(--accent)" }}>
                        <ArrowLeft size={20} /> Retour
                    </Link>
                ) : (
                    <div className="logo" style={{ display: "flex", alignItems: "center" }}>
                        <Link href="/">
                            <img
                                src={theme === "dark" ? "/images/logo-premium.png" : "/images/logo-premium-light.png"}
                                alt="Mamichic Logo"
                                style={{ height: isScrolled ? "60px" : "80px", width: "auto", objectFit: "contain", transition: "height 0.3s ease" }}
                            />
                        </Link>
                    </div>
                )}

                {showBack && (
                    <div className="logo" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
                        <Link href="/">
                            <img
                                src={theme === "dark" ? "/images/logo-premium.png" : "/images/logo-premium-light.png"}
                                alt="Mamichic Logo"
                                style={{ height: "60px", width: "auto" }}
                            />
                        </Link>
                    </div>
                )}

                <div className="nav-actions">
                    <button className="theme-toggle" onClick={toggleTheme} title="Changer le thème">
                        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button className="cart-trigger" onClick={() => setIsCartOpen(true)}>
                        <ShoppingCart size={20} />
                        {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
                    </button>
                </div>
            </div>
        </header>
    );
}
