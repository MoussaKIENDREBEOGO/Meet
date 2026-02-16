// Liste des produits (sera chargée depuis l'API)
let produits = [];

// Fonction pour récupérer les produits depuis l'API
async function fetchProduits() {
    try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        produits = await response.json();
        afficherProduits();
    } catch (e) {
        console.error("Erreur lors de la récupération des produits :", e);
        sectionProduits.innerHTML = "<p>Impossible de charger les produits. Vérifiez que le serveur backend est lancé.</p>";
    }
}

// Appel initial pour charger les produits
fetchProduits();

const sectionProduits = document.getElementById('produits');
const listePanier = document.getElementById('liste-panier');
const boutonValider = document.getElementById('valider-commande');
// Champs du formulaire de commande WhatsApp (réservé pour de futurs formulaires)
// Helpers URL
function isHttpUrl(url) {
    return /^https?:\/\//i.test(url || '');
}

function toAbsoluteUrl(path) {
    try {
        // new URL avec href courant gère http(s) et file:// pour avoir un chemin absolu
        return new URL(path, window.location.href).href;
    } catch (_) {
        return path;
    }
}
let panier = [];

// Charger les commandes depuis le localStorage au démarrage
let commandes = JSON.parse(localStorage.getItem('commandes')) || [];
// NOTE: Ligne initiale invalide supprimée: "pourquoi le bouton toogle ne marche CSSFontPaletteValuesRule"
// Cette ligne provoquait une erreur de syntaxe et empêchait l'exécution du script.
const sectionCommandes = document.getElementById('commandes'); // Assurez-vous d'avoir une <div id="commandes"></div> dans votre HTML

const imageModal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
let zoomed = false;

// (Pending mechanism removed per latest requirement: we now save immediately on click.)

// Affichage des produits
function afficherProduits() {
    sectionProduits.innerHTML = ''; // Nettoyer l'existant
    produits.forEach((produit, index) => {
        const div = document.createElement('div');
        div.className = 'produit';
        div.innerHTML = `
            <div class="prix">${produit.price} FCFA</div>
            <img src="${produit.image}" alt="${produit.name}" class="img-produit" style="cursor:pointer;" onerror="this.onerror=null; this.src='data:image/gif;base64,R0lGODlhAQABAAAAACw=';">
            <h3>${produit.name}</h3>
            <button onclick="commanderProduit(${index})">Commander</button>
        `;
        sectionProduits.appendChild(div);
    });

    // Réattacher les événements pour la modale après le rendu dynamique
    if (imageModal && modalImg) {
        document.querySelectorAll('.img-produit').forEach(img => {
            img.addEventListener('click', function () {
                modalImg.src = this.src;
                modalImg.style.transform = 'scale(1)';
                zoomed = false;
                imageModal.style.display = 'flex';
            });
        });

        // (Les événements globaux de la modale sont déjà attachés en dehors de cette fonction)
    }
}

// Les événements globaux de la modale (attachés une seule fois)
if (imageModal && modalImg) {
    // Fermer la modale en cliquant en dehors de l'image
    imageModal.addEventListener('click', function (e) {
        if (e.target === imageModal) {
            imageModal.style.display = 'none';
        }
    });

    // Zoom sur l'image en cliquant dessus
    modalImg.addEventListener('click', function () {
        zoomed = !zoomed;
        modalImg.style.transform = zoomed ? 'scale(2)' : 'scale(1)';
        modalImg.style.cursor = zoomed ? 'zoom-out' : 'zoom-in';
    });
}

// Commander directement un produit (sans panier)
window.commanderProduit = function (index) {
    const p = produits[index];
    if (!p) return;

    const dateCommande = new Date();
    const heure = dateCommande.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    const date = dateCommande.toLocaleDateString('fr-FR');

    const abs = toAbsoluteUrl(p.image);
    const ligne = `- ${p.name} - ${p.price} FCFA`;
    const lignesProduits = isHttpUrl(abs) ? `${ligne}\n  Image: ${abs}` : ligne;

    const texte = [
        'Nouvelle commande Mamichic',
        `Date: ${date}  Heure: ${heure}`,
        'Produits:',
        lignesProduits,
        `Total: ${p.price} FCFA`
    ].join('\n');
    const message = encodeURIComponent(texte);
    const numeroVendeur = '22661357833';
    const urlWhatsApp = `https://wa.me/${numeroVendeur}?text=${message}`;

    // Sauvegarder immédiatement la commande (sans confirmation)
    commandes.push({
        produits: [{
            nom: p.name,
            prix: p.price,
            image: p.image,
            image_absolute: toAbsoluteUrl(p.image)
        }],
        date: date,
        heure: heure
    });
    localStorage.setItem('commandes', JSON.stringify(commandes));
    afficherCommandes();

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(texte).catch(() => { /* ignore */ });
    }

    const isMobile = /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);

    // Plus de mécanisme pending: la commande est déjà enregistrée ci-dessus.
    const deepLink = `whatsapp://send?phone=${numeroVendeur}&text=${message}`;
    if (isMobile) {
        const fallbackTimer = setTimeout(() => {
            window.open(urlWhatsApp, '_blank');
        }, 800);
        // Redirection vers l'app WhatsApp (mobile)
        window.location.href = deepLink;
        window.addEventListener('pagehide', () => clearTimeout(fallbackTimer), { once: true });
    } else {
        // Desktop: ouvrir WhatsApp Web dans un nouvel onglet
        window.open(urlWhatsApp, '_blank');
    }
};

