
"use client";

export default function AdminTeam({ users, user, userForm, setUserForm, handleUserSubmit, deleteUser }) {
    return (
        <div style={{ maxWidth: "800px" }}>
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", marginBottom: "40px" }}>Gestion de l'Équipe</h1>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
                <div className="product-card" style={{ padding: "30px" }}>
                    <h3 style={{ marginBottom: "20px", color: "var(--accent)" }}>Nouvel Admin</h3>
                    <form onSubmit={handleUserSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                        <input
                            type="text"
                            placeholder="Username"
                            className="search-input"
                            value={userForm.username}
                            onChange={e => setUserForm({ ...userForm, username: e.target.value })}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="search-input"
                            value={userForm.password}
                            onChange={e => setUserForm({ ...userForm, password: e.target.value })}
                            required
                        />
                        <select
                            className="search-input"
                            value={userForm.role}
                            onChange={e => setUserForm({ ...userForm, role: e.target.value })}
                            style={{ background: "#222", color: "white" }}
                        >
                            <option value="admin">Admin</option>
                            <option value="superadmin">SuperAdmin</option>
                        </select>
                        <button className="btn-buy">Ajouter à l'équipe</button>
                    </form>
                </div>

                <div className="product-card" style={{ padding: "30px" }}>
                    <h3 style={{ marginBottom: "20px" }}>Membres Actuels</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {users.map(u => (
                            <div key={u._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", borderBottom: "1px solid var(--glass-border)" }}>
                                <div>
                                    <p style={{ fontWeight: "600" }}>{u.username}</p>
                                    <p style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{u.role}</p>
                                </div>
                                {u.username !== user?.username && (
                                    <button
                                        onClick={() => deleteUser(u._id)}
                                        style={{ background: "none", border: "none", color: "#f44336", cursor: "pointer", fontSize: "0.8rem" }}
                                    >
                                        Révoquer
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
