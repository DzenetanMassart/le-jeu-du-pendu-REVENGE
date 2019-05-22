    let score = 0;

    document.getElementById("demarre").addEventListener("click", demarre);

    function demarre() {
        document.getElementById("demarre").style.display = "none";

        /* alphabet */
        let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

        function demarre() {

            /* on pioche un mot au hasard dans une liste */
            let mots = ["poisson", "haricot", "animal", "chat", "hamster", "fruit", "ordinateur", "souris", "dragon", "oiseau", "arbre", "plante", "concombre", "orange", "bleu", "vert", "helicoptere", "velo", "trampoline", "train", "tramway", "metro", "elephant", "girafe", "ecran", "rose", "zebre", "fourmi", "kiwi", "ananas", "hibou", "chouette", "balais", "reveil", "clavier", "stylo", "feutre", "bracelet", "feuille", "papier", "castor", "perle", "ecouteur", "veste", "foulard", "bague", "bequille", "roue", "voiture", "camion", "tortue", "carapace", "chien", "singe", "cheval", "jument", "calendrier", "lit", "oreiller", "chaussure", "mirtille", "chocolat", "vanille", "tasse", "cuillere", "assiette", "couteau", "loup", "labyrinthe", "lasagnes", "patte", "manteau", "cacahuete", "cornichon", "oignon", "marron", "arbre", "courgette", "crotte", "alcool", "tissus", "main", "doigt", "pied", "langue", "bonbon", "menthe", "abricot", "gateau", "riz", "poulet", "poney", "yeux", "oeil", "ongle", "bouche", "levre", "lievre", "limace", "escargot", "plante", "herbe", "cactus", "corde", "lait", "grenadine", "jardin", "tomate", "asperge", "concombre", "livre", "serviette", "table", "miroir", "manette", "telecommande", "pygama", "acide", "sucre", "cabane", "cadeau", "chemin", "cochon", "citrouille", "mouton", "laine", "feu", "lumiere", "chevre"];
            let x = Math.floor(Math.random() * mots.length);
            let mot = mots[x];
            return mot;
        }
        mot = demarre();

        function tableau_mot(mot) {

            /* on fait un tableau avec les lettres du mot */
            let tab_mot = [];
            for (i = 0; i < mot.length; i++) {
                tab_mot[i] = mot.substr(i, 1);
            }

            return tab_mot;
        }
        tab_mot = tableau_mot(mot);

        function tableau_mot_decouvert(mot) {

            /* on fait un nouveau tableau avec des _ à la place de chaque lettre. On changera la valeur à chaque lettre découverte. */
            let tab_mot_decouvert = [];
            for (i = 0; i < mot.length; i++) {

                tab_mot_decouvert[i] = "_";

            }

            /* affichage du mot */
            for (i = 0; i < mot.length; i++) {

                document.getElementById('mot').innerHTML += " " + tab_mot_decouvert[i] + " ";

            }

            return tab_mot_decouvert;
        }
        tab_mot_decouvert = tableau_mot_decouvert(mot);

        /* affichage du clavier */
        for (a = 0; a < alphabet.length; a++) {

            if (a === 0) {
                document.getElementById('clavier').innerHTML += '<p>';
            }
            if (a === 13) {
                document.getElementById('clavier').innerHTML += '</p><p>';
            }
            if (a === 26) {
                document.getElementById('clavier').innerHTML += '</p>';
            }
            document.getElementById('clavier').innerHTML += ' <span class="lettre" id="' + alphabet[a] + '">' + alphabet[a] + '</a> ';

        }

        /* on compte le nombre d'essais */
        let essais = 0;

        /* on cherche si la lettre cliquée est bonne */
        for (a = 0; a < alphabet.length; a++) {

            let lettre = alphabet[a];
            document.getElementById(lettre).onmousedown = function() {

                lettre = this.id;
                let trouve = 0;
                for (i = 0; i < mot.length; i++) {

                    if (tab_mot[i] == lettre) {

                        tab_mot_decouvert[i] = lettre;
                        document.getElementById('mot').innerHTML = "";
                        for (k = 0; k < mot.length; k++) {

                            document.getElementById('mot').innerHTML += " " + tab_mot_decouvert[k] + " ";
                            document.getElementById('bravo').innerHTML = '<p>Oui, il y a un "' + lettre + '" ' + 'dans le mot !</p>';
                            trouve = 1;
                        }
                    }

                    /* visu lettre cochée */


                }
                if (essais < 9) {

                    if (trouve === 0) {

                        //si la lettre n'est pas dans le mot
                        essais++;
                        document.getElementById('bravo').innerHTML = '<p>Non, pas de "' + lettre + '" dans le mot.</p><p> Tu as encore ' + (10 - essais) + ' essais.</p>';
                        document.getElementById('p' + essais).style.display = "block";
                    }
                }

                if (tab_mot_decouvert.indexOf("_") == -1) {
                    essais += 10;
                    document.getElementById('clavier').innerHTML += ' <span class="lettre" id="' + alphabet[a] + '">' + alphabet[a] + '</a> ';
                    score++;
                    document.getElementById('bravo').innerHTML = '<p class="arc_en_ciel">Bravo, tu as trouvé le mot "' + mot + '" ! =D </p>';
                    document.getElementById('mot').innerHTML = "";
                    mot = demarre();
                    tab_mot = tableau_mot(mot);
                    tab_mot_decouvert = tableau_mot_decouvert(mot);
                    demarre();
                }

                if (essais >= 9) {
                    document.getElementById('mot').innerHTML = mot;
                    document.getElementById('bravo').innerHTML = '<p class="loose">PERDU ! C\'EST TERMINER !</p><p><a href="index.html">Rejouer ?</a></p>';
                }
            }
        }

    }