// Afficher la liste des commandes enregistrées
function afficherCommandes() {
    if (!sectionCommandes) return;
    if (!Array.isArray(commandes)) commandes = [];

    if (commandes.length === 0) {
        sectionCommandes.innerHTML = '<p>Aucune commande enregistrée.</p>';
        return;
    }

    const html = commandes
        .map((cmd, index) => {
            const produitsHtml = (cmd.produits || [])
                .map(p => {
                    const abs = p.image_absolute || toAbsoluteUrl(p.image || '');
                    const imgSrc = abs || (p.image || '');
                    const imgTag = imgSrc ? `<img src="${imgSrc}" alt="${p.nom}" style="width:40px; height:40px; object-fit:cover; border-radius:6px; box-shadow:0 1px 4px rgba(0,0,0,0.08);">` : '';
                    return `<li style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">${imgTag}<span>${p.nom} - ${p.prix} FCFA</span></li>`;
                })
                .join('');
            const totalCmd = (cmd.produits || []).reduce((acc, p) => acc + (p.prix || 0), 0);
            return `
                <div class="commande-item" style="border:1px solid #eee; padding:10px; border-radius:8px; margin-top:10px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; gap:12px;">
                        <h3 style="margin:0;">Commande du ${cmd.date} à ${cmd.heure}</h3>
                        <button class="supprimer-commande" data-index="${index}" type="button" style="background:#ff4d4f; color:#fff; border:none; padding:6px 10px; border-radius:6px; cursor:pointer;">Supprimer</button>
                    </div>
                    <ul style="margin:6px 0 6px 18px; padding:0; list-style:none;">${produitsHtml}</ul>
                    <p style="margin:0;"><strong>Total:</strong> ${totalCmd} FCFA</p>
                </div>`;
        })
        .join('');
    sectionCommandes.innerHTML = html;
}

// Suppression du flux panier: la commande se fait directement via commanderProduit()

// Délégation d'événement pour la suppression
sectionCommandes.addEventListener('click', function (e) {
    if (e.target.classList.contains('supprimer-commande')) {
        const index = parseInt(e.target.getAttribute('data-index'));
        commandes.splice(index, 1);
        localStorage.setItem('commandes', JSON.stringify(commandes));
        afficherCommandes();
    }
});

// Afficher les commandes au chargement de la page
afficherCommandes();

// =============================
// Thème clair/sombre (toggle)
// =============================
(function () {
    const THEME_KEY = 'theme';

    function applyTheme(theme) {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.setAttribute('data-theme', 'dark');
        } else {
            root.removeAttribute('data-theme');
        }
    }

    function updateToggleUI(theme) {
        const btn = document.getElementById('theme-toggle');
        if (!btn) return;
        const isDark = theme === 'dark';
        btn.setAttribute('aria-pressed', String(isDark));
        const icon = btn.querySelector('.icon');
        if (icon) icon.textContent = isDark ? '☀️' : '🌙';
        btn.title = isDark ? 'Passer en thème clair' : 'Passer en thème sombre';
    }

    function initTheme() {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const saved = localStorage.getItem(THEME_KEY) || (prefersDark ? 'dark' : 'light');
        applyTheme(saved);
        updateToggleUI(saved);

        const btn = document.getElementById('theme-toggle');
        if (btn) {
            btn.addEventListener('click', () => {
                const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
                const next = current === 'dark' ? 'light' : 'dark';
                applyTheme(next);
                updateToggleUI(next);
                localStorage.setItem(THEME_KEY, next);
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }
})();
