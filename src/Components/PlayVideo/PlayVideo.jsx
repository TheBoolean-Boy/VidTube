import './PlayVideo.css'
import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import { useEffect, useState } from 'react'
import { viewCounter } from '../../viewCounter'
import moment from 'moment'
import { likeCounter } from '../../likeCounter'
import ReactLinkify from 'react-linkify'

function PlayVideo({videoId}) {
  const [videodata, setVideodata] = useState();
  const [channelData, setChannelData] = useState();
  const [commentData, setCommentData] = useState();

  const fetchVideoData = async () =>{
    const api_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
    await fetch(api_url).then(response => response.json()).then(data => setVideodata(data.items[0]))

  }

  const fetchChannelData = async () =>{
    const api_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${videodata?.snippet?.channelId}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
    await fetch(api_url).then( response => response.json()).then( data => setChannelData(data.items[0]))

  }

  const fetchComment = async () => {
    const comment_url =  `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=_${videoId}VB39Jo8mAQ&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
    await fetch(comment_url).then(response => response.json()).then(data => setCommentData(data.items))
  }

  useEffect ( () => {
    fetchVideoData();
  },[videoId])
  
  useEffect ( () => {
    fetchChannelData();
  }, [videodata])

  return (
    <div className='play-video'>

      {/* <video src={video1} controls autoPlay muted></video> */}
      <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      <h3>{videodata?.snippet?.title}</h3>

      <div className="play-video-info">
        <p>{viewCounter(videodata?.statistics?.viewCount)} &bull; {moment(videodata?.snippet?.publishedAt).fromNow()}</p>
        <div>
          <span><img src={like} alt="" />{likeCounter(videodata?.statistics?.likeCount)}</span>
          <span><img src={dislike} alt="" /> </span>
          <span><img src={share} alt="" /> Share</span>
          <span><img src={save} alt="" /> Save</span>
        </div>
      </div>
      <hr />

      <div className="publisher">
        <img src={channelData?.snippet?.thumbnails?.medium?.url} alt="" />
        <div>
          <p>{videodata?.snippet?.channelTitle}</p>
          <span>{likeCounter(channelData?.statistics?.subscriberCount)}</span>
        </div>
        <button>Subscribe</button>
      </div>

      <div className="vid-description">
        <p> <ReactLinkify >{videodata?.snippet?.description}</ReactLinkify></p>
        <hr />
        <h4>{videodata?.statistics?.commentCount} Comments</h4>
        <div className="comment">
          <img src={user_profile} alt="" />
          <div>
            <h3>Jack Nicholson <span>1 day ago</span></h3>
            <p>A global computer network providing a variety of information and cc of interconnected networks using standardized communication protocols.</p>
            <div className="comment-action">
              <img src={like} alt="" />
              <span>244</span>
              <img src={dislike} alt="" />
            </div>
          </div>
        </div>
        
      </div>


    </div>
  )
}

export default PlayVideo;