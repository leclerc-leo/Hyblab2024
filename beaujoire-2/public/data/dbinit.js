const util = require('util');
const sqlite3 = require('sqlite3');
const path = require('path');
const dbname = path.join(__dirname, 'beaujoire-2');

// Ouverture de la base de données
let db = new sqlite3.Database(dbname, err => {
    if (err) throw err;
    console.log('Database started: ' + dbname);
});

db.serialize(() => {
    db.run(`
        DROP TABLE IF EXISTS Nationalités;
        CREATE TABLE Nationalités(
            id TINYINT PRIMARY KEY,
            nationalité VARCHAR(50)
        );

        DROP TABLE IF EXISTS Postes;
        CREATE TABLE Postes(
            id TINYINT PRIMARY KEY,
            poste VARCHAR(20)
        );

        DROP TABLE IF EXISTS Joueurs;
        CREATE TABLE Joueurs(
            id INT PRIMARY KEY,
            nom VARCHAR(50),
            prenom VARCHAR(50),
            age TINYINT,
            naissance DATE,
            nationalité1 TINYINT FOREIGN KEY REFERENCES Nationalités(id),
            nationalité2 TINYINT FOREIGN KEY REFERENCES Nationalités(id),
            poste TINYINT FOREIGN KEY REFERENCES Postes(id),
            AnnéeDébutJunior SMALLINT,
            AnnéeFinJunior SMALLINT,
            AnnéeDébutSenior SMALLINT,
            AnnéeFinSenior SMALLINT,
            selections SMALLINT,
            buts SMALLINT,
            photo BLOB,
            citation VARCHAR(255),
            biographie TEXT
        );

        DROP TABLE IF EXISTS Articles;
        CREATE TABLE Articles(
            id INT PRIMARY KEY,
            article BLOB
        );

        DROP TABLE IF EXISTS JoueursArticles;
        CREATE TABLE JoueursArticles(
            id_joueur INT FOREIGN KEY REFERENCES Joueurs(id),
            id_article INT FOREIGN KEY REFERENCES Articles(id),
            PRIMARY KEY (id_joueur, id_article)
        );

        DROP TABLE IF EXISTS Photos;
        CREATE TABLE Photos(
            id INT PRIMARY KEY,
            photo BLOB
        );

        DROP TABLE IF EXISTS JoueursPhotos;
        CREATE TABLE JoueursPhotos(
            id_joueur INT FOREIGN KEY REFERENCES Joueurs(id),
            id_photo INT FOREIGN KEY REFERENCES Photos(id),
            PRIMARY KEY (id_joueur, id_photo)
        );

        DROP TABLE IF EXISTS Vidéos;
        CREATE TABLE Vidéos(
            id INT PRIMARY KEY,
            vidéo BLOB
        );

        DROP TABLE IF EXISTS JoueursVidéos;
        CREATE TABLE JoueursVidéos(
            id_joueur INT FOREIGN KEY REFERENCES Joueurs(id),
            id_vidéo INT FOREIGN KEY REFERENCES Vidéos(id),
            PRIMARY KEY (id_joueur, id_vidéo)
        );
    `)
    .run('INSERT INTO Postes (poste) VALUES (?)', [
        'Gardien',
        'Arrière latéral droit',
        'Arriere latéral gauche',
        'Défenseur central 1',
        'Défenseur central 2',
        'Milieu défensif',
        'Milieu gauche',
        'Milieu offensif',
        'Attaquant 1',
        'Milieu droit',
        'Attaquant 2'
    ])
    .all('SELECT * FROM Postes', (err, rows) => {
        if (err) console.error(err.message);
        else console.log('Résultat de la sélection : ', rows)
    })
})


module.exports = db;