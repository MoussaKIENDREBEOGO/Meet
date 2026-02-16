#!/bin/bash

# Script de renommage des images pour Mamichic
# Ce script renomme les images avec des noms simplifiés

cd "$(dirname "$0")/public/image" || exit 1

echo "🔄 Début du renommage des images..."

# Renommer les pagnes (image copy X.png -> pagneX.png)
mv "image copy 1 1.png" "pagne1.png" 2>/dev/null && echo "✓ pagne1.png"
mv "image copy2 1.png" "pagne2.png" 2>/dev/null && echo "✓ pagne2.png"
mv "image copy 2.png" "pagne3.png" 2>/dev/null && echo "✓ pagne3.png"
mv "image copy 3.png" "pagne4.png" 2>/dev/null && echo "✓ pagne4.png"
mv "image copy 4.png" "pagne5.png" 2>/dev/null && echo "✓ pagne5.png"
mv "image copy 5.png" "pagne6.png" 2>/dev/null && echo "✓ pagne6.png"
mv "image copy 6.png" "pagne7.png" 2>/dev/null && echo "✓ pagne7.png"
mv "image copy 7.png" "pagne8.png" 2>/dev/null && echo "✓ pagne8.png"
mv "image copy 8.png" "pagne9.png" 2>/dev/null && echo "✓ pagne9.png"
mv "image copy 9.png" "pagne10.png" 2>/dev/null && echo "✓ pagne10.png"
mv "image copy 10.png" "pagne11.png" 2>/dev/null && echo "✓ pagne11.png"
mv "image copy 11.png" "pagne12.png" 2>/dev/null && echo "✓ pagne12.png"
mv "image copy 12.png" "pagne13.png" 2>/dev/null && echo "✓ pagne13.png"
mv "image copy 13.png" "pagne14.png" 2>/dev/null && echo "✓ pagne14.png"
mv "image copy 14.png" "pagne15.png" 2>/dev/null && echo "✓ pagne15.png"
mv "image copy 15.png" "pagne16.png" 2>/dev/null && echo "✓ pagne16.png"
mv "image copy 16.png" "pagne17.png" 2>/dev/null && echo "✓ pagne17.png"
mv "image copy 17.png" "pagne18.png" 2>/dev/null && echo "✓ pagne18.png"
mv "image copy.png" "pagne19.png" 2>/dev/null && echo "✓ pagne19.png"
mv "image.png" "pagne20.png" 2>/dev/null && echo "✓ pagne20.png"
mv "image copy 21.png" "pagne21.png" 2>/dev/null && echo "✓ pagne21.png"
mv "image copy 18.png" "pagne22.png" 2>/dev/null && echo "✓ pagne22.png"

# Renommer les chaussures
mv "chaussure élégante.png" "chaussure1.png" 2>/dev/null && echo "✓ chaussure1.png"
mv "talon.png" "chaussure2.png" 2>/dev/null && echo "✓ chaussure2.png"

# Renommer les robes
mv "ebcore une robe.png" "robe1.png" 2>/dev/null && echo "✓ robe1.png"
mv "robe chic.png" "robe2.png" 2>/dev/null && echo "✓ robe2.png"
mv "encore robe chic.jpg" "robe3.png" 2>/dev/null && echo "✓ robe3.png (converti de .jpg)"

# Renommer le sac
mv "bedou.jpg" "bedou1.png" 2>/dev/null && echo "✓ bedou1.png (converti de .jpg)"

# Renommer les bijoux/autres
mv "image copy 20.png" "autre1.png" 2>/dev/null && echo "✓ autre1.png"
mv "mixte traditionnel.png" "autre2.png" 2>/dev/null && echo "✓ autre2.png"

echo ""
echo "✅ Renommage terminé !"
echo "📋 Liste des fichiers renommés :"
ls -1 | grep -E "^(pagne|chaussure|robe|bedou|autre)[0-9]"
