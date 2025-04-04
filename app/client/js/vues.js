const creerCard = (livre) => {
    return `
        <div class="card" style="width: 18rem;">
                <h4>${livre.titre}</h4>
                <hr>
                <img src="http://localhost:3000/pochettes/${livre.pochette}"></img>

                <div class="container">
                    <hr>
                    <span>idAuteur : ${livre.idAuteur}</span><br>
                    <span>Année : ${livre.annee}</span><br>
                    <span>${livre.pages} pages</span><br>
                    <span class="capitalize">${capitalize(livre.categorie)}</span><br>
                    <hr>
                </div>

                <div class="d-flex flex-row gap-2 mx-2 justify-content-around my-3">
                    <a href="" class="edit-button" data-bs-toggle="modal" data-bs-target="#idModalModifierLivre"><i
                            class="bi bi-pencil"></i></a>
                    <button class="delete-button" id="liveToastBtn" onclick="afficherToastConfirmation(${livre.id})"><i
                            class="bi bi-trash3"></i></button>
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

const afficherToastConfirmation = (idLivre) => {
    const ToastConfirmation = document.getElementById('ToastConfirmation');
    const toastBody = ToastConfirmation.querySelector('.toast-body');

    // Update toast message with the book ID (or any other data)
    toastBody.innerHTML = `
        <i class="bi bi-trash3"></i> Voulez-vous vraiment supprimer ce livre (ID: ${idLivre}) ?
        <div class="mt-2 pt-2 border-top">
            <button type="button" class="btn btn-primary btn-sm" onclick="reqSupprimerLivre(${idLivre})">Oui</button>
            <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="toast">Annuler</button>
        </div>
    `;

    // Show the toast
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(ToastConfirmation);
    toastBootstrap.show();
};

const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}
