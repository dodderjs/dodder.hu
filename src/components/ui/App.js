import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navigation from '../containers/Navigation';

import '../../scss/normalize.scss';
import '../../scss/core.scss';
import '../../scss/spinner.scss';
import '../../scss/app.scss';
import '../../scss/mediaqueries.scss';

export default class App extends Component {
	static propTypes = {
		children: PropTypes.oneOfType([
			PropTypes.arrayOf(PropTypes.node),
			PropTypes.node
		]),
		loadUserFromToken: PropTypes.func.isRequired,
		authtoken: PropTypes.string
	}

	static defaultProps = {
		children: [],
		authtoken: ''
	}

	componentDidMount() {
		const { authtoken, loadUserFromToken } = this.props;
		if (authtoken) {
			loadUserFromToken(authtoken);
		}
	}

	render() {
		const { children } = this.props;
		return (
			<div className="app">
				<Navigation />
				{ children }
			</div>
		);
	}
}
