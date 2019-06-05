import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import { MdLock } from 'react-icons/md';
import Loader from '../Loader';
import LoginSocial from './LoginSocial';
import './login.scss';

class LoginForm extends Component {
	state = {
		userName: '',
		password: '',
	};

	onSubmit = e => {
		e.preventDefault();

		const { userName, password } = this.state;
		const { loginUser } = this.props;

		loginUser(userName, password);
	}

	handleInputChange = name => e => {
		this.setState({
			[name]: e.target.value
		});
	}

	render() {
		const {
			userName,
			password
		} = this.state;

		const { isLoading, facebookUrl, googleUrl } = this.props;

		return isLoading ? <Loader /> : (
			<div>
				<form id="Login" className="login-form" onSubmit={this.onSubmit}>
					<div className="login-form-title">
						<h1>Sign in</h1>
					</div>
					<div className="login-form-field">
						<input
							placeholder="Username"
							type="text"
							value={userName}
							onChange={this.handleInputChange('userName')}
						/>
					</div>
					<div className="login-form-field">
						<input
							placeholder="Password"
							type="password"
							value={password}
							onChange={this.handleInputChange('password')}
						/>
					</div>
					<button
						type="submit"
						onClick={this.onSubmit}
						className="login-form-button button button-login button-block"
					>
						<span>Log in</span>
					</button>
				</form>
				<LoginSocial googleUrl={googleUrl} facebookUrl={facebookUrl} />
			</div>
		);
	}
}

LoginForm.propTypes = {
	loginUser: PropTypes.func.isRequired,
	isLoading: PropTypes.bool,
	facebookUrl: PropTypes.string,
	googleUrl: PropTypes.string,
};

LoginForm.defaultProps = {
	isLoading: false,
	facebookUrl: '',
	googleUrl: '',
};

export default LoginForm;
