import { connect } from 'react-redux';
import ListPage from './ListPage';
import { nextPage, setFilter } from '../../actions/media';


class MoviePage extends ListPage {
	constructor(props) {
		super(props);
	}
}

const mapStateToProps = (state, ownProps) => {
	const filter = ownProps.match.params.filter || 'all';

	const {
		moviesByFilter,
		entities: { movies }
	} = state;
	const { pagination, list, isLoading } = moviesByFilter;
	//const list = paginateByFilter[filter] && paginateByFilter[filter].list || [];
	const movieList = list.map(id => movies[id]);

	return {
		fetching: isLoading,
		list: movieList,
		filter,
		pagination
	};
};

const mapDispatchToProps = (dispatch) => ({
	nextPage: () => dispatch(nextPage()),
	setFilter: (filter) => dispatch(setFilter(filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
