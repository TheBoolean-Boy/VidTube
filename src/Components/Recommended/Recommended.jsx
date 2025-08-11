
import './Recommended.css'
import thumbnail1 from '../../assets/thumbnail1.png'
import thumbnail2 from '../../assets/thumbnail2.png'
import thumbnail3 from '../../assets/thumbnail3.png'
import thumbnail4 from '../../assets/thumbnail4.png'
import thumbnail5 from '../../assets/thumbnail5.png'
import thumbnail6 from '../../assets/thumbnail6.png'
import thumbnail7 from '../../assets/thumbnail7.png'
import thumbnail8 from '../../assets/thumbnail8.png'
import { useEffect, useState } from 'react'
import { viewCounter } from '../../viewCounter'
import moment from 'moment'

function Recommended({ categoryId }) {
  const [data, setData] = useState();

  const recommedData = async () => {
    const video_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${categoryId===0?28 :categoryId}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`;
    await fetch(video_url).then(response => response.json()).then(data => setData(data.items))
  }

  useEffect ( () =>{
    recommedData();
  },[categoryId])

  return (

    <div className='recommended'>

      {
        data?.map((item, index) => {
          return (
            <div key={index} className="side-video-list">
              <img src={item.snippet.thumbnails.medium.url} alt="" />
              <div className="vid-info">
                <h4>{item.snippet.localized.title}</h4>
                <p>{item.snippet.channelTitle}</p>
                <p>{viewCounter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
              </div>
            </div>
          )
        })
      }

    </div>
  )
}

export default Recommended;