// ********************* CRÉATION DU SERVEUR NODE ************************
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const { supprimerLivre } = require("./app/serveur/src/modules/services");

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

//* Create
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

// * Read
app.get("/json", (req, res) => {
  res.header("Content-type", "application/json");
  res.header("Charset", "utf8");
  res.sendFile(__dirname + "/app/serveur/donnees/livres.json");
});

app.get("/pochettes/:idLivre", (req, res) => {
  res.sendFile(__dirname + `/app/serveur/pochettes/${req.params.idLivre}`);
});

//* Update

//* Supprimer
app.get("/json/supprimer/:idLivre", (req, res) => {
  try {
    supprimerLivre(req.params.idLivre);
    res.status(200).end();
  } catch (err) {
    res.status(404).end();
  }
});