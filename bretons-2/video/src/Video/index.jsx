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
	annecdoteAthl,
	annecdoteCompet
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const duration_frame = 100;

	let funcinterpolate = (duration, tab) => {
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
				</div>

				{/* ---------- FIRST PAGE ---------- */}
				<Sequence name='First page' durationInFrames={duration_frame}>
					<div class='main main-first'>
						<div class="title">
							Résultats <br /> du {discipline} <br /> breton
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
				<Sequence name='Seconde page' from={duration_frame + 15} durationInFrames={duration_frame}>
					<div style={{opacity : interpolate(useCurrentFrame()-(duration_frame + 15), [10, 30,duration_frame-10,duration_frame], [0,1,1,0])}} class='main main-second'>
						<div class="tour">{tour}</div>
						<div class="iconeEquipe">
							<div style={{backgroundImage:`url(${staticFile("Handball_France.png")})`}}></div>
							<div style={{backgroundImage:`url(${staticFile("Handball_Norvege.png")})`}}></div>
						</div>
						<div class="equipe">
							France <span style={{ margin: '0 55px' }}>VS</span> {adversaire}
						</div>
						<div class="score">
							<span>{Math.round(Math.min(scoreFr,(useCurrentFrame()-114)/1.5))}</span>
							/ 
							<span>{Math.round(Math.min(scoreAd,(useCurrentFrame()-114)/1.5))}</span>
						</div>
						<div class="bol">
							<Img src= {staticFile("picto_bol.svg")}  />			
						</div>
						<div class="annecdoteMatch"> 
							{annecdoteMatch}
						</div>						
					</div>
				</Sequence>

				{/* ---------- THIRD PAGE ---------- */}
				<Sequence name='Third page' from={(duration_frame + 15)*2} durationInFrames={duration_frame}>
					<div style={{opacity : interpolate(useCurrentFrame()-((duration_frame + 15)*2), [0, 20,duration_frame-10,duration_frame], [0,1,1,0])}} class='main main-third'>
							<div class="nomAthl">
								Avec comme<br/>athèle breton <br/>
								<span>Romain Lagarde</span>
								<Img class="icone" src= {staticFile("triskel.svg")}  />	
							</div>
							<Img class="imgAthl" src= {staticFile("RomainLagarde.png")}  />	
					</div>
				</Sequence>

				{/* ---------- FOURTH PAGE ---------- */}
				<Sequence name='Fourth page' from={(duration_frame + 15)*3} durationInFrames={duration_frame}>
					<div style={{opacity : interpolate(useCurrentFrame()-((duration_frame + 15)*3), [0, 20,duration_frame-10,duration_frame], [0,1,1,0])}} class='main main-fourth'>
						<div class="title">ANECDOTE SUR L'ATHLÈTE :</div>
						<div class="annecdote">
							{annecdoteAthl}
							<Img class="icone" src={staticFile("spot.svg")} placeholder="failed to load" />
						</div>
					</div>
				</Sequence>

				{/* ---------- FITH PAGE ---------- */}
				<Sequence name='Fith page' from={(duration_frame + 15)*4} durationInFrames={duration_frame}>
					<div style={{opacity : interpolate(useCurrentFrame()-((duration_frame + 15)*4), [0, 20,duration_frame-10,duration_frame], [0,1,1,0])}} class='main main-fourth'>
						<div class="title">COMPETITION :</div>
						<div class="annecdote">
							{annecdoteCompet}
							<Img class="icone" src={staticFile("medaille.svg")} placeholder="failed to load" />
						</div>
					</div>
				</Sequence>

				{/* ---------- FINAL PAGE ---------- */}
				<Sequence name='Final page' from={(duration_frame + 15)*5 - 15} durationInFrames={duration_frame + 50}>
					<div style={{opacity : interpolate(useCurrentFrame()-((duration_frame + 15)*5 -15), [10, 20], [0, 1])}} class='main main-final'>
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
                    <p>letelegramme-des-scores.fr</p>
                </div>
            </div>
		</AbsoluteFill>
	);
};
