// Olivier Nadeau - IFT1142 Hiver 2025
// services.js - 15 Février

//* Fonctions CRUD -

import { question } from "readline-sync";

//* Read
export const afficherLivres = (tabLivres, categorie) => {

    // Afficher l'entête
    if (!categorie) {   // Avec catégorie
        console.log('\n');
        console.log("LISTE DES LIVRES".padStart(63));
        console.log("ID   Titre".padEnd(65) + "IdAuteur  Année  Pages  Catégorie");
    } else {            // Sans catégorie
        console.log('\n');
        console.log(`LISTE DES LIVRES DE LA CATÉGORIE ${categorie.toUpperCase()}`.padStart(63));
        console.log("ID   Titre".padEnd(65) + "IdAuteur  Année  Pages");
    }
    console.log("-".repeat(105));

    // Afficher données du livre
    if (!categorie) {   // Avec catégorie
        tabLivres.forEach((livre) => {
            console.log(
                livre.id.toString().padEnd(5) +
                livre.titre.padEnd(60) +
                livre.idAuteur.toString().padEnd(10) +
                livre.annee.toString().padEnd(7) +
                livre.pages.toString().padEnd(7) +
                livre.categorie.padEnd(15)
            );
        });
    } else {    // Sans catégorie
        tabLivres.forEach((livre) => {
            console.log(
                livre.id.toString().padEnd(5) +
                livre.titre.padEnd(60) +
                livre.idAuteur.toString().padEnd(10) +
                livre.annee.toString().padEnd(7) +
                livre.pages.toString().padEnd(7)
            );
        });
    }

    console.log("-".repeat(105));
    console.log(`\nNombre de livres : ${tabLivres.length}`);
};

//* Create
export const ajouterLivre = (tabLivres) => {

    console.log('\nEntrée les données du nouveau livre :');
    // Récuperer les données
    let id = tabLivres[tabLivres.length - 1].id + 1;
    let titre = question('Titre : ');
    let idAuteur = question('idAuteur : ');
    let annee = question('Année : ');
    let pages = question('Pages : ');
    let categorie = question('Catégorie : ');

    // Créer un nouveau livre
    const nouveauLivre = {
        id: parseInt(id),
        titre: titre,
        idAuteur: parseInt(idAuteur) || '',
        annee: parseInt(annee) || '',
        pages: parseInt(pages) || '',
        categorie: categorie
    }

    // Ajouter le nouveau livre a la liste
    tabLivres.push(nouveauLivre);
    console.log('\nLivre ajouté avec succès');
}

//* Update
export const modifierLivre = (tabLivres) => {
    // Récupérer l'index
    let idLivre = parseInt(question('\nId du livre à modifier : '));
    let indexLivre = tabLivres.findIndex((livre) => livre.id === idLivre);

    // Si le livre n'existe pas
    if (indexLivre === -1) {
        console.log('\nLivre introuvable.');
        return;
    }

    let livre = tabLivres[indexLivre]
    afficherDetailsLivre(livre);

    console.log('\n* Entrez une nouvelle valeur ou appuyez sur <Entrée> pour conserver la valeur actuelle. *\n');

    // Demander les nouvelles données du livre
    let titre = question(`Titre (${livre.titre}) : `);
    let idAuteur = parseInt(question(`idAuteur (${livre.idAuteur}): `));
    let annee = parseInt(question(`Année (${livre.annee}): `));
    let pages = parseInt(question(`Pages (${livre.pages}): `));
    let categorie = question(`Catégorie (${livre.categorie}): `);

    // Changer les données du livre
    livre.titre = titre || livre.titre;
    livre.idAuteur = idAuteur || livre.idAuteur;
    livre.annee = annee || livre.annee;
    livre.pages = pages || livre.pages;
    livre.categorie = categorie || livre.categorie;

    console.log('\nDonnées modifier avec succès');
}

//* Delete
export const supprimerLivre = (tabLivres) => {
    // Récupérer l'index
    let idLivre = parseInt(question('\nId du livre à supprimer : '));
    let indexLivre = tabLivres.findIndex((livre) => livre.id === idLivre);

    // Si le livre n'existe pas
    if (indexLivre === -1) {
        console.log('\nLivre introuvable.');
        return;
    }

    let livre = tabLivres[indexLivre]
    afficherDetailsLivre(livre);

    console.log('\nVoulez-vous vraiment supprimer ce livre ?');

    // Confirmation du choix
    let choix = question("\nVotre choix (O - N) : ");
    if (choix.toUpperCase() === 'N') {
        console.log('\nSuppression annulée');
        return;
    }

    // Suppression du livre
    tabLivres.splice(indexLivre, 1);
    console.log('\nLivre supprimer avec succès');
}

// * Fin des fonctions CRUD -

// * Recherche
export const rechercherParCategorie = (tabLivres) => {
    let categorie = question('\nEntrez la catégorie à afficher : ');
    let resultat = tabLivres.filter((livre) => livre.categorie.localeCompare(categorie) === 0);
    afficherLivres(resultat, categorie);
}

export const rechercherParAnnee = (tabLivres) => {
    let annee = question('\nEntrez l\'année à afficher : ');
    let resultat = tabLivres.filter((livre) => livre.annee === parseInt(annee));
    afficherLivres(resultat);
}

export const rechercherParAuteur = (tabLivres) => {
    let idAuteur = question('\nEntrez l\'ID de l\'auteur à afficher : ');
    let resultat = tabLivres.filter((livre) => livre.idAuteur === parseInt(idAuteur));
    afficherLivres(resultat);
}

// * Autres -

// Trouver le prochain Id
export const trouverProchainId = (tabLivres) => { return tabLivres[tabLivres.length - 1].id + 1 }

// Afficher les informations d'un seul livre
const afficherDetailsLivre = (livre) => {
    console.log("\nInformations du livre :");
    for (let prop in livre) {
        console.log(`${prop} : ${livre[prop]}`);
    }
};