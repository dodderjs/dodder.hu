export const initialState = {};

const queries = (TYPE) => (state = initialState, action) => {
	const {type, payload} = action;

	switch (type) {
	case `${TYPE}_SET_FILTER`:
		return payload.queries || initialState;
	default:
		return state;
	}
}
export default queries;
