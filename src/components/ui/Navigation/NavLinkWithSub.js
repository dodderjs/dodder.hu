import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

function getIsActive(to){
	return function(match, location) {
		let locationParts = location.pathname.split('/');
		return match && match.url === location.pathname || locationParts[2] && locationParts[2] === 'details' && to.split('/')[1] === locationParts[1];
	}
}

class NavLinkWithSub extends Component {
	render() {
		let props = {...this.props},
			{menu} = props;
		return  menu.map((menu) => {
			let selectedChild = menu.submenu && menu.submenu.find((c) => c.to === menu.to);
			let {submenu: submenus, id, to, text} = menu;

			return (
				<li className="navItem" key={id} >
					<NavLink to={to} activeClassName="active" isActive={getIsActive(to)}>
						{text}
						<small className="navItem-filter">{ selectedChild && selectedChild.text}</small>
					</NavLink>
					{ submenus && 
						<ul className="submenu">
							{ submenus.map((submenu) =>
								<li className="navItem" key={submenu.id}>
									<NavLink to={submenu.to} activeClassName="active" exact>{submenu.text}</NavLink>
								</li>
							)}
						</ul> }
				</li>
			)
		})
		
	}
}
NavLinkWithSub.propTypes = {
	//user: PropTypes.object.isRequired
	menu: PropTypes.array.isRequired
};

export default NavLinkWithSub;
