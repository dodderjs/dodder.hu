import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import NavWithSub from './NavWithSub';

class Navigation extends Component {
	static propTypes = {
		navigation: PropTypes.arrayOf(PropTypes.object).isRequired,
		location: ReactRouterPropTypes.location.isRequired
	}

	render() {
		const { location, navigation } = this.props;

		return (
			<nav id="Menu">
				<NavWithSub menu={navigation} className="navItem" location={location} />
			</nav>
		);
	}
}

export default Navigation;
