import { connect } from 'react-redux';
import { loadById } from '../../actions/media';
import { withRouter } from 'react-router';
import MediaDetails from '../ui/MediaDetails';


const mapStateToProps = (state, ownProps) => {
	const {id , type } = ownProps.match.params;

	const {
		entities,
		user: { userId }
	} = state;

	return {
		id: parseInt(id),
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
