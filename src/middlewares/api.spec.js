import { CALL_API } from '../constants/api';
import MEDIA from '../constants/media';
import apiMiddleware from './api';
import Schemas from '../schemas';
import { ENDPOINTS } from '../config';

const store = {
	getState: jest.fn(() => ({})),
	dispatch: jest.fn()
};
const next = jest.fn();

const invoke = action => apiMiddleware(store)(next)(action);

describe('Api middleware tests', () => {
	beforeEach(() => {
		fetch.resetMocks();
	});

	it('passes through non-api action', () => {
		const action = { type: 'TEST_NON_API_ACTION' };

		invoke(action);
		expect(next).toHaveBeenCalledWith(action);
	});

	it('dispatches the correct list actions on a SUCCESSFUL api request', async () => {
		const action = {
			type: MEDIA.FETCH,
			schema: Schemas.MEDIA_ARRAY,
			endpoint: ENDPOINTS.SERIES,
			params: {
				filter: 'onseed'
			},
			queries: {
				page: 0
			}
		};
		const apiAction = {
			[CALL_API]: action
		};

		fetch.mockResponseOnce(JSON.stringify({
			rows: [{ id: 1, name: 'test1', type: 'movie' }, { id: 2, name: 'test2', type: 'series' }],
			count: 2
		}));

		await invoke(apiAction);

		expect(store.dispatch).toHaveBeenCalledWith({
			type: MEDIA.FETCH
		});
		expect(fetch.mock.calls.length).toEqual(1);
		expect(store.getState).toHaveBeenCalled();
		expect(store.dispatch).toHaveBeenCalledWith({
			type: MEDIA.FETCH_FULFILLED,
			payload: {
				count: 2,
				entities: {
					movies: {
						1: {
							id: 1,
							name: 'test1',
							type: 'movie',
						}
					},
					series: {
						2: {
							id: 2,
							name: 'test2',
							type: 'series',
						}
					}
				},
				result: [{
					id: 1,
					schema: 'movies',
				},
				{
					id: 2,
					schema: 'series',
				}]
			}
		});
	});

	it('dispatches the correct details actions on a SUCCESSFUL api request', async () => {
		const action = {
			type: MEDIA.FETCH,
			schema: Schemas.MEDIA,
			endpoint: ENDPOINTS.MEDIA_DETAILS,
			params: {
				id: '1',
				type: 'movies'
			}
		};
		const apiAction = {
			[CALL_API]: action
		};

		fetch.mockResponseOnce(JSON.stringify({ id: 1, name: 'test1', type: 'movie' }));

		await invoke(apiAction);

		expect(store.dispatch).toHaveBeenCalledWith({
			type: MEDIA.FETCH
		});
		expect(fetch.mock.calls.length).toEqual(1);
		expect(store.getState).toHaveBeenCalled();
		expect(store.dispatch).toHaveBeenCalledWith({
			type: MEDIA.FETCH_FULFILLED,
			payload: {
				entities: {
					movies: {
						1: {
							id: 1,
							name: 'test1',
							type: 'movie',
						}
					}
				},
				result: {
					id: 1,
					schema: 'movies',
				}
			}
		});
	});

	it('dispatches the correct actions on a FAILED api request', async () => {
		const action = {
			type: MEDIA.FETCH,
			schema: Schemas.MEDIA_ARRAY,
			endpoint: '/series/:filter?',
			params: {
				filter: 'onseed'
			},
			queries: {
				page: 0
			}
		};
		const apiAction = {
			[CALL_API]: action
		};

		fetch.mockReject(new Error('fake error message'));

		await invoke(apiAction);

		expect(store.dispatch).toHaveBeenCalledWith({
			type: MEDIA.FETCH
		});
		expect(fetch.mock.calls.length).toEqual(1);
		expect(store.getState).toHaveBeenCalled();
		expect(store.dispatch).toHaveBeenCalledWith({
			type: MEDIA.FETCH_REJECTED,
			payload: { error: 'fake error message' }
		});
	});
});
