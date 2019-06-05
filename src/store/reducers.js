import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import MEDIA from '../constants/media';
import entities from './entities';
import user from './user';
import errors from './errors';
import medialist from './medialist';
import navigation from './navigation';
import paginate from './paginate';
import loading from './loading';
import filter from './filter';
import queries from './queries';

export default (history) => combineReducers({
	errors,
	entities,
	user,
	navigation,
	lists: combineReducers({
		movies: combineReducers({
			isLoading: loading(MEDIA.MOVIES),
			filter: filter(MEDIA.MOVIES),
			queries: queries(MEDIA.MOVIES),
			list: medialist(MEDIA.MOVIES),
			pagination: paginate(MEDIA.MOVIES)
		}),
		series: combineReducers({
			isLoading: loading(MEDIA.SERIES),
			filter: filter(MEDIA.SERIES),
			queries: queries(MEDIA.SERIES),
			list: medialist(MEDIA.SERIES),
			pagination: paginate(MEDIA.SERIES)
		}),

		mylist: combineReducers({
			isLoading: loading(MEDIA.MYLIST),
			filter: filter(MEDIA.MYLIST),
			queries: queries(MEDIA.MYLIST),
			list: medialist(MEDIA.MYLIST),
			pagination: paginate(MEDIA.MYLIST)
		}),
	}),
	router: connectRouter(history),
});
