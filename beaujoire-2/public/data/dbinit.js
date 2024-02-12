const util = require('util');
const sqlite3 = require('sqlite3');
const path = require('path');
const dbname = path.join(__dirname, 'beaujoire-2.db');
const fs = require("fs");
const jsonFilePath = path.join(__dirname, 'joueurs.json');
const exists = fs.existsSync(dbname);
// Ouverture de la base de données
let db = new sqlite3.Database(dbname, err => {
    if (err) throw err;
    console.log('Database started: ' + dbname);
});

// Function to convert date format from 'DD/MM/YYYY' to 'YYYY-MM-DD'
function convertDateFormat(dateString) {
    // Split the date components
    const dateComponents = dateString.split('/');

    // Check if the date has valid components
    if (dateComponents.length === 3) {
        const day = dateComponents[0].padStart(2, '0');
        const month = dateComponents[1].padStart(2, '0');
        const year = dateComponents[2];

        // Return the converted date in 'YYYY-MM-DD' format
        return `${year}-${month}-${day}`;
    } else {
        // Return null for invalid date format
        return null;
    }
}

// Function to insert players from JSON
function insertPlayersFromJSON(jsonData) {
    return new Promise((resolve, reject) => {
        const insertStmt = db.prepare(`
            INSERT INTO Joueurs(nom, prenom, age, naissance, nationalité1, nationalité2, poste, AnnéeDébut, AnnéeFin, selections, buts, photo, citation, biographie)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `);

        let insertedCount = 0;

        jsonData.forEach(player => {
            // Replace "/" or "NULL" with null for appropriate fields
            const convertedNaissance = player.naissance === '/' || player.naissance === 'NULL' ? null : convertDateFormat(player.naissance);
            const convertedAnneeFin = player.annéeFin === '/' || player.annéeFin === 'NULL' ? null : player.annéeFin;
            const convertedButs = player.buts === '/' || player.buts === 'NULL' ? null : player.buts;
            const convertedArrets = player.arrets === '/' || player.arrets === 'NULL' ? null : player.arrets;
            const convertedPhoto = player.photo === '/' || player.photo === 'NULL' ? null : player.photo;
            const convertedCitation = player.citation === '/' || player.citation === 'NULL' ? null : player.citation;
            const convertedBiographie = player.biographie === '/' || player.biographie === 'NULL' ? null : player.biographie;

            insertStmt.run(
                player.nom,
                player.prenom,
                parseInt(player.age,10),
                convertedNaissance,
                parseInt(player.nationalite1,10),
                parseInt(player.nationalite2,10),
                parseInt(player.poste,10),
                parseInt(player.annéeDébut,10),
                convertedAnneeFin,
                parseInt(player.selections,10),
                parseInt(convertedButs,10),
                parseInt(convertedArrets,10),
                convertedPhoto,
                convertedCitation,
                convertedBiographie
            );
            insertedCount++;
        });

        insertStmt.finalize(() => {
            console.log(`Inserted ${insertedCount} players.`);
            resolve(); // Resolve the promise once all players are inserted
        });
    });
}


