import { Component } from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../actions/user';

class LogoutPage extends Component {
	componentWillMount() {
		const {
			authenticated,
			logoutUser
		} = this.props;

		if (authenticated) {
			logoutUser();
		}
	}

	render() {
		return null;
	}
}

LogoutPage.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	authenticated: PropTypes.bool
};

LogoutPage.defaultProps = {
	authenticated: false
};

const mapStateToProps = state => ({
	authenticated: state.user.loggedIn
});
const mapDispatchToProps = dispatch => ({
	logoutUser: () => dispatch(logout()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogoutPage));
