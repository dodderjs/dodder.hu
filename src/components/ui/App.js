import React, { Component } from 'react';
import Navigation from '../containers/Navigation';
import PropTypes from 'prop-types';

import '../../scss/normalize.scss';
import '../../scss/core.scss';
import '../../scss/spinner.scss';
import '../../scss/app.scss';
import '../../scss/mediaqueries.scss';

export default class App extends Component {
	componentDidMount() {
		if (this.props.authtoken) {
			this.props.loadUserFromToken(this.props.authtoken);
		}
	}

	render() {
		return (
			<div className="app">
				<Navigation />
				{this.props.children}
			</div>
		);
	}

	static propTypes = {
		children: PropTypes.oneOfType([
			PropTypes.arrayOf(PropTypes.node),
			PropTypes.node
		]),
		loadUserFromToken: PropTypes.func.isRequired,
		authtoken: PropTypes.string
	}
}
