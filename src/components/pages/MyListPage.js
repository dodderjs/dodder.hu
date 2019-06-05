import { connect } from 'react-redux';
import ListPage from './ListPage';
import { nextPage, setFilter } from '../../actions/media';


class MyListPage extends ListPage {
	constructor(props) {
		super(props);
	}
}

const mapStateToProps = (state, ownProps) => {
	const { filter = 'all', queries={} } = ownProps.match.params;

	const {
		lists,
		entities
	} = state;
	const { pagination, list, isLoading } = lists.mylist;
	const mediaList = list.map(elem => entities[elem.schema][elem.id || elem]);

	return {
		queries,
		fetching: isLoading,
		list: mediaList,
		filter,
		pagination,
		listtype: 'mylist'
	};
};

const mapDispatchToProps = (dispatch) => ({
	nextPage: (listtype) => dispatch(nextPage(listtype)),
	setFilter: (listtype, filter, queries) => dispatch(setFilter(listtype, filter, queries))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyListPage);
