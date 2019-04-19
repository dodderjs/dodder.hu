import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import LoginPage from '../pages/LoginPage';

class PrivateRoute extends Route {
	render() {
		const { authenticated } = this.props;

		return authenticated ? super.render() : (
			<LoginPage {...this.props} />
		);
	}
}

PrivateRoute.propTypes = {
	location: ReactRouterPropTypes.location.isRequired,
	authenticated: PropTypes.bool,
};

PrivateRoute.defaultProps = {
	authenticated: false,
};

const mapStateToProps = state => ({
	authenticated: !!(state.user.authToken && state.user.userName),
});

export default withRouter(connect(mapStateToProps)(PrivateRoute));
