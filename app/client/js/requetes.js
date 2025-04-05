

//* - Fonctions CRUD -

//* Create
const reqAjouterLivre = async () => { }

//* Read
const reqListeLivre = async () => {
    const url = "/json";
    try {
        const reponse = await fetch(url);
        if (reponse.ok) {
            const donneesLivres = await reponse.json();
            afficherLivresParCards(donneesLivres);
        } else {
            throw new Exception("Problème de chargement des livres!");
        }
    } catch (e) {
        alert(e.message);
    }
}

const reqLAfficherParCateg = async () => {
    const selCategs = document.getElementById("selCategs");
    const posChoisie = selCategs.selectedIndex;
    const optionChoisie = selCategs.options[posChoisie].text;

    const url = `/json/:${optionChoisie.toString()}`;
    try {
        const reponse = await fetch(url);
        if (reponse.ok) {
            const listeLivres = await reponse.json();
            afficherLivreParCategorie(listeLivres);
        } else {
            throw new Exception("Problème de chargement des Livres!");
        }
    } catch (e) {
        alert(e.message);
    }
}

//* Update
const reqUpdateLivre = async () => {

}

function validerFormLivre() { }

//* Delete
const reqSupprimerLivre = async (idLivre) => {
    const url = `/json/supprimer/${idLivre}`;
    try {
        const reponse = await fetch(url);
        if (reponse.ok) {
            alert("Suppression effectuée.")
            // Hide the toast after successful deletion
            const ToastConfirmation = document.getElementById('ToastConfirmation');
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(ToastConfirmation);
            toastBootstrap.hide();

            reqListeLivre();
        } else {
            alert("Erreur lors de la suppression.")
            throw new Exception("Problème de chargement des Livres!");
        }
    } catch (e) {
        alert(e.message);
    }
}