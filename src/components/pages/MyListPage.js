import { connect } from 'react-redux';
import ListPage from './ListPage';
import { nextPage, setFilter } from '../../actions/media';


class MyListPage extends ListPage {
	static filterToQuery(filter) {
		let result = '';
		switch (filter) {
		case 'movies':
			result = 'type eq movie';
			break;
		case 'all':
			break;

		default:
			result = `type eq ${filter}`;
			break;
		}
		return result;
	}
}

const mapStateToProps = (state, ownProps) => {
	const { filter = 'all', queries = {} } = ownProps.match.params;

	const {
		lists,
		entities: { media }
	} = state;
	const { pagination, list, isLoading } = lists.mylist;
	const mediaList = list.map(elem => media[elem.id || elem]);
	const filterQuery = MyListPage.filterToQuery(filter);

	return {
		queries: {
			...queries,
			filter: `${queries.filter || ''},${filterQuery}`
		},
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
