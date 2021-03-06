/* eslint-disable no-mixed-spaces-and-tabs */
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import App from './ui/App';
import { meFromToken } from '../actions/user';

import '../scss/normalize.scss';
import '../scss/core.scss';
import '../scss/spinner.scss';
import '../scss/app.scss';
import '../scss/mediaqueries.scss';

const mapDispatchToProps = (dispatch) => ({
	loadUserFromToken: (token) => {
		if (!token || token === '') { // if there is no token, dont bother
			return;
		}

		dispatch(meFromToken(token));
	}
});

const mapStateToProps = (state) => ({
	authtoken: state.user.authToken
});

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(App));
