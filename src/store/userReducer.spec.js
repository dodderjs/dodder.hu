import userReducer, { INITIAL_STATE as initialState } from './user';
import USER from '../constants/user';

describe('User Reducer', () => {
	it('Sets the initial state', () => {
		const action = { type: 'NOT_USER_ACTION' };

		expect(userReducer(undefined, action)).toEqual(initialState);
	});

	it('Sets the loading state on USER_FETCH', () => {
		const action = { type: USER.FETCH };

		expect(userReducer(undefined, action)).toEqual({
			...initialState,
			isLoading: true,
		});
	});

	it('Authenticates the user on USER_FETCH_FULFILLED', () => {
		const payload = {
			token: 'MyTestToken',
			user: {
				id: '123',
				email: 'test@dodder.hu',
				email_verified: true,
				image: null,
				name: 'Test126 Dodi',
				role: 'user'
			}
		};
		const action = {
			type: USER.FETCH_FULFILLED,
			payload
		};

		expect(userReducer(undefined, action)).toEqual({
			...initialState,
			...{
				userId: '123',
				authToken: 'MyTestToken',
				details: payload.user,
				loggedIn: true,
				status: 'authenticated',
				error: null,
				isLoading: false
			}
		});
	});

	it('Authenticates the user on USER_FETCH_REJECTED', () => {
		const payload = {
			token: '',
			user: {
				id: '123',
				email: 'test@dodder.hu',
			}
		};
		const action = {
			type: USER.FETCH_REJECTED,
			payload
		};

		expect(userReducer(undefined, action)).toEqual({
			...initialState,
			...{
				status: 'rejected',
				loggedIn: false,
				isLoading: false
			}
		});
	});
	it('Authenticates the user on USER_LOGOUT', () => {
		const action = {
			type: USER.LOGOUT
		};

		expect(userReducer(undefined, action)).toEqual({
			...initialState,
			...{
				status: 'loggedOut',
				userId: null,
				loggedIn: false,
				isLoading: false
			}
		});
	});
});
