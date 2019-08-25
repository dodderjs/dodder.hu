/* eslint-disable max-len */
/* eslint-disable consistent-return */
import React from 'react';
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GOOGLE_CLIENT_ID, FACEBOOK_CLIENT_ID } from '../../../config';

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
				<FacebookLogin
					appId={FACEBOOK_CLIENT_ID}
					autoLoad
					cssClass="button facebook-login button-login"
					fields="name,email,picture"
					callback={(user) => loginSocial('facebook', user)}
					icon="fa-facebook"
					render={(renderProps) => (
						<button type="button" disabled={renderProps.isDisabled} className="button facebook-login button-login">
							<span className="button-icon">
								<svg viewBox="0 0 33 33" width="28px" height="28px" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g><path d="M 17.996,32L 12,32 L 12,16 l-4,0 l0-5.514 l 4-0.002l-0.006-3.248C 11.993,2.737, 13.213,0, 18.512,0l 4.412,0 l0,5.515 l-2.757,0 c-2.063,0-2.163,0.77-2.163,2.209l-0.008,2.76l 4.959,0 l-0.585,5.514L 18,16L 17.996,32z" /></g></svg>
							</span>
							<span className="button-label">Sign in with Facebook</span>
						</button>
					)}
				/>
			</div>
		</div>
	);
};

LoginSocial.propTypes = {
	loginSocial: PropTypes.func.isRequired
};

export default LoginSocial;
