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
    } catch (err) {
        alert(err.message);
    }
}

const reqListeCategorie = async () => {
    const url = "/json/livres/categories";
    try {
        const reponse = await fetch(url);
        if (reponse.ok) {
            return await reponse.json();
        } else {
            throw new Exception("Problème de chargement des livres!");
        }
    } catch (err) {
        alert(err.message);
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
    } catch (err) {
        alert(err.message);
    }
}

const reqAfficherParCateg = async () => {
    try {
        const selCategs = document.getElementById("selCategs");
        const posChoisie = selCategs.selectedIndex;
        const optionChoisie = selCategs.options[posChoisie].text;

        let url;
        switch (optionChoisie) {
            case "Année":
                choix = $("#modalSelectionChoixCateg").val();
                url = `/json/livres/annee/${choix}`;
                reponse = await fetch(url);

                if (reponse.ok) {
                    const listeLivres = await reponse.json();
                    afficherLivresParCards(listeLivres);
                } else throw new Exception("Problème de chargement des Livres !");
                break;
            case "Auteur":
                choix = $("#modalSelectionChoixCateg").val();
                url = `/json/livres/auteur/${choix}`;
                reponse = await fetch(url);

                if (reponse.ok) {
                    const listeLivres = await reponse.json();
                    afficherLivresParCards(listeLivres);
                } else throw new Exception("Problème de chargement des Livres !");
                break;
            case "Catégorie":
                choix = $("#modalChoixCateg").val();
                url = `/json/livres/categorie/${choix}`;
                reponse = await fetch(url);

                if (reponse.ok) {
                    const listeLivres = await reponse.json();
                    afficherLivresParCards(listeLivres);
                } else throw new Exception("Problème de chargement des Livres !");
                break;

            default:
                alert("Erreur lors de la sélection.")
                break;
        }
    } catch (err) {
        alert(err.message);
    }

    $('#modalSelectionCategorie').modal('toggle');
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
    } catch (err) {
        alert(err.message);
    }
}

function validerFormLivre() {
    const titre = document.getElementById("titre").value.trim();
    const idAuteur = document.getElementById("idAuteur").value.trim();
    const annee = document.getElementById("annee").value.trim();
    const pages = document.getElementById("pages").value.trim();
    const categorie = document.getElementById("categorie").value.trim();
    const pochette = document.getElementById("pochette").value;

    let erreurs = [];
    // Vérifie que tous les champs obligatoires sont remplis
    if (titre === "") erreurs.push("Le titre est requis.");
    if (idAuteur === "" || isNaN(idAuteur) || parseInt(idAuteur) <= 0) erreurs.push("L'ID Auteur doit être un nombre positif.");
    if (annee === "" || isNaN(annee) || parseInt(annee) < 1000 || parseInt(annee) > new Date().getFullYear());
    if (pages === "" || isNaN(pages) || parseInt(pages) <= 0) erreurs.push("Le nombre de pages doit être un nombre positif.");
    if (categorie === "") erreurs.push("La catégorie est requise.");

    if (erreurs.length > 0) {
        alert("Erreur(s) dans le formulaire :\n\n" + erreurs.join("\n"));
        return false;
    }

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
    } catch (err) {
        alert(err.message);
    }
}