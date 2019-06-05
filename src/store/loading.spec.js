import loadingReducer, { INITIAL_STATE as initialState } from './loading';
import MEDIA from '../constants/media';


describe('Loading Reducer', () => {
	it('Sets the initial state', () => {
		const action = { type: 'NOT_ASYNC_ACTION' };

		expect(loadingReducer(MEDIA.MEDIAS)(undefined, action)).toEqual(initialState);
	});

	it('Start Fetching', () => {
		const action = {
			type: MEDIA.FETCH
		};

		expect(loadingReducer(MEDIA.MEDIAS)(undefined, action)).toEqual(true);
	});
	it('Fulfilled an api fetch', () => {
		const action = {
			type: MEDIA.FETCH_FULFILLED
		};

		expect(loadingReducer(MEDIA.MEDIAS)(undefined, action)).toEqual(false);
	});

	it('Reject an api fetch', () => {
		const action = {
			type: MEDIA.FETCH_REJECTED
		};

		expect(loadingReducer(MEDIA.MEDIAS)(undefined, action)).toEqual(false);
	});
});
