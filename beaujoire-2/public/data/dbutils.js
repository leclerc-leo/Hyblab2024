db = require('./dbinit');
const dataUtils = {};

/* récuperer toutes les infos d'un joueur pour la page de joueur.
params :
    - idPlayer : id du joueur dans la base de données
*/
dataUtils.selectPlayer = function(idPlayer, callback) {
    db.all(`
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
            callback(null, rows);
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
dataUtils.vote = function(token, votes){
    db.run(`
        INSERT OR REPLACE INTO Votes
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [token, ...votes], (err, rows) => {
        if (err) console.error(err.message);
        else console.log('vote(token = ' + token + ', votes = ' + votes + '): success\n\n');
    });
}

// selectionner tous les votes.
dataUtils.selectVotes = function (){
    db.all('SELECT * FROM Votes', (err, rows) => {
        if (err) console.error(err.message);
        else console.log('selectVotes(): \n', rows, '\n\n'); return rows;
    });
}

/* récupérer le pourcentage de votes pour un joueur et poste donné
params:
    - idPoste : id du poste
    - idJoueur : id du joueur
*/
dataUtils.getStats = function(idPoste, idJoueur){
    db.all(`SELECT COUNT(*)*100 / (SELECT COUNT(*) FROM Votes) AS ratio FROM Votes WHERE poste${idPoste} = ?`, idJoueur, (err, rows) => {
        if (err) console.error(err.message);
        else console.log('getStats(idPoste = ' + idPoste + ', idJoueur = ' + idJoueur + '): \n', rows, '\n\n'); return rows;
    });
}

/* récupérer le classement des joueurs pour un poste donné, triés par pourcentage de votes décroissant.
params:
    - idPoste : id du poste
*/
dataUtils.getTop = function(idPoste){
    db.all(`
        SELECT
            nom,
            prenom,
            photo,
            COUNT(*)*100 / (SELECT COUNT(*) FROM Votes) AS ratio
        FROM Joueurs J
        JOIN Votes V ON V.poste${idPoste} = J.id
        GROUP BY J.id
        ORDER BY ratio DESC`, (err, rows) => {
        if (err) console.error(err.message);
        else console.log('getTop(idPoste = ' + idPoste + '): \n', rows, '\n\n'); return rows;
    });
}

dataUtils.db = db;

module.exports = dataUtils ;
