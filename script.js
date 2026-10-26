
console.log("Bienvenue chez JD COLLECTION !");

document.addEventListener("DOMContentLoaded", function () {
    const boutons = document.querySelectorAll(".commander");
    const articlesPanier = document.getElementById("articles-panier");
    const totalPanier = document.getElementById("total-panier");
    const boutonVider = document.getElementById("vider-panier");
    const boutonCommande = document.getElementById("passer-commande");

    let panier = [];
   
function obtenirPrix(texte) {
    const nombre = texte.replace(",", ".").match(/\d+(?:\.\d+)?/);
    return nombre ? parseFloat(nombre[0]) : 0;
}

    function afficherPanier() {
        if (!articlesPanier || !totalPanier) return;

        articlesPanier.innerHTML = "";
        let total = 0;

        if (panier.length === 0) {
            articlesPanier.innerHTML = "<p>Ton panier est vide.</p>";
        }

        panier.forEach(function (article, index) {
            total += article.prix;

            const ligne = document.createElement("div");
            ligne.className = "article-panier";
           
           const texte = document.createElement("p");
         texte.textContent =
       article.nom +
       (article.couleur ? " — couleur " + article.couleur : "") +
    " — pointure " + article.pointure +
    " — " + article.prix + " $ CAD";

            const supprimer = document.createElement("button");
            supprimer.type = "button";
            supprimer.textContent = "Retirer";
            supprimer.addEventListener("click", function () {
                panier.splice(index, 1);
                afficherPanier();
            });

            ligne.appendChild(texte);
            ligne.appendChild(supprimer);
            articlesPanier.appendChild(ligne);
        });

        totalPanier.textContent = total.toFixed(2) + " $ CAD";
    }

    boutons.forEach(function (bouton) {
        bouton.addEventListener("click", function () {
            const carte = bouton.closest(".produit");

            if (!carte) {
                alert("Impossible de trouver la fiche du produit.");
                return;
            }

            const nom = bouton.dataset.produit ||
                carte.querySelector("h3")?.textContent ||
                "Chaussures JD COLLECTION";

            const prixElement = carte.querySelector(".prix");
            const selectPointure = carte.querySelector(".pointure");

            if (!prixElement) {
                alert("Impossible de trouver le prix du produit.");
                return;
            }

            const pointure = selectPointure ? selectPointure.value : "";

            if (!pointure) {
                alert("Veuillez choisir une pointure entre 39 et 46.");
                return;
            }

            const prix = obtenirPrix(prixElement.textContent);

            if (prix <= 0) {
                alert("Le prix de ce produit est invalide.");
                return;
            }
           
const selectCouleur = carte.querySelector(".couleur-produit");
const couleur = selectCouleur ? selectCouleur.value : "";

panier.push({
    nom: nom,
    prix: prix,
    pointure: pointure,
    couleur: couleur
});

            afficherPanier();

            alert(nom + " a été ajouté à ton panier !");
        });
    });

    if (boutonVider) {
        boutonVider.addEventListener("click", function () {
            panier = [];
            afficherPanier();
        });
    }

    if (boutonCommande) {
        boutonCommande.addEventListener("click", function () {
            if (panier.length === 0) {
                alert("Ton panier est vide. Ajoute d'abord une paire.");
                return;
            }

            const choixPaiement = document.querySelector(
                'input[name="paiement"]:checked'
            );

            const paiement = choixPaiement
                ? choixPaiement.value
                : "À confirmer";

            const total = panier.reduce(function (somme, article) {
                return somme + article.prix;
            }, 0);

            let message = "Bonjour JD COLLECTION ! Je souhaite commander :\n\n";

            panier.forEach(function (article, index) {               
message += (index + 1) + ". " + article.nom +
    (article.couleur ? "\nCouleur : " + article.couleur : "") +
    "\nPointure : " + article.pointure +
    "\nPrix : " + article.prix + " $ CAD\n\n";

            });

            message += "Total : " + total.toFixed(2) + " $ CAD\n";
            message += "Paiement souhaité : " + paiement + "\n\n";
            message += "Merci de confirmer la disponibilité et la livraison.";

            const numeroWhatsApp = "15147158896";
            const lien = "https://wa.me/" + numeroWhatsApp +
                "?text=" + encodeURIComponent(message);

            window.open(lien, "_blank");
        });
    }

    afficherPanier();
   
    const formulaire = document.getElementById("formulaire-client");

    if (formulaire) {
        formulaire.addEventListener("submit", function (event) {
            event.preventDefault();

            if (panier.length === 0) {
                alert("Ajoute au moins une paire de chaussures au panier.");
                return;
            }

            const nom = document.getElementById("nom-client").value.trim();
            const telephone = document.getElementById("telephone-client").value.trim();
            const adresse = document.getElementById("adresse-client").value.trim();
            const ville = document.getElementById("ville-client").value.trim();

            if (!nom || !telephone || !adresse || !ville) {
                alert("Merci de remplir toutes les informations de livraison.");
                return;
            }

            const choixPaiement = document.querySelector(
                'input[name="paiement"]:checked'
            );

            const paiement = choixPaiement
                ? choixPaiement.value
                : "À confirmer";

            const total = panier.reduce(function (somme, article) {
                return somme + article.prix;
            }, 0);

            let message = "Bonjour JD COLLECTION ! Nouvelle commande\n\n";
            message += "Client : " + nom + "\n";
            message += "Téléphone : " + telephone + "\n";
            message += "Adresse : " + adresse + "\n";
            message += "Ville : " + ville + "\n\n";
            message += "Articles commandés :\n";

            panier.forEach(function (article, index) {
                message += (index + 1) + ". " + article.nom +
                    " — Pointure " + article.pointure +
                    " — " + article.prix + " $ CAD\n";
            });

            message += "\nTotal : " + total.toFixed(2) + " $ CAD";
            message += "\nPaiement souhaité : " + paiement;

            const numeroWhatsApp = "15147158896";
            const lien = "https://wa.me/" + numeroWhatsApp +
                "?text=" + encodeURIComponent(message);

            window.open(lien, "_blank");
        });
    }

    console.log("Le panier et les commandes sont prêts.");
    
/* RECHERCHE DES CHAUSSURES JD COLLECTION */
const champRecherche = document.getElementById("recherche-chaussures");

if (champRecherche) {
    champRecherche.addEventListener("input", function () {
        const recherche = champRecherche.value
            .toLowerCase()
            .trim();

        const produits = document.querySelectorAll("#boutique .produit");

        produits.forEach(function (produit) {
            const nomProduit = produit.textContent.toLowerCase();
            produit.style.display = nomProduit.includes(recherche)
                ? ""
                : "none";
        });
    });
}

});

