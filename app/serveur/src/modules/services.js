// Olivier Nadeau - IFT1142 Hiver 2025
// services.js - 15 Février
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../../donnees/livres.json');
let data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
let tabLivres = data.livres;

function sauvegarder() {
    fs.writeFileSync(dataPath, JSON.stringify({ categories: data.categories, livres: tabLivres }, null, 4), 'utf8');
}

//* - Fonctions CRUD -

//* Create


//* Read


//* Update


//* Delete
function supprimerLivre(idLivre) {
    let indexLivre = tabLivres.findIndex((livre) => livre.id === parseInt(idLivre));

    console.log(idLivre);
    console.log(tabLivres);


    if (indexLivre === -1) {
        console.log('\nLivre introuvable.');
        throw new Error("Livre Introuvable");
    }

    tabLivres.splice(indexLivre, 1);
    sauvegarder();  // Sauvegarde dans le fichier JSON
    console.log('\nLivre supprimé avec succès.');
}


module.exports = { supprimerLivre };