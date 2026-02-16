
import "./globals.css";

export const metadata = {
  title: "Mamichic Luxe | L'élégance africaine & Prêt-à-porter",
  description: "Boutique exclusive de pagnes traditionnels, robes chic et accessoires haut de gamme. Livraison partout au Burkina Faso.",
  keywords: ["mode africaine", "pagne traditionnel", "luxe", "Burkina Faso", "robes chic", "bijoux africains"],
  openGraph: {
    title: "Mamichic Luxe",
    description: "L'excellence de la mode africaine à portée de clic.",
    url: "https://mamichic-luxe.com",
    siteName: "Mamichic Luxury",
    images: [
      {
        url: "/images/logo-premium.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <ThemeProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
