import {Outlet, Link} from 'react-router-dom'

const Navbar = () => {
    return(
        <>
            <nav className="">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </nav>
            <Outlet/>
        </>
    )
}

export default Navbar;