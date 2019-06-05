import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavWithSub from './NavWithSub';

class Navigation extends Component {
	render() {
		let props = this.props;

		return (
			<nav id="Menu">
				<NavWithSub menu={props.navigation} className='navItem' location={props.location} />
			</nav>
		);
	}
}

Navigation.propTypes = {
	navigation: PropTypes.array.isRequired
};
export default Navigation
