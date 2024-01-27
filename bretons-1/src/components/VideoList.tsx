import VideoListItem from './VideoListItem'; // 引入视频列表项组件
import './VideoList.css'; // 引入视频列表的样式
import runningWomenThumbnail from '../assets/video_cover/running_women.jpg';
import tennisThumbnail from '../assets/video_cover/tennis.jpg';
const videosData = [
    {
        id: '1',
        title: 'Sounkamba Sylla, médaillée d\'or !',
        thumbnail: runningWomenThumbnail,
        description: 'En tête tout du long de la course, Sounkamba termine avec plus d\'1 seconde d\'avance sur ses adversaires.'
      },
      {
        id: '2',
        title: 'Maria Sharapova, médaillée de bronze !',
        thumbnail: tennisThumbnail,
        description: 'En tête tout du long de la course, Sounkamba termine avec plus d\'1 seconde d\'avance sur ses adversaires.'
      }
];

function VideoList() {
  return (
    <div className="video-list">
      {videosData.map(video => (
        <VideoListItem key={video.id} video={video} />
      ))}
    </div>
  );
}

export default VideoList;
