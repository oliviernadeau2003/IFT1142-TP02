// Olivier Nadeau - IFT1142 Hiver 2025
// services.js - 15 Février
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../../donnees/livres.json');
let data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
let tabLivres = data.livres;

// Update json data file
function sauvegarder() {
    fs.writeFileSync(dataPath, JSON.stringify({ categories: data.categories, livres: tabLivres }, null, 4), 'utf8');
}

//* - Fonctions CRUD -

//* Create
function ajouterLivre(nouveauLivre) {
    // Vérification si l'id du livre existe déjà
    let existeDeja = tabLivres.some(livre => livre.id === nouveauLivre.id);
    if (existeDeja) {
        throw new Error("Un livre avec cet ID existe déjà.");
    }

    // Ajouter le livre dans le tableau
    tabLivres.push(nouveauLivre);

    // Sauvegarde les changements dans le fichier JSON
    sauvegarder();

    console.log('Livre ajouté avec succès.');
}

//* Read


//* Update


//* Delete
function supprimerLivre(idLivre) {
    let indexLivre = tabLivres.findIndex((livre) => livre.id === parseInt(idLivre));

    if (indexLivre === -1) {
        throw new Error("Livre Introuvable");
    }

    tabLivres.splice(indexLivre, 1);
    sauvegarder();  // Sauvegarde dans le fichier JSON
    console.log('\nLivre supprimé avec succès.');
}


module.exports = { ajouterLivre, supprimerLivre };