/* CHANGEMENT DE COULEUR DU PRODUIT CHANEL */
const selectCouleurChanel = document.getElementById("couleur-chanel");

if (selectCouleurChanel) {
    selectCouleurChanel.addEventListener("change", function () {
        const optionChoisie =
            selectCouleurChanel.options[selectCouleurChanel.selectedIndex];

        const nouvelleImage = optionChoisie.dataset.image;
        const photoChanel = document.getElementById("photo-chanel");

        if (photoChanel && nouvelleImage) {
            photoChanel.src = nouvelleImage;
            photoChanel.alt = "Chanel " + optionChoisie.value;
        }
    });
}

/* CHANGEMENT DE COULEUR DES SANDales GUCCI */
const selectCouleurGucci = document.getElementById("couleur-gucci");

if (selectCouleurGucci) {
    selectCouleurGucci.addEventListener("change", function () {
        const optionChoisie =
            selectCouleurGucci.options[selectCouleurGucci.selectedIndex];

        const nouvelleImage = optionChoisie.dataset.image;
        const photoGucci = document.getElementById("photo-gucci");

        if (photoGucci && nouvelleImage) {
            photoGucci.src = nouvelleImage;
            photoGucci.alt = "Sandales Gucci " + optionChoisie.value;
        }
    });
}

/* CHANGEMENT DE COULEUR DES CHAUSSURES COMPENSÉES */
const selectCouleurCompense = document.getElementById("couleur-compense");

