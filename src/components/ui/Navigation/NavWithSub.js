import React, {Component} from 'react';
import { __RouterContext as RouterContext, matchPath } from "react-router";
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Sub from './Sub';
import ReactRouterPropTypes from 'react-router-prop-types';

function getIsActive(to){
	return function(match, location) {
		let locationParts = location.pathname.split('/');
		return match && match.url === location.pathname || locationParts[2] && locationParts[2] === 'details' && to.split('/')[1] === locationParts[1];
	}
}

const escapedPath = (path) => path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");

class NavWithSub extends Component {
	hasActiveSubmenu = false;
	render() {
		const { location, menu} = this.props;

		const content = menu.map((menu) => {
			let selectedChild = menu.submenu && menu.submenu.find((c) => c.to === menu.to);
			let {submenu: submenus, id, to, text} = menu;

			this.hasActiveSubmenu = this.hasActiveSubmenu || submenus && getIsActive(to)(matchPath(location.pathname, { path: escapedPath(to) }), location);

			return (
				<li className="navItem" key={id} >
					<NavLink to={to} activeClassName="active" isActive={getIsActive(to)}>
						{text}
						<small className="navItem-filter">{ selectedChild && selectedChild.text}</small>
					</NavLink>
					{ submenus && 
						<ul className="submenu">
							{ submenus.map((submenu) =>
								<Sub to={submenu.to} key={submenu.id}>{submenu.text}</Sub>
							)}
						</ul> }
				</li>
			)
		});
		
		return  (
			<ul className={`navigation${ this.hasActiveSubmenu ? ' navigation--has-active-submenu' : '' }`}>{
				content
			}</ul>)
	}
}
NavWithSub.propTypes = {
	//user: PropTypes.object.isRequired
	menu: PropTypes.array.isRequired,
	match: ReactRouterPropTypes.match,
	location: ReactRouterPropTypes.location
};

export default NavWithSub;
