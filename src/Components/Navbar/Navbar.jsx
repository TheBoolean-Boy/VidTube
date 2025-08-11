import './Navbar.css'
import logo from '../../assets/logo.png'
import menu_icon from '../../assets/menu.png'
import search_icon from '../../assets/search.png'
import more_icon from '../../assets/more.png';
import upload_icon from '../../assets/upload.png'
import notification_icon from '../../assets/notification.png'
import profile_icon from '../../assets/jack.png'
import { Link } from 'react-router-dom';

function Navbar({setSidebar}) {
  return (
    <nav className='flex-div'>

      <div className="flex-div nav-left">
        <img src={menu_icon} alt="" className='menu-icon' 
          onClick={ () => setSidebar(prev => prev === false? true: false)}
        />
        <Link to="/"><img src={logo} alt="" className='logo' /></Link>
      </div>

      <div className="flex-div nav-middle">
        <div className="flex-div search-box">
          <input type="text" placeholder='Search' />
          <img src={search_icon} alt="" />
        </div>

      </div>

      <div className="flex-div nav-right">
        <img src={upload_icon} alt="" />
        <img src={more_icon} alt="" />
        <img src={notification_icon} alt="" />
        <img src={profile_icon} className='user-icon' alt="" />
      </div>
    </nav>
  )
}

export default Navbar;