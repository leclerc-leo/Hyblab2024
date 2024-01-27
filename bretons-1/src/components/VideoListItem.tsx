import { useState } from 'react';
import {LikeButton} from './Likes'; // 引入喜欢按钮组件
import './VideoListItem.css'; // 引入视频列表项的样式

// 定义Video类型
type Video = {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
};

// 定义VideoListItemProps类型
type VideoListItemProps = {
  video: Video;
};

function VideoListItem({ video }: VideoListItemProps) {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked); // 切换喜欢状态
  };

  return (
    <div className="video-list-item">
      <img src={video.thumbnail} alt={video.title} />
      <div className="video-info">
        <h4>{video.title}</h4>
        <LikeButton isLiked={isLiked} onClick={toggleLike} />
      </div>
    </div>
  );
}

export default VideoListItem;
