// Fichier: RemotionContent.tsx

import { Composition, Video } from 'remotion';

interface RemotionContentProps {
  title: string;
  videoSrc: string;
  content: string;
}

export const RemotionContent: React.FC<RemotionContentProps> = ({ title, videoSrc, content }) => {
  // Générez un ID de composition en remplaçant les caractères non autorisés par des tirets
  const compositionId = `RemotionContent_${title.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()}`;

  return (
    <Composition
      id={compositionId}
      component={RemotionContentInner}
      durationInFrames={240}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{ title, videoSrc, content }}
    />
  );
};

const RemotionContentInner: React.FC<RemotionContentProps & { [key: string]: unknown }> = ({ videoSrc}) => {
  return (
    <div
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}
    >
      <Video src={videoSrc} />
    </div>
  );
};
