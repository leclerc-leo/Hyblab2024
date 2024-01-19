import { AbsoluteFill, Img } from "remotion";
 
export const CompImg: React.FC = () => {
  return (
    <AbsoluteFill>
      <Img src={"https://picsum.photos/200/300"} placeholder={""} />
    </AbsoluteFill>
  );
};