db.serialize(async () => {
    if (!exists) {
        db.exec(`
            DROP TABLE IF EXISTS Nationalités;
            CREATE TABLE Nationalités
            (
                id          INTEGER PRIMARY KEY AUTOINCREMENT,
                nationalité VARCHAR(50),
                abreviation VARCHAR(3),
                drapeau     BLOB
            );

            DROP TABLE IF EXISTS Postes;
            CREATE TABLE Postes
            (
                id    INTEGER PRIMARY KEY AUTOINCREMENT,
                poste VARCHAR(25)
            );

            DROP TABLE IF EXISTS Joueurs;
            CREATE TABLE Joueurs
            (
                id           INTEGER PRIMARY KEY AUTOINCREMENT,
                nom          VARCHAR(50),
                prenom       VARCHAR(50),
                age          TINYINT,
                naissance    DATETIME,
                nationalité1 TINYINT,
                nationalité2 TINYINT,
                poste        TINYINT,
                annéeDébut   SMALLINT,
                annéeFin     SMALLINT,
                selections   SMALLINT,
                buts         SMALLINT,
                arrets       SMALLINT,
                photo        BLOB,
                citation     VARCHAR(255),
                biographie   TEXT,
                FOREIGN KEY (nationalité1) REFERENCES Nationalités (id),
                FOREIGN KEY (nationalité2) REFERENCES Nationalités (id),
                FOREIGN KEY (poste) REFERENCES Postes (id)
            );

            DROP TABLE IF EXISTS Articles;
            CREATE TABLE Articles
            (
                id      INTEGER PRIMARY KEY AUTOINCREMENT,
                article BLOB
            );

            DROP TABLE IF EXISTS JoueursArticles;
            CREATE TABLE JoueursArticles
            (
                id_joueur  INTEGER,
                id_article INTEGER,
                PRIMARY KEY (id_joueur, id_article),
                FOREIGN KEY (id_joueur) REFERENCES Joueurs (id),
                FOREIGN KEY (id_article) REFERENCES Articles (id)
            );

            DROP TABLE IF EXISTS Photos;
            CREATE TABLE Photos
            (
                id    INTEGER PRIMARY KEY AUTOINCREMENT,
                photo BLOB
            );

            DROP TABLE IF EXISTS JoueursPhotos;
            CREATE TABLE JoueursPhotos
            (
                id_joueur INTEGER,
                id_photo  INTEGER,
                PRIMARY KEY (id_joueur, id_photo),
                FOREIGN KEY (id_joueur) REFERENCES Joueurs (id),
                FOREIGN KEY (id_photo) REFERENCES Photos (id)
            );

            DROP TABLE IF EXISTS Vidéos;
            CREATE TABLE Vidéos
            (
                id    INTEGER PRIMARY KEY AUTOINCREMENT,
                vidéo BLOB
            );

            DROP TABLE IF EXISTS JoueursVidéos;
            CREATE TABLE JoueursVidéos
            (
                id_joueur INTEGER,
                id_vidéo  INTEGER,
                PRIMARY KEY (id_joueur, id_vidéo),
                FOREIGN KEY (id_joueur) REFERENCES Joueurs (id),
                FOREIGN KEY (id_vidéo) REFERENCES Vidéos (id)
            );

            DROP TABLE IF EXISTS Votes;
            CREATE TABLE Votes
            (
                token   VARCHAR(50) PRIMARY KEY,
                poste1  TINYINT,
                poste2  TINYINT,
                poste3  TINYINT,
                poste4  TINYINT,
                poste5  TINYINT,
                poste6  TINYINT,
                poste7  TINYINT,
                poste8  TINYINT,
                poste9  TINYINT,
                poste10 TINYINT,
                poste11 TINYINT,
                poste12 TINYINT,
                FOREIGN KEY (poste1) REFERENCES Joueurs (id),
                FOREIGN KEY (poste2) REFERENCES Joueurs (id),
                FOREIGN KEY (poste3) REFERENCES Joueurs (id),
                FOREIGN KEY (poste4) REFERENCES Joueurs (id),
                FOREIGN KEY (poste5) REFERENCES Joueurs (id),
                FOREIGN KEY (poste6) REFERENCES Joueurs (id),
                FOREIGN KEY (poste7) REFERENCES Joueurs (id),
                FOREIGN KEY (poste8) REFERENCES Joueurs (id),
                FOREIGN KEY (poste9) REFERENCES Joueurs (id),
                FOREIGN KEY (poste10) REFERENCES Joueurs (id),
                FOREIGN KEY (poste11) REFERENCES Joueurs (id),
                FOREIGN KEY (poste12) REFERENCES Joueurs (id)
            );
        `);
        db.run(`
            INSERT INTO Postes(poste)
            VALUES ('Gardien'),
                   ('Arrière latéral droit'),
                   ('Arriere latéral gauche'),
                   ('Défenseur central 1'),
                   ('Défenseur central 2'),
                   ('Milieu défensif'),
                   ('Milieu gauche'),
                   ('Milieu offensif'),
                   ('Attaquant 1'),
                   ('Milieu droit'),
                   ('Attaquant 2'),
                   ('Sélectionneur')
        `);
        db.run(`
            INSERT
            OR IGNORE INTO Nationalités (nationalité, abreviation) VALUES
        ('Français', 'FRA'),
            ('Burkinabé', 'BFA'),
            ('Nigérian', 'NGA'),
            ('Camerounais', 'CMR'),
            ('Portugais', 'PRT'),
            ('Roumain', 'ROU'),
            ('Congolais', 'COD'),
            ('Serbien', 'SRB'),
            ('Argentin', 'ARG'),
            ('Italien', 'ITA'),
            ('Mali', 'MLI'),
            ('Algérien', 'DZA'),
            ('Tchadien', 'TCD'),
            ('Arménien', 'ARM'),
            ('Nouvelle-Calédonien', 'NCL'),
            ('Brasilien', 'BRA'),
            ('Libanais', 'LBN'),
            ('Ghanéen', 'GHA'),
            ('Espagnol', 'ESP'),
            ('Marocain', 'MAR'),
            ('Colombien', 'COL');
        `);
    }

    // Read JSON file and insert players
    try {
        // Delete all records from the table
        await util.promisify(db.run.bind(db))('DELETE FROM Joueurs');
        // insert again
        const data = await util.promisify(fs.readFile)(jsonFilePath, 'utf8');
        const jsonData = JSON.parse(data);
        await insertPlayersFromJSON(jsonData);
        console.log('Data inserted successfully.');
    } catch (error) {
        console.error(error.message);
    }

    db.all('SELECT * FROM Joueurs', (err, rows) => {
        if (err) console.error(err.message);
        else console.log('Résultat de la sélection : ', rows)
    });
})

module.exports = db;