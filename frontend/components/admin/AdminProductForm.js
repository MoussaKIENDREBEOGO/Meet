
"use client";

export default function AdminProductForm({
    isEditing,
    productForm,
    setProductForm,
    handleProductSubmit,
    availableImages
}) {
    return (
        <div style={{ maxWidth: "850px", margin: "0 auto" }}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", marginBottom: "40px", textAlign: "center" }}>
                {isEditing ? "Édition de l'Article" : "Nouvelle Création Luxury"}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "40px" }}>
                <form onSubmit={handleProductSubmit} className="product-card" style={{ padding: "35px", display: "grid", gap: "18px" }}>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Nom de l'article"
                        value={productForm.name}
                        onChange={e => setProductForm({ ...productForm, name: e.target.value })}
                        required
                    />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                        <input
                            type="number"
                            className="search-input"
                            placeholder="Prix (FCFA)"
                            value={productForm.price}
                            onChange={e => setProductForm({ ...productForm, price: e.target.value })}
                            required
                        />
                        <input
                            type="number"
                            className="search-input"
                            placeholder="Stock"
                            value={productForm.countInStock}
                            onChange={e => setProductForm({ ...productForm, countInStock: e.target.value })}
                            required
                        />
                    </div>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Chemin Image"
                        value={productForm.image}
                        readOnly
                    />
                    <textarea
                        className="search-input"
                        placeholder="Description"
                        style={{ height: "100px" }}
                        value={productForm.description}
                        onChange={e => setProductForm({ ...productForm, description: e.target.value })}
                        required
                    />
                    <button className="btn-buy" style={{ padding: "18px" }}>Sauvegarder</button>
                </form>
                <div className="product-card" style={{ padding: "25px", overflowY: "auto", maxHeight: "550px" }}>
                    <h4 style={{ marginBottom: "15px", color: "var(--accent)" }}>SÉLECTEUR D'IMAGE</h4>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                        {availableImages.map(imgName => (
                            <div
                                key={imgName}
                                onClick={() => setProductForm({ ...productForm, image: `images/${imgName}` })}
                                style={{
                                    cursor: "pointer",
                                    borderRadius: "8px",
                                    overflow: "hidden",
                                    border: productForm.image === `images/${imgName}` ? "2px solid var(--accent)" : "1px solid transparent"
                                }}
                            >
                                <img src={`/images/${imgName}`} style={{ width: "100%", height: "80px", objectFit: "cover" }} alt={imgName} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
