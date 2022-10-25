import './Header.scss';
import {Link, useLocation} from "react-router-dom";

const Header = () => {
    let location = useLocation()
    let excludedPaths = ['/admin']

    if(excludedPaths.includes(location.pathname)){
        return null;
    }

    return (
        <div className="header">
            <div className='header-home'>
                <Link to={'/'}>Home</Link>
            </div>
            <nav className='header-links'>
                <Link to={'/get-moving'}>Get Moving</Link>
                {/*//TODO Make eat healthy an on hover dropdown linking to recipes and learn-more*/}
                <Link to={'/recipes'}>Eat Healthy</Link>
                <Link to={'/games'}>Games</Link>
                <Link to={'/about'}>About</Link>
                <Link to={'/login'} className='login-button'>Login</Link>
            </nav>
        </div>
    )
}

export default Header;