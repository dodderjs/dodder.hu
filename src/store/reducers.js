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

export default (history) => combineReducers({
	errors,
	entities,
	user,
	navigation,
	lists: combineReducers({
		movies: combineReducers({
			isLoading: loading(MEDIA.MOVIES),
			filter: filter(MEDIA.MOVIES),
			list: medialist(MEDIA.MOVIES),
			pagination: paginate(MEDIA.MOVIES)
		}),
		series: combineReducers({
			isLoading: loading(MEDIA.SERIES),
			filter: filter(MEDIA.SERIES),
			list: medialist(MEDIA.SERIES),
			pagination: paginate(MEDIA.SERIES)
		})
	}),
	router: connectRouter(history),
});
