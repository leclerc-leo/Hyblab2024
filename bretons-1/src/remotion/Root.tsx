import { Sequence } from "remotion";
import { Frame1 } from "./Frame1";
import { Frame2 } from "./Frame2";
import { Frame3 } from "./Frame3";
import { Frame4 } from "./Frame4";

export const MyVideo = () => {
  return (
    <>
      <Sequence from={0} durationInFrames={120}>
        <Frame1 text="Julie Bresset" titre="Médaillée d'or" sous_titre="VTT cross country"></Frame1>
      </Sequence>
      <Sequence from={120} durationInFrames={120}>
        <Frame2></Frame2>
      </Sequence>
      <Sequence from={240} durationInFrames={120}>
        <Frame3 text="Hello world"></Frame3>
      </Sequence>
      <Sequence from={360}>
        <Frame4 text="t"></Frame4>
      </Sequence>
    </>
  );
};