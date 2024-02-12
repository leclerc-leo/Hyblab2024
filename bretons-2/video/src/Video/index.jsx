import {
	AbsoluteFill,
	useCurrentFrame,
	useVideoConfig,
	Sequence,
	Img,
	staticFile,
	spring,
	interpolate,
} from 'remotion';
import"./css/style.css";
import "./css/font.css";

export const Video = ({
	discipline,
	date,
	tour,
	adversaire,
	scoreFr,
	scoreAd,
	annecdoteMatch,
	athlete,
	annecdoteAthl,
	annecdoteCompet,
	genre,
	pictoMatch,
	pictoAthl
}) => {
	const frame = useCurrentFrame(); // return the current frame
	const {fps} = useVideoConfig(); // return the fps of the video

	const duration_frame = 100;

	let funcinterpolate = (duration, tab) => { // function to interpolate the value of the logo
		return interpolate(
			spring({
				frame: frame - duration, // frame where the move up starts
				fps,
			}),
			[0, 1],
			tab // number of pixel the logo moves up
		);
	};

	return (
		
		<AbsoluteFill style={{backgroundColor: 'black'}}>
			
			<div id='background'>	

				<div class='main-stay'>
					<Img style={{transform: `translateY(${funcinterpolate(duration_frame,[0, -150])}px) scale(${funcinterpolate(duration_frame,[1, 0.5])})`}} class="tds" src={staticFile("logo_tds_white.svg")} />
					<Sequence name='Stick element' style={{justifyContent:'center'}} durationInFrames={(duration_frame*2)+15}>
						<div style={{transform: `translateY(${funcinterpolate(duration_frame,[0, -100])}px) scale(${funcinterpolate(duration_frame,[1, 0.3])})`}}  class="line"></div>
					</Sequence>
					<Sequence name='Ball fall' from={(duration_frame + 15)} durationInFrames={(duration_frame + 15)*4-15}>
						<Img class="imgBall" src={staticFile(discipline+'_ball.svg')} style={{ transform: `translateY(${interpolate(useCurrentFrame() - (duration_frame + 15),[0, 15, 25, 33, 40, 50, 55 , 60], [-100, 1100, 975, 1100, 1050, 1100, 1075, 1100],{extrapolateRight: "clamp",})}px) rotate(${interpolate(useCurrentFrame() - (duration_frame + 15),[0, 60, 60*2, 60*3,60*4, 60*5, 60*6, 60*7, 60*8], [0, 0, 360, 360*2, 360*3, 360*4, 360*5, 360*6,360*7],{extrapolateRight: "clamp",})}deg)`,opacity: interpolate(useCurrentFrame() - (duration_frame + 15), [(duration_frame + 15)*4-30, (duration_frame + 15)*4-15], [1, 0])}}/>
					</Sequence>
					<Sequence name = 'imgage Athlete' from={(duration_frame + 15)*2} durationInFrames={(duration_frame + 15)*2+50}>
                        <Img class={"imgAthl "+athlete.replaceAll(' ','')} src= {staticFile(`${athlete.replaceAll(' ','')}.png`)} style={{transform: `translateX(${interpolate(useCurrentFrame() - (duration_frame + 15)*2,[0,40,100,140,210,250],[700,350,350,-100,-100,-550],{ extrapolateRight :"clamp", extrapolateLeft :"clamp" })}px)`,opacity : interpolate(useCurrentFrame()-(duration_frame + 15), [320,340],  [1,0])}}/>
                    </Sequence>

				</div>

				{/* ---------- FIRST PAGE ---------- */}
				<Sequence name='First page' durationInFrames={duration_frame}>
					<div class='main main-first'>
						<div class="title">
							Les <span style={ scoreFr > scoreAd ? {color:'#eecc70'} : {color:'#ff4d4d'}}>
								{genre === "Homme" ? "Bretons" : "Bretonnes"}
							</span>  <br /> ont 
							<span style={ scoreFr > scoreAd ? {color:'#eecc70'} : {color:'#ff4d4d'}}>
								{scoreFr > scoreAd ? " gagné" : " perdu"}
							</span>  <br /> au <span style={ scoreFr > scoreAd ? {color:'#eecc70'} : {color:'#ff4d4d'}}>{discipline} !</span> 
						</div>
						<div class="icone">
							<Img src={staticFile("picto_bretagne.svg")} />
							<Img src={staticFile(`picto_${discipline}.svg`)} />
						</div>
						<div class="date">
							Date du {date}
						</div>
					</div>
				</Sequence>

				{/* ---------- SECONDE PAGE ---------- */}
				<Sequence name='Seconde page' from={duration_frame} durationInFrames={duration_frame + 30}>
					<div style={{opacity : interpolate(useCurrentFrame()-(duration_frame), [10, 30,duration_frame-10,duration_frame+30], [0,1,1,0])}} class='main main-second'>
						<div class="tour">{tour}</div>
						<div class="equipe">
							<span class="nomEquipe">France</span>
							<span style={{ margin: '0 55px' }}>VS</span>
							<span class="nomEquipe">{adversaire}</span>
						</div>
						<div class="score">
							<span style={ scoreFr > scoreAd ? {color:'#eecc70'} : {color:'#ff4d4d'}}>
								{Math.round(Math.min(scoreFr,(useCurrentFrame()-110)/(50/scoreFr)))}
							</span>
							/ 
							<span>{Math.round(Math.min(scoreAd,(useCurrentFrame()-110)/(50/scoreAd)))}</span>
						</div>
						<div class="pictoMatch">
							<Img src= {staticFile(`${pictoMatch}.svg`)}  />			
						</div>
						<div class="annecdoteMatch" style={{ opacity: interpolate(useCurrentFrame() - ((duration_frame + 50	)), [0, 20], [0, 1]) }}> 
							{annecdoteMatch}
						</div>						
					</div>
				</Sequence>

				{/* ---------- THIRD PAGE ---------- */}
				<Sequence name='Third page' from={(duration_frame + 15)*2} durationInFrames={duration_frame}>
					<div style={{opacity : interpolate(useCurrentFrame()-((duration_frame + 15)*2), [0, 20,duration_frame-10,duration_frame], [0,1,1,0])}} class='main main-third'>
							<div class="nomAthl">
								Avec comme<br/>athèle breton <br/><span>
								{
								athlete.split(' ').map((t, i) => {
												const delay = i * 10;
												const frame = useCurrentFrame();

												return (<div style={{
														transform: `scale(${
															interpolate(
																(useCurrentFrame()-((duration_frame + 15)*2)-25) -delay,
																[0, 10],
																[0,1],
																{
																	extrapolateRight: 'clamp',
																	extrapolateLeft: 'clamp'
																}
															)
														})`
													}}>{t}</div>);
											})}
								</span>
								{/* Romain Lagarde */}
								<Img class="icone" src= {staticFile(`${pictoAthl}.svg`)}  />	
							</div>
					</div>
				</Sequence>

				{/* ---------- FOURTH PAGE ---------- */}
				<Sequence name='Fourth page' from={(duration_frame + 15)*3} durationInFrames={duration_frame+30}>
					<div style={{opacity : interpolate(useCurrentFrame()-((duration_frame + 15)*3), [0, 20,duration_frame-10,duration_frame+30], [0,1,1,0])}} class='main main-fourth'>
						<div class="title">Pour l'anecdote,</div>
						<div class="annecdote">
							{annecdoteAthl}
						</div>
					</div>
				</Sequence>

				{/* ---------- FITH PAGE ---------- */}
				<Sequence name='Fith page' from={(duration_frame + 15)*4+30} durationInFrames={duration_frame+20}>
					<div style={{opacity : interpolate(useCurrentFrame()-((duration_frame + 15)*4+30), [0, 20,duration_frame-10,duration_frame+20], [0,1,1,0])}} class='main main-fith'>
						<div class="title">Dans cette compétition,</div>
						<div class="annecdote">
							{annecdoteCompet}
							<Img style={{transform: ` rotateZ(${interpolate(useCurrentFrame()-((duration_frame + 15)*4),[0, 25,50,75,100],[0, -10,0,10,0],{extrapolateRight: 'clamp',extrapolateLeft: 'clamp'})}deg)`}} class="icone" src={staticFile("medaille.svg")} placeholder="failed to load" />
						</div>
					</div>
				</Sequence>

				{/* ---------- FINAL PAGE ---------- */}
				<Sequence name='Final page' from={(duration_frame + 15)*5 +5} durationInFrames={duration_frame + 50}>
					<div style={{opacity : interpolate(useCurrentFrame()-((duration_frame + 15)*5 +5), [10, 20], [0, 1])}} class='main main-final'>
						<div style={{transform: `translateY(${funcinterpolate(duration_frame,[0,-100])}px)`}} >
							<Img  src={staticFile("LogoJO.svg")} />
							<div class="line"></div>
						</div>
						<Sequence name='logo telegrame final' from={35}>
							<div class="main-img2" style={{opacity : interpolate(useCurrentFrame()-((duration_frame + 15)*5)-30, [10, 60], [0, 1])}}  > 
								<Img class="telegramme" src={staticFile("Logo_telegramme.jpg")} />
								<Img class="tds" src={staticFile("logo-tds.svg")} />
							</div>
						</Sequence>
					</div>
				</Sequence>


	


                <div id="footer">
                    <p>letelegramme.fr</p>
                </div>
            </div>
		</AbsoluteFill>
	);
};