if (selectCouleurCompense) {
    selectCouleurCompense.addEventListener("change", function () {
        const optionChoisie =
            selectCouleurCompense.options[
                selectCouleurCompense.selectedIndex
            ];

        const nouvelleImage = optionChoisie.dataset.image;
        const photoCompense = document.getElementById("photo-compense");

        if (photoCompense && nouvelleImage) {
            photoCompense.src = nouvelleImage;
            photoCompense.alt =
                "Chaussures compensées " + optionChoisie.value.toLowerCase();
        }
    });
}

/* CHANGEMENT DE COULEUR DES SANDales LOUBOUTIN */
const selectCouleurLouboutin = document.getElementById("couleur-louboutin");

if (selectCouleurLouboutin) {
    selectCouleurLouboutin.addEventListener("change", function () {
        const optionChoisie =
            selectCouleurLouboutin.options[
                selectCouleurLouboutin.selectedIndex
            ];

        const nouvelleImage = optionChoisie.dataset.image;
        const photoLouboutin = document.getElementById("photo-louboutin");

        if (photoLouboutin && nouvelleImage) {
            photoLouboutin.src = nouvelleImage;
            photoLouboutin.alt =
                "Sandales à talons Louboutin " +
                optionChoisie.value.toLowerCase();
        }
    });
}

/* ===== AGRANDISSEMENT DES PHOTOS ===== */

document.addEventListener("DOMContentLoaded", function () {
    const fenetrePhoto = document.createElement("div");

    fenetrePhoto.id = "agrandissement-photo";
    fenetrePhoto.innerHTML = `
        <button type="button" id="fermer-photo" aria-label="Fermer">&times;</button>
        <img id="photo-agrandie" src="" alt="Photo agrandie de la chaussure">
    `;

    document.body.appendChild(fenetrePhoto);

    const photoAgrandie = document.getElementById("photo-agrandie");
    const boutonFermer = document.getElementById("fermer-photo");

    document.querySelectorAll(".produit img").forEach(function (photo) {
        photo.addEventListener("click", function () {
            photoAgrandie.src = photo.src;
            photoAgrandie.alt = photo.alt;
            fenetrePhoto.classList.add("visible");
        });
    });

    function fermerFenetre() {
        fenetrePhoto.classList.remove("visible");
        photoAgrandie.src = "";
    }

    boutonFermer.addEventListener("click", fermerFenetre);

    fenetrePhoto.addEventListener("click", function (evenement) {
        if (evenement.target === fenetrePhoto) {
            fermerFenetre();
        }
    });

    document.addEventListener("keydown", function (evenement) {
        if (evenement.key === "Escape") {
            fermerFenetre();
        }
    });
});

/* ===== FORMULAIRE AVIS CLIENTS JD COLLECTION ===== */

document.addEventListener("DOMContentLoaded", function () {
    const formulaireAvis = document.getElementById("formulaire-avis");

    if (!formulaireAvis) return;

    formulaireAvis.addEventListener("submit", function (event) {
        event.preventDefault();

        const nom = document.getElementById("nom-avis").value.trim();
        const note = Number(document.getElementById("note-avis").value);
        const commentaire = document.getElementById("commentaire-avis").value.trim();
        const message = document.getElementById("message-avis");

        if (!nom || !commentaire || note < 1 || note > 5) {
            message.textContent = "Veuillez remplir tous les champs correctement.";
            return;
        }

        const carte = document.createElement("article");
        carte.className = "carte-avis";

        const etoiles = document.createElement("div");
        etoiles.className = "etoiles-avis";
        etoiles.setAttribute("aria-label", note + " étoiles");
        etoiles.textContent = "★".repeat(note) + "☆".repeat(5 - note);

        const titre = document.createElement("h3");
        titre.textContent = "Avis client";

        const texte = document.createElement("p");
        texte.textContent = commentaire;

        const auteur = document.createElement("span");
        auteur.className = "auteur-avis";
        auteur.textContent = nom;

        carte.append(etoiles, titre, texte, auteur);

        const grille = document.querySelector(".grille-avis");
        if (grille) {
            grille.appendChild(carte);
        }

        formulaireAvis.reset();
        message.textContent = "Merci ! Votre avis a été ajouté à cette page.";

        carte.scrollIntoView({ behavior: "smooth", block: "center" });
    });
});
