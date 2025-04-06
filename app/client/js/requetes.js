

//* - Fonctions CRUD -

//* Create
const reqAjouterLivre = async () => { }

//* Read
const reqListeLivre = async () => {
    const url = "/json/livres";
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

    const url = `/json/livres/categorie/${optionChoisie.toString()}`;
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
const reqUpdateLivre = async (idLivre) => {
    const url = `/json/livres/update/${idLivre}`;
    try {
        const reponse = await fetch(url);
        if (reponse.ok) {
            alert("Modification effectuée.")
            reqListeLivre();
        } else {
            alert("Erreur lors de la modification.")
            throw new Exception("Problème de chargement des Livres!");
        }
    } catch (e) {
        alert(e.message);
    }
}

function validerFormLivre() {
    return true;
}

//* Delete
const reqSupprimerLivre = async (idLivre) => {
    const url = `/json/livres/supprimer/${idLivre}`;
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