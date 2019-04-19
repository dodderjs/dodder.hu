import MEDIA from '../constants/media';
import ERROR from '../constants/error';
import { ENDPOINTS } from '../config';
import apiDispatch from './api';
import Schemas from '../schemas';

export const setFilter = (nextFilter) => (dispatch, getState) => {
	const {
		moviesByFilter: {
			filter
		}
	} = getState();

	dispatch({
		type: MEDIA.MOVIES_SET_FILTER,
		payload: {
			filter: nextFilter
		}
	});
	
	try {
		fetchMovies(dispatch, getState);
	} catch (error) {
		dispatch({
			type: ERROR.ADD,
			payload: error
		});
		dispatch({
			type: MEDIA.MOVIES_SET_FILTER,
			payload: {
				filter
			}
		});
	}
}

export const fetchMovies = (dispatch, getState) => {
	const {
		moviesByFilter: {
			filter,
			pagination: { page }
		}
	} = getState();

	return apiDispatch({
		type: MEDIA.MOVIES_FETCH,
		schema: Schemas.MOVIE_ARRAY,
		endpoint: ENDPOINTS.MOVIES,
		params: filter === 'all' ? {} : { filter },
		queries: { page }
	})(dispatch, getState);
}

export const nextPage = () => (dispatch, getState) => {
	const {
		moviesByFilter: {
			pagination: { page }
		}
	} = getState();

	dispatch({
		type: MEDIA.MOVIES_NEXT_PAGE,
		payload: {
			page: page + 1
		}
	});
	try {
		fetchMovies(dispatch, getState);
	} catch (error) {
		dispatch({
			type: MEDIA.MOVIES_NEXT_PAGE,
			payload: {
				page: page - 1
			}
		});
	}
}

export const loadById = (id = '') => (dispatch, getState) => {
	dispatch({
		type: MEDIA.MOVIES_SELECTED,
		payload: {
			id: id
		}
	});
	
	return apiDispatch({
		type: MEDIA.FETCH,
		schema: Schemas.MOVIE,
		endpoint: ENDPOINTS.MEDIA_DETAILS,
		params: { id: id }
	})(dispatch, getState);
}
