// ********************* CRÉATION DU SERVEUR NODE ************************
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const { listerLivre } = require("./app/serveur/src/modules/services");

const app = express();
const port = 3000;
const serveur = http.createServer(app);
serveur.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});

app.use(express.static(__dirname + "/app/client")); //to get also css, js, images, ...
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.text()); // support text encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// ********************* GESTION DES ROUTES ************************
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/app/client/index.html");
});

app.get("/json", (req, res) => {
  res.header("Content-type", "application/json");
  res.header("Charset", "utf8");
  res.sendFile(__dirname + "/app/serveur/donnees/livres.json");
});

app.get("/pochettes/:livre", (req, res) => {
  res.sendFile(__dirname + `/app/serveur/pochettes/${req.params.livre}`);
});

app.get("/json/ajouter", (req, res) => {

  const newLivre = {
    id: 1,
    titre: "Une aventure d'Astérix le gaulois. Le devin",
    idAuteur: 11,
    annee: 1972,
    pages: 48,
    categorie: "bandes dessinées",
    pochette: "Une aventure d'Astérix le gaulois. Le devin.jpg"
  }
});

app.get("/json/supprimer/:idlivre", (req, res) => {
  // let indexLivre = tabLivres.findIndex((livre) => livre.id === req);
  console.log(listerLivre());
  res.end(200);
});

// export const supprimerLivre = (tabLivres) => {
//   // Récupérer l'index
//   let idLivre = parseInt(question('\nId du livre à supprimer : '));
//   let indexLivre = tabLivres.findIndex((livre) => livre.id === idLivre);

//   // Si le livre n'existe pas
//   if (indexLivre === -1) {
//     console.log('\nLivre introuvable.');
//     return;
//   }

//   let livre = tabLivres[indexLivre]
//   afficherDetailsLivre(livre);

//   console.log('\nVoulez-vous vraiment supprimer ce livre ?');

//   // Confirmation du choix
//   let choix = question("\nVotre choix (O - N) : ");
//   if (choix.toUpperCase() === 'N') {
//     console.log('\nSuppression annulée');
//     return;
//   }

//   // Suppression du livre
//   tabLivres.splice(indexLivre, 1);
//   console.log('\nLivre supprimer avec succès');
// }
