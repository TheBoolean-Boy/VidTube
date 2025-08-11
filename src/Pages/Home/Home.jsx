import Feed from '../../Components/Feed/Feed';
import Sidebar from '../../Components/Sidebar/Sidebar';
import './Home.css'


function Home({sidebar}) {
  return (
    <>
      <Sidebar  sidebar={sidebar}/>
      <div className = {`container ${sidebar? '':'large-container'}`}>
        <Feed />
      </div>
    </>
  )
}

export default Home;