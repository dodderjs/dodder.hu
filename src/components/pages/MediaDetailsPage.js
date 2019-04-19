import { connect } from 'react-redux';
import { loadById } from '../../actions/media';
import { withRouter } from 'react-router';
import MediaDetails from '../ui/MediaDetails';


const mapStateToProps = (state, ownProps) => {
	const id = parseInt(ownProps.match.params.id);

	const {
		entities: { movies },
		user: { userId }
	} = state;

	return {
		id,
		media: movies[id],
		user: userId
	};
};

const mapDispatchToProps = {
	loadMedia: loadById,
	addWishlist: () => {},
	removeWishlist: () => {}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MediaDetails));
