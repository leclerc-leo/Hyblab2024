db = require('./dbinit');
const dataUtils = {};

/* récuperer toutes les infos d'un joueur pour la page de joueur.
params :
    - idPlayer : id du joueur dans la base de données
*/

// selectionner tous les joueurs.
dataUtils.selectPlayers = function (callback) {
    db.all('SELECT * FROM Joueurs', (err, rows) => {
        if (err) {
            console.error(err.message);
            callback(err, null);
        } else {
            console.log('selectPlayers(): \n', rows, '\n\n');
            callback(null, rows);
        }
    });
};

dataUtils.selectPlayer = function(idPlayer, callback) {
    db.get(`
        SELECT
            nom,
            prenom,
            age,
            naissance,
            N1.nationalité as nationalité1,
            N2.nationalité as nationalité2,
            P.poste,
            annéeDébut,
            annéeFin,
            selections,
            buts,
            arrets,
            photo,
            citation,
            biographie
        FROM Joueurs J
        JOIN Nationalités N1 ON J.nationalité1 = N1.id
        LEFT JOIN Nationalités N2 ON J.nationalité2 = N2.id
        JOIN Postes P On J.poste = P.id
        WHERE J.id = ?`, idPlayer, (err, rows) => {
        if (err) {
            console.error(err.message);
            callback(err, null);
        } else {
            console.log('selectPlayer(idPlayer = ' + idPlayer + '): \n', rows, '\n\n');
            callback(null,rows);
        }
    });
};

dataUtils.getPlayersByPosition = function(positionId, callback) {
    const query = `
      SELECT id, nom, prenom, photo
      FROM Joueurs
      WHERE poste = ?`;
  
    db.all(query, [positionId], (err, players) => {
      if (err) {
        console.error('Error fetching players:', err);
        callback([]);
      } else {
        callback(players);
      }
    });
  };

/* enregistrer le vote final d'un utilisateur.
params :
    - token : le token de la connexion sur laquelle a été fait le vote
    - votes : liste d'id de joueurs pour les 12 postes. Exemple : [4, 8, 11, 18, 20, 29, 33, 36, 44, 45, 56, 60]
*/
dataUtils.vote = function (token, votes, callback) {
    db.run(`
        INSERT OR REPLACE INTO Votes
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [token, ...votes], (err, rows) => {
        if (err) {
            console.error(err.message);
            callback(err);
        } else {
            console.log('vote(token = ' + token + ', votes = ' + votes + '): success\n\n');
            callback(null);
        }
    });
};

// selectionner tous les votes.
dataUtils.selectVotes = function (callback) {
    db.all('SELECT * FROM Votes', (err, rows) => {
        if (err) {
            console.error(err.message);
            callback(err, null);
        } else {
            console.log('selectVotes(): \n', rows, '\n\n');
            callback(null, rows);
        }
    });
};
/* récupérer le pourcentage de votes pour un joueur et poste donné
params:
    - idPoste : id du poste
    - idJoueur : id du joueur
*/
dataUtils.getStats = function (idPoste, idJoueur, callback) {
    db.all(
        `SELECT COUNT(*) * 100 / (SELECT COUNT(*) FROM Votes) AS ratio FROM Votes WHERE poste${idPoste} = ?`,
        [idJoueur],
        (err, rows) => {
            if (err) {
                console.error('Error in getStats:', err.message);
                callback(err, null);
            } else {
                console.log(
                    `getStats(idPoste = ${idPoste}, idJoueur = ${idJoueur}): \n`,
                    rows,
                    '\n\n'
                );
                callback(null, rows);
            }
        }
    );
};


/* récupérer le pourcentage de votes pour un joueur et poste donné et ses informations
params:
    - idPoste : id du poste
    - idJoueur : id du joueur
*/
dataUtils.getPlayerStats = function(idJoueur, idPoste, callback) {
    db.get(`
        SELECT
            J.nom,
            J.prenom,
            J.photo,
            (COUNT(CASE WHEN V.poste${idPoste} = ? THEN 1 END) * 100) / (SELECT COUNT(*) FROM Votes) AS ratio
        FROM Votes V
        JOIN Joueurs J ON V.poste${idPoste} = J.id
        WHERE J.id = ? `,
        [idJoueur, idJoueur],
        (err, row) => {
            if (err) {
                console.error(err.message);
                callback(err, null);
            } else {
                console.log('getPlayerStats(idPoste = ' + idPoste + ', idJoueur = ' + idJoueur + '): \n', row, '\n\n');
                callback(null, row);
            }
        }
    );
};







/* récupérer le classement des joueurs pour un poste donné, triés par pourcentage de votes décroissant.
params:
    - idPoste : id du poste
*/
dataUtils.getTop = function (idPoste, callback) {
    db.all(
        `
            SELECT
                id,
                nom,
                prenom,
                photo,
                COUNT(*) AS voteCount
            FROM Joueurs J
                     JOIN Votes V ON V.poste${idPoste} = J.id
            GROUP BY J.id
            ORDER BY voteCount DESC
                LIMIT 1`,
        [],
        (err, rows) => {
            if (err) {
                console.error('Error in getTop:', err.message);
                callback(err, null);
            } else {
                console.log('getTop(idPoste = ' + idPoste + '): \n', rows, '\n\n');
                // Return the first row or null if there are no rows
                const topPlayer = rows.length > 0 ? rows[0] : null;
                callback(null, topPlayer);
            }
        }
    );
};

dataUtils.db = db;

module.exports = dataUtils ;
