// Video.tsx
type Video = {
    id: string;
    title: string;
    subtitle: string;
    thumbnail: string;
    description: string;
    article: {
        title: string;
        subtitle: string;
        content: string;
      } | null;
};

export default Video;