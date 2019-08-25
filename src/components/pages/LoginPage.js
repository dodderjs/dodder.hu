import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Redirect, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { login, loginSocial } from '../../actions/user';
import LoginForm from '../ui/LoginForm';

class LoginPage extends Component {
	render() {
		const {
			authenticated, loginUser, isLoading,
			loginUserSocial,
			location: { from = '/' }
		} = this.props;

		return authenticated ? (<Redirect to={from} />) : (
			<div id="LoginPage">
				<LoginForm
					loginUser={loginUser}
					isLoading={isLoading}
					loginSocial={loginUserSocial}
				/>
			</div>
		);
	}
}

LoginPage.propTypes = {
	location: ReactRouterPropTypes.location.isRequired,
	loginUser: PropTypes.func.isRequired,
	loginUserSocial: PropTypes.func.isRequired,
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
	loginUserSocial: (type, code) => dispatch(loginSocial(type, code))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
