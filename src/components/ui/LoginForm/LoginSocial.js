/* eslint-disable max-len */
/* eslint-disable consistent-return */
import React from 'react';
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';
import { GOOGLE_CLIENT_ID } from '../../../config';

const LoginSocial = (props) => {
	const { loginSocial } = props;

	return (
		<div className="login-social">
			<div className="login-social--or">or</div>
			<div className="login-social--buttons">
				<GoogleLogin
					clientId={GOOGLE_CLIENT_ID}
					buttonText="Sign in with Google+"
					onSuccess={(user) => loginSocial('google', user.getAuthResponse().id_token)}
					cookiePolicy="single_host_origin"
					className="button google-login button-login"
				/>
			</div>
		</div>
	);
};

LoginSocial.propTypes = {
	loginSocial: PropTypes.func.isRequired
};

export default LoginSocial;
