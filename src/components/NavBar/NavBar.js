import './NavBar.css';
import { Link, NavLink } from 'react-router-dom';

let activeStyle = {
    textDecoration: "underline",
	color: "orange"
};

const Nav = () => {
	return (
		<nav className="Navigation">
			<NavLink to="/" className="nav-link" style={({isActive }) => isActive ? activeStyle : undefined }>
				PROFILE
			</NavLink>
			<NavLink to="/products" className="nav-link" style={({isActive }) => isActive ? activeStyle : undefined }>
				PRODUCTS
			</NavLink>
			<NavLink to="/sales" className="nav-link" style={({isActive }) => isActive ? activeStyle : undefined }>
				SALES
			</NavLink>
		</nav>
	);	
};

export default Nav;