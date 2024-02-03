import { Sequence } from "remotion";
import { Frame1 } from "./Frame1";
import { Frame2 } from "./Frame2";
import { Frame3 } from "./Frame3";
import { Frame4 } from "./Frame4";
import { Frame5 } from "./Frame5";
import { Frame6 } from "./Frame6";
import athleteData from '../data/Athlete.json';
import { Athlete, EventDataItem, Podium} from '../components/type';
import EventData from '../data/Event.json';
interface MyVideoProps {
  id: string;
}
export const MyVideo: React.FC<MyVideoProps> = ({ id }) => {
  const allEventsData: EventDataItem[] = (EventData.Event.flat() as EventDataItem[]);

  let eventData = allEventsData.find(e => e.IdEvent == Number(id));
  const allAthletesData = athleteData.Athlete.reduce((allAthletes: Athlete[], athletesArray: Athlete[]) => {
      return allAthletes.concat(athletesArray);
    }, []);
  let athlete = allAthletesData.find(a => a.Athlete == eventData?.Athlete)
  if(athlete == undefined || eventData == undefined) {
    return (<></>);
  }
  const showFrame6 = eventData.Gain !== "Qualifie" && eventData.Gain !== "";
  return (
    <>
      <Sequence from={0} durationInFrames={340}>
        <Frame1 text={athlete.Athlete} sexe={athlete.Sexe} gain={eventData.Gain} rang={eventData.Rang} sous_titre={eventData.Epreuve} image={athlete.Photo}></Frame1>
      </Sequence>
      <Sequence from={340} durationInFrames={350}>
        <Frame4 Gentilé={athlete.Gentilé} gain={eventData.Gain} Epreuve={eventData.Epreuve} sexe={athlete.Sexe} Sport={eventData.Sport} Epreuve_1={eventData.Epreuve__1}></Frame4>
      </Sequence>
      <Sequence from={660} durationInFrames={240}>
        <Frame2 podium={eventData["Podium (nom + résultat)"] as Podium[]} />
      </Sequence>
      <Sequence from={900} durationInFrames={240}>
        <Frame3 text={athlete.Athlete}></Frame3>
      </Sequence>
      <Sequence from={1140} durationInFrames={300}>
        <Frame5 nom="nom" age="Age" taille="Taille" sport="Sport" fun_fact="Fun fact" fun_fact_texte="Fun fact sur l'athlète"></Frame5>
      </Sequence>
      {showFrame6 &&  (
        <Sequence from={1440} durationInFrames={240}>
          <Frame6 sex={athlete.Sexe} />
        </Sequence>
      )}
    </>
  );
};