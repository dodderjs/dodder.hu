import React, { Component } from 'react';
import { matchPath } from 'react-router';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import Sub from './Sub';

function getIsActive(to) {
	return (match, location) => {
		const locationParts = location.pathname.split('/');
		return (match && match.url === location.pathname)
		|| (locationParts[2] && locationParts[2] === 'details' && to.split('/')[1] === locationParts[1]);
	};
}

const escapedPath = (path) => path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1');

class NavWithSub extends Component {
	hasActiveSubmenu = false;

	static propTypes = {
		menu: PropTypes.arrayOf(PropTypes.object).isRequired,
		location: ReactRouterPropTypes.location.isRequired
	}

	render() {
		const { location, menu } = this.props;

		const content = menu.map((mainmenu) => {
			const selectedChild = mainmenu.submenu && mainmenu.submenu.find((c) => c.to === mainmenu.to);
			const {
				submenu: submenus, id, to, text
			} = mainmenu;

			this.hasActiveSubmenu = this.hasActiveSubmenu
			|| (submenus && getIsActive(to)(matchPath(location.pathname, { path: escapedPath(to) }), location));

			return (
				<li className="navItem" key={id}>
					<NavLink to={to} activeClassName="active" isActive={getIsActive(to)}>
						{text}
						<small className="navItem-filter">{ selectedChild && selectedChild.text}</small>
					</NavLink>
					{ submenus
						&& (
							<ul className="submenu">
								{ submenus.map((submenu) => <Sub to={submenu.to} key={submenu.id}>{submenu.text}</Sub>)}
							</ul>
						) }
				</li>
			);
		});

		return (
			<ul className={`navigation${this.hasActiveSubmenu ? ' navigation--has-active-submenu' : ''}`}>
				{
					content
				}
			</ul>
		);
	}
}

export default NavWithSub;
