// ********************* CRÉATION DU SERVEUR NODE ************************
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");

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

app.get("/json/ajouter");
