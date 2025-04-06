

//* - Fonctions CRUD -

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

const reqGetLivre = async (id) => {
    const url = `/json/livres/${id}`;
    try {
        const reponse = await fetch(url);
        if (reponse.ok) {
            const donneesLivre = await reponse.json();
            return donneesLivre;
        } else {
            throw new Exception("Problème de chargement des livres!");
        }
    } catch (e) {
        alert(e.message);
    }
}

const reqAfficherParCateg = async () => {

    switch (optionChoisie) {
        case "Année":

            break;
        case "Auteur":

            break;
        case "Catégorie":

            break;

        default:
            alert("Erreur lors de la sélection.")
            break;
    }

    // const url = `/json/livres/categorie/${optionChoisie.toString()}`;
    // try {
    //     const reponse = await fetch(url);
    //     if (reponse.ok) {
    //         const listeLivres = await reponse.json();
    //         afficherLivreParCategorie(listeLivres);
    //     } else {
    //         throw new Exception("Problème de chargement des Livres!");
    //     }
    // } catch (e) {
    //     alert(e.message);
    // }
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