import { connect } from 'react-redux';
import ListPage from './ListPage';
import { nextPage, setFilter } from '../../actions/media';


class MoviePage extends ListPage {
	constructor(props) {
		super(props);
	}
}

const mapStateToProps = (state, ownProps) => {
	const { filter = 'all', listtype } = ownProps.match.params;

	const {
		lists,
		entities
	} = state;
	const { pagination, list, isLoading } = lists[listtype];
	//const list = paginateByFilter[filter] && paginateByFilter[filter].list || [];
	const mediaList = list.map(elem => entities[elem.schema || listtype][elem.id || elem]);

	return {
		listtype,
		fetching: isLoading,
		list: mediaList,
		filter,
		pagination
	};
};

const mapDispatchToProps = (dispatch) => ({
	nextPage: (listtype) => dispatch(nextPage(listtype)),
	setFilter: (listtype,filter) => dispatch(setFilter(listtype, filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
