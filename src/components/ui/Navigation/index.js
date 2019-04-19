import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavLinkWithSub from './NavLinkWithSub';

class Navigation extends Component {
	render() {
		let props = this.props;

		return (
			<nav id="Menu">
				<ul className="navigation">
					<NavLinkWithSub menu={props.navigation} className='navItem' />
				</ul>
			</nav>
		);
	}
}

Navigation.propTypes = {
	navigation: PropTypes.array.isRequired
};
export default Navigation
