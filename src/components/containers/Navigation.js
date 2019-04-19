import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Navigation from '../ui/Navigation';


const mapStateToProps = (state) => {
	return {
		navigation: state.navigation
	};
};

export default withRouter(connect(mapStateToProps)(Navigation));
