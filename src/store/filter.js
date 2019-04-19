export const initialState = 'all';

const filter = (TYPE) => (state = initialState, action) => {
	const {type, payload} = action;

	switch (type) {
	case `${TYPE}_SET_FILTER`:
		return payload.filter;

	default:
		return state;
	}
}
export default filter;
