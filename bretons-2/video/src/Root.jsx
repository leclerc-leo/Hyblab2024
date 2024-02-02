import {Composition} from 'remotion';
import {HelloWorld} from './HelloWorld';
import {Logo} from './HelloWorld/Logo';
import {Video} from './Video';

// Each <Composition> is an entry in the sidebar!

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
				defaultProps={{
					discipline: 'Handball',
					date: '31/01/2024',
					tour: 'Tour Préliminaire',
					adversaire: 'Norvège',
					scoreFr: 32,
					scoreAd: 29,
					annecdoteMatch: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim",
					annecdoteAthl: "Ce match décisif leur permet d'accéder aux quarts de finale !",
					annecdoteCompet: "C'est la première fois que l'équipe de France de Handball accède aux quarts de finale des JO !"
				}}
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
			{/* Mount any React component to make it show up in the sidebar and work on it individually! */}
			{/* <Composition
				id="OnlyLogo"
				component={Logo}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
			/> */}
		</>
	);
};
