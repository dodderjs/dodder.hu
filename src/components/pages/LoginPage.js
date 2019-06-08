import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Redirect, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { login } from '../../actions/user';
import LoginForm from '../ui/LoginForm';
import { API_ROOT, BASE_URL } from '../../config';

class LoginPage extends Component {
	render() {
		const {
			authenticated, loginUser, isLoading,
			location: { from = '/' }
		} = this.props;

		return authenticated ? (<Redirect to={from} />) : (
			<div id="LoginPage">
				<LoginForm
					loginUser={loginUser}
					isLoading={isLoading}
					facebookUrl={`${API_ROOT}/auth/facebook?callbackUrl=${BASE_URL}`}
					googleUrl={`${API_ROOT}/auth/google?callbackUrl=${BASE_URL}`}
				/>
			</div>
		);
	}
}

LoginPage.propTypes = {
	location: ReactRouterPropTypes.location.isRequired,
	loginUser: PropTypes.func.isRequired,
	authenticated: PropTypes.bool,
	isLoading: PropTypes.bool
};

LoginPage.defaultProps = {
	authenticated: false,
	isLoading: false
};

const mapStateToProps = state => ({
	authenticated: state.user.loggedIn,
	isLoading: state.user.isLoading
});
const mapDispatchToProps = dispatch => ({
	loginUser: (userName, password) => dispatch(login(userName, password)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
