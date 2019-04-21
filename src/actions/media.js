import MEDIA from '../constants/media';
import ERROR from '../constants/error';
import { ENDPOINTS } from '../config';
import apiDispatch from './api';
import Schemas from '../schemas';

const typeMap = {
	movies: {
		endpoint: ENDPOINTS.MOVIES,
		name: MEDIA.MOVIES,
	},

	series: {
		endpoint: ENDPOINTS.SERIES,
		name: MEDIA.SERIES,
	}
}
export const setFilter = (type, nextFilter) => (dispatch, getState) => {
	const {
		lists: { 
			[type]: {
				filter
			}
		}
	} = getState();

	dispatch({
		type: `${typeMap[type].name}_SET_FILTER`,
		payload: {
			filter: nextFilter
		}
	});
	
	try {
		fetch(type)(dispatch, getState);
	} catch (error) {
		dispatch({
			type: ERROR.ADD,
			payload: error
		});
		dispatch({
			type: `${typeMap[type].name}_SET_FILTER`,
			payload: {
				filter
			}
		});
	}
}

export const fetch = (type) => (dispatch, getState) => {
	const {
		lists: { 
			[type]: {
				filter,
				pagination: { page }
			}
		}
	} = getState();

	return apiDispatch({
		type: `${typeMap[type].name}_FETCH`,
		schema: Schemas.MEDIA_ARRAY,
		endpoint: typeMap[type].endpoint,
		params: filter === 'all' ? {} : { filter },
		queries: { page }
	})(dispatch, getState);
}

export const nextPage = (type) => (dispatch, getState) => {
	const {
		lists: {
			[type]: {
				pagination: { page }
			}
		}
	} = getState();

	dispatch({
		type: `${typeMap[type].name}_NEXT_PAGE`,
		payload: {
			page: page + 1
		}
	});
	try {
		fetch(type)(dispatch, getState);
	} catch (error) {
		dispatch({
			type: `${typeMap[type].name}_NEXT_PAGE`,
			payload: {
				page: page - 1
			}
		});
	}
}

export const loadById = (type = 'movies', id) => (dispatch, getState) => {
	dispatch({
		type: `${typeMap[type].name}_SELECTED`,
		payload: {
			id,
			type
		}
	});
	
	return apiDispatch({
		type: MEDIA.FETCH,
		schema: Schemas.MEDIA,
		endpoint: ENDPOINTS.MEDIA_DETAILS,
		params: { 
			id,
			type
		}
	})(dispatch, getState);
}
