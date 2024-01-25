const util = require('util');
const sqlite3 = require('sqlite3');
const path = require('path');
const dbname = path.join(__dirname, 'beaujoire-2.db');

// Ouverture de la base de données
let db = new sqlite3.Database(dbname, err => {
    if (err) throw err;
    console.log('Database started: ' + dbname);
});

db.serialize(() => {
    db.exec(`
        DROP TABLE IF EXISTS Nationalités;
        CREATE TABLE Nationalités(
            id INTEGER PRIMARY KEY autoincrement,
            nationalité VARCHAR(50)
        );

        DROP TABLE IF EXISTS Postes;
        CREATE TABLE Postes(
            id INTEGER PRIMARY KEY autoincrement,
            poste VARCHAR(20)
        );

        DROP TABLE IF EXISTS Joueurs;
        CREATE TABLE Joueurs(
            id INTEGER PRIMARY KEY autoincrement,
            nom VARCHAR(50),
            prenom VARCHAR(50),
            age TINYINT,
            naissance DATE,
            nationalité1 TINYINT,
            nationalité2 TINYINT,
            poste TINYINT,
            AnnéeDébutJunior SMALLINT,
            AnnéeFinJunior SMALLINT,
            AnnéeDébutSenior SMALLINT,
            AnnéeFinSenior SMALLINT,
            selections SMALLINT,
            buts SMALLINT,
            photo BLOB,
            citation VARCHAR(255),
            biographie TEXT,
            FOREIGN KEY(nationalité1) REFERENCES Nationalités(id),
            FOREIGN KEY(nationalité2) REFERENCES Nationalités(id),
            FOREIGN KEY(poste) REFERENCES Postes(id)
        );

        DROP TABLE IF EXISTS Articles;
        CREATE TABLE Articles(
            id INTEGER PRIMARY KEY autoincrement,
            article BLOB
        );

        DROP TABLE IF EXISTS JoueursArticles;
        CREATE TABLE JoueursArticles(
            id_joueur INT,
            id_article INT,
            PRIMARY KEY (id_joueur, id_article),
            FOREIGN KEY (id_joueur) REFERENCES Joueurs(id),
            FOREIGN KEY (id_article ) REFERENCES Articles(id)
        );

        DROP TABLE IF EXISTS Photos;
        CREATE TABLE Photos(
            id INTEGER PRIMARY KEY autoincrement,
            photo BLOB
        );

        DROP TABLE IF EXISTS JoueursPhotos;
        CREATE TABLE JoueursPhotos(
            id_joueur INT,
            id_photo INT,
            PRIMARY KEY (id_joueur, id_photo),
            FOREIGN KEY (id_joueur) REFERENCES Joueurs(id),
            FOREIGN KEY (id_photo) REFERENCES Photos(id)
        );

        DROP TABLE IF EXISTS Vidéos;
        CREATE TABLE Vidéos(
            id INTEGER PRIMARY KEY autoincrement,
            vidéo BLOB
        );

        DROP TABLE IF EXISTS JoueursVidéos;
        CREATE TABLE JoueursVidéos(
            id_joueur INT,
            id_vidéo INT,
            PRIMARY KEY (id_joueur, id_vidéo),  
            FOREIGN KEY (id_joueur) REFERENCES Joueurs(id),
            FOREIGN KEY (id_vidéo) REFERENCES Vidéos(id)
        );
    `);
    db.run(`
        INSERT INTO Postes(poste) VALUES 
            ('Gardien'),
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
    db.all('SELECT * FROM Postes', (err, rows) => {
        if (err) console.error(err.message);
        else console.log('Résultat de la sélection : ', rows)
    });
})

db.close();

module.exports = db;