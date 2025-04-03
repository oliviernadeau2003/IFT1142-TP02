const creerCard = (livre) => {
    return `
        <div class="card" style="width: 18rem;">
                <h4>${livre.titre}</h4>
                <img src="http://localhost:3000/pochettes/${livre.pochette}"></img>

                <div class="d-flex flex-row gap-2 mx-2 justify-content-around my-3">
                    <a href="" class="edit-button" data-bs-toggle="modal" data-bs-target="#IDMODAL"><i
                            class="bi bi-pencil"></i></a>
                    <a href="" class="delete-button" data-bs-toggle="modal" data-bs-target="#IDMODAL"><i
                            class="bi bi-trash3"></i></a>
                </div>

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