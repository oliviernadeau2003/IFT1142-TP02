// ********************* CRÉATION DU SERVEUR NODE ************************
const http = require("http");
const path = require("path");
const express = require("express");
// const bodyParser = require("body-parser"); //! DO NOT SUPPORT FILE ENCODE
const multer = require("multer");
const { getLivre, ajouterLivre, supprimerLivre, modifierLivre, getNextId } = require("./app/serveur/src/modules/services");

const app = express();
const port = 3000;
const serveur = http.createServer(app);
serveur.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});

app.use(express.static(__dirname + "/app/client")); //to get also css, js, images, ...

const destination = __dirname + "/app/serveur/pochettes/";
//* Créer un storage personnalisé
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, destination); // Dossier de destination
  },
  filename: (req, file, cb) => {
    // Génère un nom de fichier avec le titre + extension d’origine
    const ext = path.extname(file.originalname);
    const safeTitle = req.body.titre.replace(/[^a-z0-9]/gi, '_').toLowerCase(); // nettoyage simple du titre
    cb(null, `${safeTitle}${ext}`);
  }
});

// Lier le storage à multer
const upload = multer({ storage: storage });

// ********************* GESTION DES ROUTES ************************
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/app/client/index.html");
});

//* Create
app.post("/json/livres/ajouter", upload.single('pochette'), (req, res) => {
  try {
    const nouveauLivre = {
      id: getNextId(),
      titre: req.body.titre,
      idAuteur: parseInt(req.body.idAuteur),
      annee: parseInt(req.body.annee),
      pages: parseInt(req.body.pages),
      categorie: req.body.categorie,
      pochette: req.file ? req.file.filename : null  // Si aucun fichier n'est téléchargé, on laisse la pochette à null
    }

    ajouterLivre(nouveauLivre)

    res.status(201).end();
  } catch (err) {
    res.status(404).json("Erreur lors de la création.");
  }
});

// * Read
app.get("/json/livres", (req, res) => {
  res.header("Content-type", "application/json");
  res.header("Charset", "utf8");
  res.sendFile(__dirname + "/app/serveur/donnees/livres.json");
});

app.get("/json/livres/:idLivre", (req, res) => {
  try {
    res.status(200).json(getLivre(req.params.idLivre));
  } catch (err) {
    res.status(404).end();
  }
});

app.get("/livres/pochettes/:idLivre", (req, res) => {
  res.sendFile(__dirname + `/app/serveur/pochettes/${req.params.idLivre}`);
});

//* Update
app.post("/json/livres/update", upload.single('pochette'), (req, res) => {
  try {
    const nouvelleDonnee = {
      titre: req.body.titre,
      idAuteur: parseInt(req.body.idAuteur),
      annee: parseInt(req.body.annee),
      pages: parseInt(req.body.pages),
      categorie: req.body.categorie
    };

    if (req.file) nouvelleDonnee.pochette = req.file.filename

    modifierLivre(req.body.id, nouvelleDonnee);
    res.status(200).end();
  } catch (err) {
    res.status(404).json("Erreur lors de la mise a jour du livre.");
  }
})

//* Supprimer
app.get("/json/livres/supprimer/:idLivre", (req, res) => {
  try {
    supprimerLivre(req.params.idLivre);
    res.status(200).end();
  } catch (err) {
    res.status(404).end();
  }
});