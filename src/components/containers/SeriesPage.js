import { connect } from 'react-redux';
import ListPage from './ListPage';
import * as actions from '../actions';


class SeriesPage extends ListPage {
	constructor(props) {
		super(props);
	}


	/*componentWillReceiveProps(nextProps) {
		if (nextProps.filter !== this.props.filter) {
			this.props.fetch(nextProps.filter);
		}
	}*/

}

const mapStateToProps = (state, ownProps) => {
	const filter = ownProps.match.params.filter || 'all';

	const {
		pagination: { seriesByFilter },
		entities: { series }
	} = state;

	const seriesPagination = seriesByFilter[filter] || { ids: [] };
	const list = seriesPagination.ids.map(id => series[id]);

	return {
		pagination: seriesPagination,
		list,
		filter
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetch: (filter, nextPage) => dispatch(actions.fetchSeries(filter, nextPage))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SeriesPage);
