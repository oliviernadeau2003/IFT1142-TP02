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
function getLivre(idLivre) {
    // Trouver l'index du livre
    const indexLivre = tabLivres.findIndex(livre => livre.id === parseInt(idLivre));
    return tabLivres[indexLivre];
}

//* Update
function modifierLivre(idLivre, updatedData) {
    // Trouver l'index du livre à mettre à jour
    const indexLivre = tabLivres.findIndex(livre => livre.id === parseInt(idLivre));

    if (indexLivre === -1) {
        throw new Error("Livre introuvable");
    }

    // Mettre à jour les propriétés du livre
    const livreExist = tabLivres[indexLivre];
    const updatedLivre = { ...livreExist, ...updatedData }; // Combine les données existantes avec les nouvelles données

    // Remplacer l'ancien livre par le nouveau livre modifié
    tabLivres[indexLivre] = updatedLivre;

    // Sauvegarder les modifications dans le fichier JSON
    sauvegarder();
    console.log('Livre modifié avec succès.');
}

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

//* Autres

function getNextId() {
    // Trouver l'ID le plus élevé dans la liste des livres
    const ids = tabLivres.map(livre => livre.id); // Extraire tous les IDs des livres
    const maxId = ids.length > 0 ? Math.max(...ids) : 0; // Trouver l'ID maximum ou 0 si aucun livre

    // Le prochain ID est simplement l'ID maximum + 1
    return maxId + 1;
}

module.exports = { getLivre, ajouterLivre, supprimerLivre, modifierLivre, getNextId };