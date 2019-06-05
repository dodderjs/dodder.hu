import { connect } from 'react-redux';
import ListPage from './ListPage';
import { nextPage, setFilter } from '../../actions/media';


class MoviePage extends ListPage {}

const mapStateToProps = (state, ownProps) => {
	const { filter = 'all', listtype, queries } = ownProps.match.params;

	const {
		lists,
		entities
	} = state;
	const { pagination, list, isLoading } = lists[listtype];
	const mediaList = list.map(elem => entities[elem.schema || listtype][elem.id || elem]);

	return {
		queries,
		listtype,
		fetching: isLoading,
		list: mediaList,
		filter,
		pagination
	};
};

const mapDispatchToProps = (dispatch) => ({
	nextPage: (listtype) => dispatch(nextPage(listtype)),
	setFilter: (listtype, filter, queries) => dispatch(setFilter(listtype, filter, queries))
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
