import filterReducer, { INITIAL_STATE as initialState } from './filter';
import MEDIA from '../constants/media';


describe('Filter Reducer', () => {
	it('Sets the initial state', () => {
		const action = { type: 'NOT_ASYNC_ACTION' };

		expect(filterReducer(MEDIA.MEDIAS)(undefined, action)).toEqual(initialState);
	});

	it('Set Fileter', () => {
		const payload = {
			filter: 'upcoming',
			queries: {}
		};
		const action = {
			type: MEDIA.SET_FILTER,
			payload
		};

		expect(filterReducer(MEDIA.MEDIAS)(undefined, action)).toEqual('upcoming');
	});
});
