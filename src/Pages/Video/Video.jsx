import { useParams } from 'react-router-dom';
import PlayVideo from '../../Components/PlayVideo/PlayVideo';
import Recommended from '../../Components/Recommended/Recommended';
import './Video.css'


const Video = () =>{
  const {videoId, setVideoId} = useParams();
  return(
    <div className="play-container">
      <PlayVideo videoId={videoId} />
      <Recommended />
    </div>
      
  )
}

export default Video;