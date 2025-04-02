const creerCard = (livre) => {
    return `
        <div class="card" style="width: 18rem;">
            <span>${livre.titre}</span>
        </div>
    `;
}

const creerSelectCategories = (categs) => {
    const selCategs = document.getElementById('selCategs');
    for (let uneCateg of categs) {
        selCategs.options[selCategs.options.length] = new Option(uneCateg, uneCateg);
    }
}

const afficherLivresParCards = (donneesLivres) => {
    const categs = donneesLivres.categories;
    creerSelectCategories(categs);
    const listeLivres = donneesLivres.livres;
    let liste = `<div class="row">`;
    for (const livre of listeLivres) {
        liste += creerCard(livre);
    }
    document.getElementById('contenu').innerHTML = liste;
}

const afficherLivreParCategorie = (listeLivres) => {
    let liste = `<div class="row">`;
    for (const livre of listeLivres) {
        liste += creerCard(livre);
    }
    document.getElementById("contenu").innerHTML = liste;
};