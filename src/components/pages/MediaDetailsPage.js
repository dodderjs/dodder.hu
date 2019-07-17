import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { loadById, addWishlist, removeWishlist } from '../../actions/media';
import MediaDetails from '../ui/MediaDetails';


const mapStateToProps = (state, ownProps) => {
	const { id, type } = ownProps.match.params;

	const {
		selected: { isLoading },
		entities: { media },
		user: { userId }
	} = state;

	return {
		isLoading,
		id: Number.parseInt(id, 10),
		type,
		media: media[id],
		user: userId
	};
};

const mapDispatchToProps = {
	loadMedia: loadById,
	addWishlist,
	removeWishlist
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MediaDetails));
