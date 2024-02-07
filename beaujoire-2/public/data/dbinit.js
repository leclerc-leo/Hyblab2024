const util = require('util');
const sqlite3 = require('sqlite3');
const path = require('path');
const dbname = path.join(__dirname, 'beaujoire-2.db');
const fs = require("fs");

const exists = fs.existsSync(dbname);
// Ouverture de la base de données
let db = new sqlite3.Database(dbname, err => {
    if (err) throw err;
    console.log('Database started: ' + dbname);
});

db.serialize(() => {
    if (!exists) {
        db.exec(`
            DROP TABLE IF EXISTS Nationalités;
            CREATE TABLE Nationalités(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nationalité VARCHAR(50),
                abreviation VARCHAR(3),
                drapeau BLOB    
            );

            DROP TABLE IF EXISTS Postes;
            CREATE TABLE Postes(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                poste VARCHAR(25)
            );

            DROP TABLE IF EXISTS Joueurs;
            CREATE TABLE Joueurs(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nom VARCHAR(50),
                prenom VARCHAR(50),
                age TINYINT,
                naissance DATETIME,
                nationalité1 TINYINT,
                nationalité2 TINYINT,
                poste TINYINT,
                annéeDébut SMALLINT,
                annéeFin SMALLINT,
                selections SMALLINT,
                buts SMALLINT,
                arrets SMALLINT,
                photo BLOB,
                citation VARCHAR(255),
                biographie TEXT,
                FOREIGN KEY(nationalité1) REFERENCES Nationalités(id),
                FOREIGN KEY(nationalité2) REFERENCES Nationalités(id),
                FOREIGN KEY(poste) REFERENCES Postes(id)
            );

            DROP TABLE IF EXISTS Articles;
            CREATE TABLE Articles(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                article BLOB
            );

            DROP TABLE IF EXISTS JoueursArticles;
            CREATE TABLE JoueursArticles(
                id_joueur INTEGER,
                id_article INTEGER,
                PRIMARY KEY (id_joueur, id_article),
                FOREIGN KEY (id_joueur) REFERENCES Joueurs(id),
                FOREIGN KEY (id_article ) REFERENCES Articles(id)
            );

            DROP TABLE IF EXISTS Photos;
            CREATE TABLE Photos(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                photo BLOB
            );

            DROP TABLE IF EXISTS JoueursPhotos;
            CREATE TABLE JoueursPhotos(
                id_joueur INTEGER,
                id_photo INTEGER,
                PRIMARY KEY (id_joueur, id_photo),
                FOREIGN KEY (id_joueur) REFERENCES Joueurs(id),
                FOREIGN KEY (id_photo) REFERENCES Photos(id)
            );

            DROP TABLE IF EXISTS Vidéos;
            CREATE TABLE Vidéos(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                vidéo BLOB
            );

            DROP TABLE IF EXISTS JoueursVidéos;
            CREATE TABLE JoueursVidéos(
                id_joueur INTEGER,
                id_vidéo INTEGER,
                PRIMARY KEY (id_joueur, id_vidéo),  
                FOREIGN KEY (id_joueur) REFERENCES Joueurs(id),
                FOREIGN KEY (id_vidéo) REFERENCES Vidéos(id)
            );

            DROP TABLE IF EXISTS Votes;
            CREATE TABLE Votes(
                token VARCHAR(50) PRIMARY KEY,
                poste1 TINYINT,
                poste2 TINYINT,
                poste3 TINYINT,
                poste4 TINYINT,
                poste5 TINYINT,
                poste6 TINYINT,
                poste7 TINYINT,
                poste8 TINYINT,
                poste9 TINYINT,
                poste10 TINYINT,
                poste11 TINYINT,
                poste12 TINYINT,
                FOREIGN KEY (poste1) REFERENCES Joueurs(id),
                FOREIGN KEY (poste2) REFERENCES Joueurs(id),
                FOREIGN KEY (poste3) REFERENCES Joueurs(id),
                FOREIGN KEY (poste4) REFERENCES Joueurs(id),
                FOREIGN KEY (poste5) REFERENCES Joueurs(id),
                FOREIGN KEY (poste6) REFERENCES Joueurs(id),
                FOREIGN KEY (poste7) REFERENCES Joueurs(id),
                FOREIGN KEY (poste8) REFERENCES Joueurs(id),
                FOREIGN KEY (poste9) REFERENCES Joueurs(id),
                FOREIGN KEY (poste10) REFERENCES Joueurs(id),
                FOREIGN KEY (poste11) REFERENCES Joueurs(id),
                FOREIGN KEY (poste12) REFERENCES Joueurs(id)
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
        db.run(`
        INSERT OR IGNORE INTO Nationalités(nationalité) VALUES 
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
        ('Brésilien', 'BRA'),
        ('Libanais', 'LBN'),
        ('Ghanéen', 'GHA'),
        ('Espagnol', 'ESP'),
        ('Marocain', 'MAR'),
        ('Colombien', 'COL');
        `);

        db.run(`
        INSERT INTO Joueurs(nom, prenom, age, naissance, nationalité1, nationalité2, poste, AnnéeDébut, AnnéeFin, selections, buts, photo, citation, biographie)
        VALUES 
        ('Lafont', 'Alban', 25, '1999-01-23', 1, 2, 1, 2019, NULL, 172, NULL, NULL, 42, 'Après avoir hésité entre le football et le tennis, Alban Lafont tranche. Il débute sa carrière avec le Toulouse FC en 2015, et rejoint le FC Nantes quatre ans plus tard. Après une première saison en demi-teinte, le jeune prodige s’affirme réellement avec les Canaris l’année suivante. Il a récemment prolongé, jusqu’en 2027.'),
        ('Riou', 'Rémy', 36, '1987-08-06', 1, NULL, 1, 2012, 2017, 166, NULL, NULL, 61, NULL),
        ('Landreau', 'Mickaël', 44, '1979-05-14', 1, NULL, 1, 1996, 2006, 421, NULL, NULL, 168, 'Formé au club, Mickaël Landreau joue plus de 400 matchs avec les Canaris, entre 1996 et 2006. Avec eux, il remporte la Coupe de France, en 1999 et 2000, puis le championnat de France en 2001. Aujourd’hui retraité, l’ancien gardien pourrait prochainement participer au rachat du club par le “Collectif nantais”, dont il est à la tête.'),
        ('Marraud', 'David', 59, '1964-08-03', 1, NULL, 1, 1985, 1996, 316, NULL, NULL, 126, 'Le gardien resté 11 ans au FC Nantes a été important lors de la saison 1994-1995 où Nantes a gagné le championnat de Ligue 1. Il quitte le club en 1996 pour aller Perpignan où il finira sa carrière de joueur. Il revient vite dans la région nantaise pour y effectuer différents postes d’entraîneur de gardien. Il avait toujours voulu y retourner puisqu’en 2006, il expliquait au média 20 minutes \“j’y reviendrai, au FC Nantes. Je passe mon diplôme d’entraîneur pour ça\”.'),
        ('Bertrand-Demanes', 'Jean-Paul', 71, '1952-05-23', 1, NULL, 1, 1969, 1987, 651, NULL, NULL, 248, 'Fidèle au FC Nantes tout au long de sa carrière, Jean-Paul Bertrand-Demanes a joué pas moins de 650 matchs et remporté de nombreux titres avec le club des Jaunes-et-Verts, entre 1969 et 1987. “Le Grand” aura donc connu La Beaujoire à la fin de sa carrière. Touché par un cancer, il a récemment publié “Stade 4 - le match de ma vie”, témoignage de sa lutte contre la maladie.'),
        ('Savinaud', 'Nicolas', 48, '1975-11-20', 1, NULL, 2, 1990, 2007, 383, 29, NULL, NULL, 'Polyvalent, Nicolas Savinaud est aussi bien capable de jouer défenseur ou milieu de terrain. Au cours de ses douze années avec les Canaris, entre 1995 et 2007, il a remporté deux fois la coupe de France en 1999 et en 2000, et le championnat de France en 2001. Un peu plus tard, il est l’un des sauveurs du FC Nantes, évitant la descente en ligue 2 en 2005.'),
        ('Perreira Da Silva', 'Fabio', 33, '1990-07-09', 16, 5, 2, 2018, 2023, 96, 7, NULL, NULL, NULL),
        ('Dubois', 'Léo', 29, '1994-09-14', 17, 1, 2, 2008, 2018, 106, 4, NULL, NULL, 'Arrivé au FC Nantes en 2004, en provenance du Mans FC, Léo Dubois gravit rapidement les échelons et signe son premier contrat professionnel en 2012. Il s’impose comme l’un des meilleurs latéraux droit de Ligue 1 et attire l’attention de grands clubs français et européens. En 2018, il rejoint l’Olympique Lyonnais.'),
        ('Le Dizet', 'Serge', 59, '1964-05-27', 1, NULL, 2, 1992, 1998, 207, 0, NULL, NULL, 'Pour la première fois de sa carrière, Serge Le Dizet quitte la Bretagne, et débarque à Nantes en 1992. Joueur incontournable, il participe à l’épopée européenne qui conduit le club nantais en demi-finale de ligue des champions, contre la Juventus. Il prend sa retraite sportive à Nantes en 1998 et commence une carrière d’entraîneur au sein du club. Il commence par entraîner les moins de 18 ans, avant de diriger le centre de formation, puis l’équipe professionnelle en 2005-2006.'),
        ('Bibard', 'Michel', 65, '1958-11-30', 1, NULL, 2, 1975, 1985, 192, 0, NULL, NULL, '/'),
        ('Tusseau', 'Thierry', 66, '1980-08-01', 1, NULL, 3, 2000, 2004, 295, 17, NULL, NULL, '/'),
        ('Pignol', 'Christophe', 54, '1969-10-15', 1, NULL, 3, 1993, 1997, 141, 4, NULL, NULL, 'Arrivé chez les Canaris en 1993, Christophe Pignol connaît la grande époque nantaise. Il remporte le titre de champion de France en 1995 et atteint la demi-finale de la ligue des champions l’année suivante. Sa vie bascule en 2001 lorsqu’il apprend qu’il est atteint d’une leucémie. Une fois guéri, il crée l’Association Christophe Pignol, pour aider les patients atteints de cette maladie.'),
        ('Silva', 'Mario', 46, '1977-04-24', 5, NULL, 3, 2000, 2001, 26, 1, NULL, NULL, '/'),
        ('Bonalair', 'Thierry', 57, '1966-06-14', 1, NULL, 3, 1987, 1992, 161, 0, NULL, NULL, 'Malgré un palmarès vierge, Thierry Bonalair a été un joueur important pour le FC Nantes. Entre 1987 et 1992, le défenseur joue plus de 150 matchs. Interviewé par Ouest-France en 2022, il décrit son premier but professionnel, une frappe lointaine contre le Stade Malherbe de Caen, comme le plus beau moment de sa carrière.'),
        ('Ayache', 'William', 63, '1961-01-10', 1, 12, 3, 1977, 1986, 256, 2, NULL, NULL, 'Footballeur professionnel de 1979 à 1995, sélectionné 20 fois en équipe de France, champion olympique en 1984, deux fois champion de France sous le maillot nantais et vainqueur d’une coupe de France avec Montpellier, William Ayache a un palmarès qui fait pâlir les apprentis footballeurs. Bien que le défenseur ait fait un tour de France des clubs de foot, il garde le FC Nantes comme son club de cœur. Dans une interview pour le site du club nantais, il déclare “quand vous jouez à Nantes, vous êtes marqué à vie”.'),
        ('Armand', 'Sylvain', 43, '1980-08-01', 1, NULL, 3, 2000, 2004, 161, 12, NULL, NULL, 'Sylvain Armand a marqué le FC Nantes par son pied gauche en défense. Bien qu’il ait aidé le club à gagner le titre de champion de France et le Trophée des champions en 2001, il demeure surtout dans la mémoire des Nantais pour son but face à la Lazio en 2002 en Ligue des champions. Après avoir dribblé tous les joueurs du club italien présents sur son couloir, il tire avant même d’entrer dans la surface et marque son but qui deviendra mythique.'),
        ('Desailly', 'Marcel', 55, '1968-09-07', 1, 18, 4, 1980, 1992, 178, 5, NULL, NULL, 'Formé au FC Nantes, le défenseur central est devenu une figure mythique du football français. Il a rejoint la Jonelière grâce à son demi-frère Seth Adonkor qui était lui-même un joueur phare du club ligérien. Vainqueur deux fois de suite de la Ligue des Champions, Champion d’Europe et Champion du monde, Desailly a l’un des plus beaux palmarès du football français.'),
        ('Carlos', 'Diego', 30, '1993-03-15', 16, 19, 4, 2016, 2019, 108, 4, NULL, NULL, '/'),
        ('Naybet', 'Noureddine', 53, '1970-02-10', 20, NULL, 4, 1993, 1994, 41, 1, NULL, NULL, 'Noureddine Naybet ne glane aucun titre au cours de son unique saison avec les Canaris, en 1993-1994. Pourtant, l’international marocain reste un joueur marquant du club par sa célébrité et sa carrière remarquable. Avec les Lions de l’Atlas, il joue 115 matchs et est finaliste de la coupe d’Afrique des nations en 2004.'),
        ('Decroix', 'Eric', 54, '1969-03-07', 1, NULL, 4, 1994, 1999, 192, 7, NULL, NULL, 'Au cours de ses cinq saisons avec le FC Nantes, entre 1994 et 1999, Éric Decroix joue près de 200 matchs. Il remporte la ligue 1 en 1995 et la coupe de France en 1999 avec les Canaris. Après sa carrière de footballeur, il devient entraîneur, puis président de l’US La Baule Le Pouliguen et fonde un cabinet de courtage en assurances.');
    `);//ATTENTION : remettre une virgule à la fin du dernier enregistrement

        /*
Gillet	Nicolas	47	08/11/1976	1	NULL	4	1989	2004	202	17	NULL	/	/	Pilier actuel de la Maison jaune, Nicolas Pallois comptabilise déjà plus de 200 matchs avec les Canaris, en sept saisons. Passé par le centre de formation du Stade Malherbe de Caen, le Normand a explosé en 2010 lors de l’épopée de Quevilly en Coupe de France, qui a atteint la demi-finale de la compétition avant de céder face au Paris Saint-Germain. Relevant systématiquement son short sur le terrain, il justifie cette originalité par le fait que la couture est trop basse et que cela le gêne pour courir et écarter les jambes.
Guyot	Laurent	54	17/12/1969	1	NULL	4	1978	1998	227	6	NULL	/	/	/
Pallois	Nicolas	36	19/09/1987	1	NULL	4	2017	NULL	205	6	NULL	/	/	/
Yepes	Mario	48	13/01/1976	21	1	4	2002	2004	90	7	NULL	/	/	Même si Mario Yepes n’a joué que deux saisons avec les Canaris, entre 2002 et 2004, l’international colombien a laissé une trace indélébile dans le coeur des Jaunes-et-Verts. Malgré un changement de vie radicale après sa jeunesse passée en Colombie et en Argentine, il s’impose très vite dans le onze nantais et devient rapidement l’un des maillons forts de l’équipe. Entre 1999 et 2014, El Rey joue plus de cent matchs avec l’équipe nationale.
Desailly	Marcel	55	07/09/1968	1	18	5	1980	1992	178	5	NULL	/	/	Formé au FC Nantes, le défenseur central est devenu une figure mythique du football français. Il a rejoint la Jonelière grâce à son demi-frère Seth Adonkor qui était lui-même un joueur phare du club ligérien. Vainqueur deux fois de suite de la Ligue des Champions, Champion d’Europe et Champion du monde, Desailly a l’un des plus beaux palmarès du football français.
Carlos	Diego	30	15/03/1993	16	19	5	2016	2019	108	4	NULL	/	/	/
Naybet	Noureddine	53	10/02/1970	20	NULL	5	1993	1994	41	1	NULL	/	/	Noureddine Naybet ne glane aucun titre au cours de son unique saison avec les Canaris, en 1993-1994. Pourtant, l’international marocain reste un joueur marquant du club par sa célébrité et sa carrière remarquable. Avec les Lions de l’Atlas, il joue 115 matchs et est finaliste de la coupe d’Afrique des nations en 2004.
Decroix	Eric	54	07/03/1969	1	NULL	5	1994	1999	192	7	NULL	/	/	Au cours de ses cinq saisons avec le FC Nantes, entre 1994 et 1999, Éric Decroix joue près de 200 matchs. Il remporte la ligue 1 en 1995 et la coupe de France en 1999. Le défenseur central, devenu entraîneur de l’équipe féminine du FC Lorient, confie en 2019 à Ouest-France qu’il a découvert à Nantes que le football était “un art”.
Gillet	Nicolas	47	08/11/1976	1	NULL	5	1989	2004	202	17	NULL	/	/	Pilier actuel de la Maison jaune, Nicolas Pallois comptabilise déjà plus de 200 matchs avec les Canaris, en sept saisons. Passé par le centre de formation du Stade Malherbe de Caen, le Normand a explosé en 2010 lors de l’épopée de Quevilly en Coupe de France, qui a atteint la demi-finale de la compétition avant de céder face au Paris Saint-Germain. Relevant systématiquement son short sur le terrain, il justifie cette originalité par le fait que la couture est trop basse et que cela le gêne pour courir et écarter les jambes.
Guyot	Laurent	54	17/12/1969	1	NULL	5	1978	1998	227	6	NULL	/	/	/
Pallois	Nicolas	36	19/09/1987	1	NULL	5	2017	NULL	205	6	NULL	/	/	/
Yepes	Mario	48	13/01/1976	21	1	5	2002	2004	90	7	NULL	/	/	Même si Mario Yepes n’a joué que deux saisons avec les Canaris, entre 2002 et 2004, l’international colombien a laissé une trace indélébile dans le coeur des Jaunes-et-Verts. Malgré un changement de vie radicale après sa jeunesse passée en Colombie et en Argentine, il s’impose très vite dans le onze nantais et devient rapidement l’un des maillons forts de l’équipe. Entre 1999 et 2014, El Rey joue plus de cent matchs avec l’équipe nationale.
Berson	Mathieu	43	23/02/1980	1	NULL	6	1994	2004	165	7	NULL	/	/	/
Ferri 	Jean-Michel	54	07/02/1969	1	NULL	6	1985	1987	340	24	NULL	/	/	/
Deschamps	Didier	55	15/10/1968	1	NULL	6	1983	1989	123	4	NULL	/	/	Footballeur international français légendaire, Didier Deschamps a été formé au FC Nantes avec lequel il a fait 124 matchs. C’est d’ailleurs à la Jonelière qu’il fait la connaissance de Marcel Desailly avec qui il lie une amitié forte. Son passage parmi les Canaris a été un tremplin pour sa carrière puisqu’il est passé ensuite par les plus grands clubs en France et à l'étranger. En 1999, il écrivait dans une lettre : “Je serai éternellement reconnaissant envers ce club pour tout ce qu’il a pu m’apporter”. Il est aujourd’hui l’entraîneur de l’équipe de France avec laquelle il a gagné une Coupe du Monde, rien que ça.
Karembeu	Christian	53	03/12/1970	1	15	6	1988	1995	153	6	NULL	/	/	/
Savinaud	Nicolas	48	20/11/1975	1	NULL	6	1990	2007	383	29	NULL	/	/	Nicolas Savinaud est sans doute le joueur le plus flexible de l’histoire du FC Nantes. Même s’il préférait jouer milieu de terrain, ses entraîneurs l’ont fait évoluer en défense, à gauche, à droite ou même au poste de gardien lors d’un match contre Troyes pendant la saison 2005-2006. Alors que l’entraîneur avait fait tous ses changements, Mickaël Landreau, gardien des canaris, a été expulsé et remplacé par Savinaud. Un joueur caméléon qui a su être fort à tous les postes. 
Girotto	Andrei	31	17/02/1992	16	10	6	2017	2023	205	12	NULL	/	/	A la fois défenseur central et milieu défensif, Andrei Girotto a rapidement gagné sa place dans l’équipe nantaise. Il est polyvalent et permet à son club de récupérer un grand nombre de ballons. Même s’il est connu pour son rôle défensif, le canari aide beaucoup à la construction du jeu grâce à sa hargne et son endurance. 
Vahirua	Marama	43	12/05/1980	1	NULL	7	1997	2004	141	41	NULL	/	/	/
Moses	Simon	28	12/07/1995	3	NULL	7	2019	NULL	198	33	NULL	/	/	Alors que son père le prédestinait à une carrière dans l’armée, c’est bien dans le football que Moses Simon fait carrière. Arrivé en 2020 au FC Nantes, l’international nigérian cumule déjà plus de 130 matchs avec les Jaunes et Verts. Après un passage à vide en 2023, il a désormais retrouvé son meilleur niveau et a prolongé jusqu’en 2026. En janvier, il a participé à la CAN (mettre si gros résultat).
Ignatius	Ganago	24	16/02/1999	4	NULL	7	2022	NULL	48	6	NULL	/	/	/
Makélélé	Claude	50	18/02/1973	1	7	7	1992	1997	205	12	NULL	/	/	Lors de son recrutement au FC Nantes en décembre 1991, Robert Budzinski, directeur sportif du club déclarait qu’il avait “déniché le futur Alain Giresse”. Même s' il ne marque pas autant de but que ce dernier, Claude Makélélé est considéré comme l’un des meilleurs milieux de terrain de l’histoire. Sous le maillot Jaune et vert, il gagne le championnat de France en 1995. C’est d’ailleurs grâce à ses performances durant cette saison-là, qu'il est sélectionné en Equipe de France. 
Rougier	Valentin	29	07/12/1994	1	NULL	8	2001	2019	135	10	NULL	/	/	Valentin Rongier a été un canari dès son plus jeune âge. Il entre à la Jonelière à l’âge de 7 ans et suit les matchs du FC Nantes très régulièrement en Tribune Loire. En 2014, il signe son premier contrat professionnel et devient rapidement un joueur phare de l’équipe. Un an plus tard, il est victime d’une rupture du ligament croisé lors d’un match face à Caen. Pour le remercier de sa fidélité, le club nantais décide de prolonger son contrat de quatre ans alors qu’il est encore en rééducation. Un geste fort, qu’il décrit comme “une belle marque de confiance” et qui lui permet de briller lors des saisons suivantes. 
Veretout	Jordan	30	01/03/1993	1	NULL	8	2003	2015	146	15	NULL	/	/	Formé au FC Nantes, Jordan Veretout a marqué le club par sa technicité. Il participe à la remontée du club nantais en Ligue 1 à l’issue de la saison 2012-2013. Il est sélectionné plusieurs fois en équipe de France, notamment avec les U18 et les U20. C’est avec ces derniers qu’il gagne la Coupe du monde de 2013 aux côtés de Pogba, Areola et Umtiti. Bercé par le club nantais, son joueur préféré pendant son enfance était Marama Vahirua.
Da Rocha	Frédéric	49	16/09/1974	1	5	8	1990	2009	508	17	NULL	/	/	“Les légendes ne meurent jamais.” Prononcée dans l’ivresse de la victoire pour le maintien en 2005, cette phrase de Frédéric Da Rocha reste aujourd’hui un grand souvenir des supporteurs de La Beaujoire. Légende du FC Nantes, le milieu de terrain reste au club pendant quatorze ans. Il joue son dernier match avec les Verts-et-Jaunes le 30 mai 2009, alors que le club lutte pour le maintien. Les supporteurs déploient alors une banderole pour le soutenir : “Da Rocha, un brave au milieu des épaves”.
Darbion	Stéphane	39	22/03/1984	1	NULL	8	2009	2011	64	7	NULL	/	/	/
Ouédec	Nicolas	52	28/10/1971	1	NULL	9	1986	1989	185	84	NULL	/	/	Attaquant du FC Nantes, Nicolas Ouédec réalise les plus belles performances de sa carrière sous le maillot jaune et vert. Formé au club, il signe son premier contrat professionnel en 1989. Avec Patrice Loko et Reynald Pedros, il forme le trio mythique de l’attaque nantaise. En 1994, Ouédec est élu meilleur buteur du championnat de France et l’année suivante, il remporte le championnat de France avec les Canaris. Alors qu’il a connu de nombreux clubs différents dans sa carrière, il déclare dans une interview à la Tribune Nantaise : “C’est ici (à Nantes, NDLR) que j'ai vécu toutes mes plus belles émotions footballistiques” 
Moldaven	Viorel	51	08/07/1972	6	NULL	9	2000	2004	90	50	NULL	/	/	/
Kolo Muani	Ramdal	25	05/12/1998	1	7	9	2015	2018	87	23	NULL	/	/	/
Djordjevic	Filip	36	28/09/1987	8	NULL	9	2008	2014	198	69	NULL	/	/	/
Sala	Emiliano	28	31/10/1990	9	10	9	2015	2019	133	48	NULL	/	/	Emiliano Sala occupe une place à part dans le cœur des Canaris. Fraîchement arrivé du Stade Malherbe de Caen en 2015, l’Argentin conquiert les supporteurs par son charisme et devient titulaire indiscutable sous l’ère Ranieri. Alors qu'il devait être transféré à Cardiff, il décède tragiquement à la suite d'un crash d'avion, le 21 janvier 2019. Son nom restera gravé à jamais dans l'esprit des supporters nantais.
Grégory	Pujol	44	25/02/1980	1	NULL	9	2001	2005	86	20	NULL	/	/	Originaire de Champagnole, Grégory Pujol débarque au centre de formation en 1997, avant de rejoindre l’équipe première en 2001. Malgré son implication dans le collectif, son histoire avec le club canari se finit à La Beaujoire sous les sifflets, quatre ans plus tard. Il révèle plus tard avoir voulu continuer l’aventure plus longtemps avec le FC Nantes, club qu’il garde dans son cœur.
Touré	José	62	24/04/1961	1	11	10	1976	1986	208	73	NULL	/	/	/
Carrière	Eric	50	24/05/1973	1	NULL	10	1996	2001	172	18	NULL	/	/	Alors qu’on lui a répété toute sa jeunesse qu’il n’avait pas le physique pour être un footballeur professionnel, Eric Carrière n’a pas baissé les bras. C’est à ses 22 ans qu’il rejoint le FC Nantes et qu’il débute sa carrière de joueur professionnel. Avec les Canaris, il remporte deux coupes de France et un championnat de France. Lors de la saison 2000-2001, il est un élément essentiel du club, ce qui lui permet d’être appelé en Equipe de France. La consécration pour un joueur sur qui personne ne misait. 
Burruchaga	Jorge	61	09/10/1962	9	NULL	10	1985	1992	163	30	NULL	/	/	Il fait partie des joueurs difficilement oubliables. Arrivé d’Argentine au FC Nantes en 1985, il est élu dès sa première année au club meilleur joueur étranger du championnat. International argentin, il connaît la gloire l’année suivante, en marquant le but de la victoire en finale de la Coupe de monde. Impliqué quelques années plus tard dans l’affaire VA-OM, il est condamné pour corruption passive et retourne en Argentine terminer sa carrière.
Ziani	Stéphane	52	09/12/1971	1	12	10	1991	1994	243	19	NULL	/	/	/
Gourvennec	Jocelyn	51	22/03/1972	1	NULL	10	1995	1998	109	32	NULL	/	/	Milieu de terrain offensif, Gourvennec porte les couleurs du FC Nantes de 1995 à 1998. Immobilisé pendant cinq mois dès son arrivée au club suite à une rupture du ligament croisé, il dispute une centaine de matchs avec les Canaris après sa blessure. Aujourd’hui entraîneur de l’équipe nantaise, il souligne l’impact de Jean-Claude Suaudeau et Raynald Denoueix sur sa philosophie de jeu. Il explique que diriger le FC Nantes est “une responsabilité immense, mais aussi une source infinie de fierté”
Pedros	Reynald	52	10/10/1971	1	5	10	1986	1996	184	34	NULL	/	/	/
Loko	Patrice	53	06/02/1970	1	7	11	1895	1995	206	49	NULL	/	/	Formé au club, Patrice Loko découvre l’équipe professionnelle nantaise en 1988. Infatigable, il est excellent pour se créer des espaces et déboussoler la défense adverse. À l’issue de la saison 1994-1995, il remporte la Ligue 1 et termine meilleur buteur du championnat, avec 22 buts. Face au PSG, le 19 août 1994, il marque un but d’anthologie, d’un extérieur droit, à la suite d’un une-deux avec Reynald Pedros.
Amisse	Loïc	69	09/08/1954	1	NULL	11	1968	1990	602	112	NULL	/	/	/
N'Doram	Japhet	57	27/02/1966	1	13	11	1990	2007	229	87	NULL	/	/	Le milieu offensif tchadien est un grand fidèle du FC Nantes. Il reste sept ans au club et revient en tant que responsable du recrutement huit ans plus tard. Sur le terrain il a un rôle clé. Auteur de 87 buts sous les couleurs nantaises, il contribue notamment à la victoire du club en championnat de France et en Ligue des champions contre la Juventus en 1995-1996. N’Doram est surnommé le “sorcier de la Beaujoire” grâce à sa technique et son incroyable vision du jeu. 
Suaudeau	Jean-Claude	85	24/05/1938	1	NULL	12	1960	1997	575	NULL	NULL	/	/	/
Der Zakarian	Michel	60	18/02/1963	14	1	12	1979	1988	236	NULL	NULL	/	/	Défenseur central du FC Nantes dans les années 80, il passe de l’autre côté du terrain dix ans plus tard. En 2007 il devient l’entraîneur des Canaris après être passé par Montpellier. Il est connu chez les Jaunes et verts pour avoir fait remonter le club en ligue 1 alors qu’il venait d’être relegué. Remercié peu de temps après, il est engagé à nouveau pour la même chose en 2012. Mission réussie pour l’entraîneur franco-arménien qui marquera ainsi l’histoire du club.
Denoueix	Raynald	75	14/05/1948	1	NULL	12	1966	2001	210	NULL	NULL	/	/	Figure emblématique des Canaris des années 70, c’est en tant qu’entraîneur que Raynald Denoueix découvre La Beaujoire, après le départ soudain de Jean-Claude Suaudeau. Champion de France et vainqueur de la Coupe de France sur le terrain puis sur le banc, il quitte les Nantais après leur sacre en 2002. Devenu entraîneur de la Real Sociedad, il reçoit le prix Don Balon du meilleur entraîneur de la Liga en 2003.
Kombouaré	Antoine	60	16/11/1963	1	15	12	1983	1990	109	NULL	NULL	/	/	Né et formé en Nouvelle-Calédonie, Antoine Kombouaré rejoint le FC-Nantes en 1983 et y reste sept ans. Pendant la saison 2020-2021, il est appelé par le Staff des Canaris pour devenir entraîneur après un début de saison catastrophique à l'issue duquel le club a licencié trois coachs. Kombouaré réalise des miracles avec les Jaunes et vert puisqu’il leur évite la relégation et les aide à gagner le Coupe de France 2022. 
*/
    }
    db.all('SELECT * FROM Joueurs', (err, rows) => {
        if (err) console.error(err.message);
        else console.log('Résultat de la sélection : ', rows)
    });
})

module.exports = db;