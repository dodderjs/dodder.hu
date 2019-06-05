/* eslint-disable no-mixed-spaces-and-tabs */
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { meFromToken } from '../actions/user';
import App from './ui/App.js';

import '../scss/normalize.scss';
import '../scss/core.scss';
import '../scss/spinner.scss';
import '../scss/app.scss';
import '../scss/mediaqueries.scss';

const mapDispatchToProps = (dispatch) => {
	return {
		loadUserFromToken: (token) => {
			if(!token || token === '') {//if there is no token, dont bother
				return;
			}

			dispatch(meFromToken(token))
		}
	}
}

const mapStateToProps = (state) => {
	return {
		authtoken: state.user.authToken
	};
};

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(App));
