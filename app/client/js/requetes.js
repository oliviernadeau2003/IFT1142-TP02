const reqListeLivre = async () => {
    const url = "/json";
    try {
        const reponse = await fetch(url);
        if (reponse.ok) {
            const donneesLivres = await reponse.json();
            console.log(donneesLivres);
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

function validerFormLivre() { }