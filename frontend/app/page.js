"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import CartPanel from "@/components/CartPanel";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState(["Tous"]);
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const { theme } = useTheme();
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  // Initialisation des données
  useEffect(() => {
    // Produits
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        const uniqueCats = ["Tous", ...new Set(data.map(p => p.category))];
        setCategories(uniqueCats);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur:", err);
        setLoading(false);
      });
  }, []);

  // Logique de filtrage et recherche combinée
  useEffect(() => {
    let result = products;
    if (activeCategory !== "Tous") {
      result = result.filter(p => p.category === activeCategory);
    }
    if (searchQuery) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredProducts(result);
  }, [activeCategory, searchQuery, products]);

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  return (
    <main>
      <div className={`toast ${toast.show ? 'show' : ''} `}>{toast.message}</div>

      <Navbar />
      <CartPanel showToast={showToast} />

      <section className="hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container"
        >
          <h1>L'Élégance Africaine</h1>
          <p>La référence du luxe et de la tradition. Trouvez votre style unique.</p>
        </motion.div>
      </section>

      <div className="container" style={{ marginTop: "-30px", position: "relative", zIndex: 10 }}>
        <div className="search-container">
          <span className="search-icon"><Search size={18} /></span>
          <input
            type="text"
            className="search-input"
            placeholder="Rechercher un produit..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="category-strip">
          {categories.map(cat => (
            <button
              key={cat}
              className={`category - btn ${activeCategory === cat ? 'active' : ''} `}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="product-grid">
          <AnimatePresence mode="popLayout">
            {loading ? (
              [1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="product-card skeleton-card skeleton"></div>
              ))
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} showToast={showToast} />
              ))
            ) : (
              <div style={{ textAlign: "center", gridColumn: "1/-1", padding: "60px", color: "var(--text-muted)" }}>
                Aucun produit ne correspond à votre recherche.
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* About Section */}
      <section style={{ padding: "100px 0", background: "var(--background)", overflow: "hidden" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "60px", alignItems: "center" }}>
          <div className="about-image" style={{ position: "relative" }}>
            <img
              src="/images/pagne_premium.png"
              alt="Artisanal Work"
              style={{ width: "100%", borderRadius: "var(--radius)", filter: "sepia(0.1) brightness(0.9)" }}
            />
            <div style={{
              position: "absolute",
              bottom: "-20px",
              right: "-20px",
              background: "var(--accent)",
              padding: "40px",
              borderRadius: "var(--radius)",
              color: "#000",
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
              textAlign: "center"
            }}>
              <h4 style={{ fontSize: "2.5rem", fontFamily: "var(--font-serif)", lineHeight: "1" }}>15+</h4>
              <p style={{ fontWeight: "700", textTransform: "uppercase", fontSize: "0.8rem", letterSpacing: "0.1em" }}>Années d'Excellence</p>
            </div>
          </div>
          <div className="about-text">
            <span className="product-category">Notre Histoire</span>
            <h2 style={{ fontSize: "3.5rem", marginBottom: "24px", lineHeight: "1.2" }}>La Passion du Luxe Authentique</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "1.2rem", marginBottom: "32px", fontWeight: "300" }}>
              Depuis plus de 15 ans, Mamichic s'efforce de sublimer la femme africaine en sélectionnant
              les pagnes les plus fins et en créant des pièces uniques qui marient tradition et modernité.
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", fontWeight: "300" }}>
              Chaque pièce de notre collection est une œuvre d'art, choisie pour sa qualité exceptionnelle
              et son histoire. Nous croyons que le luxe réside dans les détails et l'engagement envers l'artisanat pur.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "120px 0", background: "var(--secondary)", position: "relative" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span className="product-category">Témoignages</span>
          <h2 style={{ fontSize: "3.5rem", marginBottom: "80px" }}>L'Expérience de nos Clientes</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px" }}>
            {[
              { name: "Fatou B.", city: "Ouagadougou", text: "La qualité du pagne est tout simplement incroyable. On sent la différence dès le premier toucher. Le service est digne d'une grande maison de couture.", stars: 5 },
              { name: "Mariam S.", city: "Bobo-Dioulasso", text: "J'ai commandé ma robe de soirée via WhatsApp et j'ai été livrée en un temps record. La coupe est impéccable et les finitions sont parfaites.", stars: 5 },
              { name: "Awa K.", city: "Abidjan", text: "Mamichic est ma référence absolue. Les motifs sont uniques et la présentation des produits est magnifique. Une fierté africaine.", stars: 5 }
            ].map((rev, i) => (
              <div key={i} className="product-card" style={{ padding: "50px 40px", textAlign: "left", background: "var(--card-bg)" }}>
                <div style={{ color: "var(--accent)", marginBottom: "25px", fontSize: "1.4rem" }}>
                  {"★".repeat(rev.stars)}
                </div>
                <p style={{ fontStyle: "italic", marginBottom: "40px", color: "var(--foreground)", fontSize: "1.1rem", lineHeight: "1.8", fontWeight: "300" }}>"{rev.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                  <div style={{ width: "45px", height: "45px", borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justify: "center", fontWeight: "700", color: "#000" }}>
                    {rev.name.split(' ')[0][0]}
                  </div>
                  <div>
                    <p style={{ fontWeight: "700", color: "var(--foreground)" }}>{rev.name}</p>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{rev.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section style={{ padding: "100px 0", background: "var(--background)", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: "600px" }}>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "16px" }}>Rejoignez le Cercle Privé</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "32px", fontSize: "1.1rem" }}>
            Recevez nos nouvelles collections et nos invitations exclusives directement dans votre boîte mail.
          </p>
          {!newsletterSubmitted ? (
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="email"
                placeholder="votre@email.com"
                className="search-input"
                style={{ borderRadius: "var(--radius)", flex: 1 }}
                id="newsletter-email"
              />
              <button
                className="btn-buy"
                style={{ padding: "0 30px" }}
                onClick={() => {
                  const email = document.getElementById('newsletter-email').value;
                  if (email) {
                    setNewsletterSubmitted(true);
                    showToast("Merci pour votre inscription !");
                  } else {
                    showToast("Veuillez entrer une adresse mail.");
                  }
                }}
              >
                S'inscrire
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                padding: "20px",
                background: "rgba(229, 192, 92, 0.1)",
                borderRadius: "var(--radius)",
                border: "1px solid var(--accent)",
                color: "var(--accent)",
                fontWeight: "600"
              }}
            >
              ✨ Bienvenue dans le cercle privé Mamichic !
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "100px 0 40px", borderTop: "1px solid var(--border)", textAlign: "center", background: "var(--secondary)" }}>
        <div className="container">
          <img
            src={theme === "dark" ? "/images/logo-premium.png" : "/images/logo-premium-light.png"}
            alt="Mamichic Logo"
            style={{ height: "120px", width: "auto", marginBottom: "40px", objectFit: "contain" }}
          />

          {/* Social Links with Icons */}
          <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "40px" }}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", display: "flex", alignItems: "center", gap: "8px", textTransform: "uppercase", fontSize: "0.8rem", letterSpacing: "0.1em", fontWeight: "600" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.598 1.323-1.325V1.325C24 .597 23.403 0 22.675 0z" /></svg>
              Facebook
            </a>
            <a href="https://wa.me/22661357833" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", display: "flex", alignItems: "center", gap: "8px", textTransform: "uppercase", fontSize: "0.8rem", letterSpacing: "0.1em", fontWeight: "600" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
              WhatsApp
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", display: "flex", alignItems: "center", gap: "8px", textTransform: "uppercase", fontSize: "0.8rem", letterSpacing: "0.1em", fontWeight: "600" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.03 2.61-.01 3.91-.01.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.27 2.8-.88 4.08-.93 1.94-2.82 3.29-4.97 3.66-2.15.37-4.49-.19-6.17-1.6-2.02-1.73-2.84-4.66-2.02-7.14.73-2.16 2.72-3.83 5-4.04.16-.02.33-.03.49-.03.01 4.2-.01 4.11-.01 4.11-.79.05-1.57.49-1.95 1.2-.46.7-.55 1.6-.33 2.39.22.8.8 1.46 1.56 1.74.76.28 1.6.21 2.3-.2.63-.37 1.05-.98 1.21-1.68.12-.5.14-1.01.12-1.52l-.04-14.71z" /></svg>
              TikTok
            </a>
          </div>

          <p style={{ color: "var(--text-muted)", marginBottom: "30px", maxWidth: "400px", margin: "0 auto 30px" }}>
            Ouagadougou, Burkina Faso<br />
            contact@mamichic-luxe.com<br />
            +226 61 35 78 33
          </p>

          <div style={{ padding: "30px 0", borderTop: "1px solid var(--glass-border)", marginTop: "20px" }}>
            <p style={{ color: "var(--foreground)", fontSize: "0.9rem", fontWeight: "600", marginBottom: "8px" }}>
              Platform Design & Development by
              <a href="https://www.linkedin.com/in/moussa-kiendrebeogo/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", marginLeft: "5px", textDecoration: "underline" }}>
                Moussa KIENDREBEOGO
              </a>
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
              Contact: <a href="tel:+22665913840" style={{ color: "inherit" }}>+226 65 91 38 40</a> |
              <Link href="/admin" style={{ marginLeft: "5px", textDecoration: "none", color: "inherit", opacity: 0.5 }}> Admin</Link>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
