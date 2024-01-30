import {spring} from 'remotion';
import {
	AbsoluteFill,
	interpolate,
	Sequence,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import"./style.css";
import "./font.css";

export const Video = () => {
	const frame = useCurrentFrame();
	const {durationInFrames, fps} = useVideoConfig();

	// A <AbsoluteFill> is just a absolutely positioned <div>!
	return (
		<AbsoluteFill style={{backgroundColor: 'black'}}>
			<div id='background' style={{ }}>
			<div id='main'></div>
			<div id="footer" >
				<p>letelegramme-des-scores.fr</p>
			</div>
			</div>
			
		</AbsoluteFill>
	);
};
