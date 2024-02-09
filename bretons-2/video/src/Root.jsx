import {Composition, staticFile} from 'remotion';
import {HelloWorld} from './HelloWorld';
import {Logo} from './HelloWorld/Logo';
import {Video} from './Video';

// Each <Composition> is an entry in the sidebar!

const calculateMetadata = async () => {
	const dataMatch = await fetch(staticFile('Donnée/match.json'));
	const match = await dataMatch.json();

	const dataEquipe = await fetch(staticFile('Donnée/equipe.json'));
	const equipe = await dataEquipe.json();

	const dataJoueur = await fetch(staticFile('Donnée/joueur.json'));
	const joueur = await dataJoueur.json();

	let i = 0;

	let intAnnecdoteJ = Math.floor(Math.random() * 4);
	let intAnnecdoteE = Math.floor(Math.random() * 3);
	let annecdoteMatch;
	if (match[i].Victoire_Défaite === "V") {
		annecdoteMatch = match[i].Anecdote_victoire;
	}
	else {
		annecdoteMatch = match[i].Anecdote_défaite;
	}

	let annecdoteEquipe;
	for (let e = 0; e < equipe.length; e++) {
		if (equipe[e].Sport === match[i].Sport && equipe[e].Sexe === match[i].Sexe) {
			annecdoteEquipe = equipe[e].Anecdote[intAnnecdoteE];
		}
	}

	return {
		props: {
			discipline : match[i].Sport,
			athlete : match[i].Athlete,
			date : match[i].Date,
			tour : match[i].Epreuve,
			adversaire : match[i].Adversaire,
			scoreFr : match[i].Resultat,
			scoreAd : match[i].Resultat_adversaire,
			annecdoteMatch : annecdoteMatch,
			annecdoteAthl : joueur[match[i].Athlete][intAnnecdoteJ],
			annecdoteCompet : annecdoteEquipe,
		},
	};
};

export const RemotionRoot = () => {
		return (
			<>
				<Composition
					id="Video"
					component={Video}
					durationInFrames={710}
					fps={30}
					width={720}
					height={1280}
					calculateMetadata={calculateMetadata}
				/>
				<Composition
					// You can take the "id" to render a video:
					// npx remotion render src/index.jsx <id> out/video.mp4
					id="HelloWorld"
					component={HelloWorld}
					durationInFrames={150}
					fps={30}
					width={720}
					height={1280}
					// You can override these props for each render:
					// https://www.remotion.dev/docs/parametrized-rendering
					defaultProps={{
						titleText: 'Welcome to Remotion',
						titleColor: 'black',
					}}
				/>
			</>
		);
};
