import MEDIA from '../constants/media';

export const INITIAL_STATE = {
	movies: {},
	series: {}
};
const entities = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;

	switch (type) {
	case MEDIA.FETCH_FULFILLED:
	case MEDIA.MOVIES_FETCH_FULFILLED:
	case MEDIA.SERIES_FETCH_FULFILLED:
	case MEDIA.MYLIST_FETCH_FULFILLED:
		if (payload && payload.entities) {
			return {
				...state,
				movies: {
					...state.movies,
					...payload.entities.movies || {}
				},
				series: {
					...state.series,
					...payload.entities.series || {}
				}
			};
		}
		return state;

	default:
		return state;
	}
};

export default entities;
