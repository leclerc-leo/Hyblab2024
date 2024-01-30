import {spring} from 'remotion';
import {
	AbsoluteFill,
	interpolate,
	Sequence,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import"./css/style.css";
import "./css/font.css";

export const Video = () => {
	const frame = useCurrentFrame();
	const {durationInFrames, fps} = useVideoConfig();

	// A <AbsoluteFill> is just a absolutely positioned <div>!
	return (
		<AbsoluteFill style={{backgroundColor: 'black'}}>
			<div id='background'>
			<div id='main'></div>
			<div id="footer" >
				<p>letelegramme-des-scores.fr</p>
			</div>
			</div>
			
		</AbsoluteFill>
	);
};
