import { connect } from 'react-redux';
import ListPage from './ListPage';
import { fetchUserItemlist } from '../actions';


class WishlistPage extends ListPage {
	constructor(props) {
		super(props);
	}
}


const mapStateToProps = (state, ownProps) => {
	const filter = ownProps.match.params.filter || 'all';

	const {
		pagination: { userContentByFilter }
	} = state;

	const wishlistPagination = userContentByFilter[filter] || { ids: [] };
	const list = wishlistPagination.ids.map(({id, schema}) => {
		return state.entities[schema][id];
	});

	return {
		pagination: wishlistPagination,
		list,
		filter
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetch: (filter, nextPage) => dispatch(fetchUserItemlist(filter, nextPage))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(WishlistPage);
