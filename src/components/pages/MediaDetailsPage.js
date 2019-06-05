import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { loadById } from '../../actions/media';
import MediaDetails from '../ui/MediaDetails';


const mapStateToProps = (state, ownProps) => {
	const { id, type } = ownProps.match.params;

	const {
		entities,
		user: { userId }
	} = state;

	return {
		id: Number.parseInt(id, 10),
		type,
		media: entities[type][id],
		user: userId
	};
};

const mapDispatchToProps = {
	loadMedia: (type, id) => loadById(type, id),
	addWishlist: () => {},
	removeWishlist: () => {}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MediaDetails));
