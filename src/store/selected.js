import MEDIA from '../constants/media';

export const initialState = {
	id: null,
	type: null,
	isLoading: false
};

const selected = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
	case MEDIA.SERIES_SELECTED:
	case MEDIA.MOVIES_SELECTED:
		return {
			...state,
			...payload
		};
	case MEDIA.FETCH:
		return {
			...state,
			isLoading: true
		};
	case MEDIA.FETCH_FULFILLED:
	case MEDIA.FETCH_REJECTED:
		return {
			...state,
			isLoading: false
		};
	default:
		return state;
	}
};
export default selected;
