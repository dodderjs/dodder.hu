import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { PropTypes } from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import App from '.';
import PrivateRoute from './containers/PrivateRoute';
import LoginPage from './pages/LoginPage';
import MoviesPage from './pages/MoviesPage';
import MyListPage from './pages/MyListPage';
import MediaDetailsPage from './pages/MediaDetailsPage';
import Whoops404 from './ui/404';
import LogoutPage from './pages/LogoutPage';
/* import SeriesPage from './containers/SeriesPage'; // eslint-disable-line import/no-named-as-default
import WishlistPage from './containers/WishlistPage'; // eslint-disable-line import/no-named-as-default
import LoginPage from './containers/LoginPage'; // eslint-disable-line import/no-named-as-default
import MovieDetails from './containers/MovieDetails'; // eslint-disable-line import/no-named-as-default
import SeriesDetails from './containers/SeriesDetails'; // eslint-disable-line import/no-named-as-default
import LogoutPage from './containers/LogoutPage'; */

const Routes = ({ store, history }) => (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App>
				<Switch>
					<Route path="/login" component={LoginPage} />
					<Route path="/:type(movies|series)/details/:id" component={MediaDetailsPage} />
					<Route path="/:listtype(movies|series)/:filter?" component={MoviesPage} />
					<PrivateRoute path="/me/list/:filter?" component={MyListPage} />
					<PrivateRoute path="/logout" component={LogoutPage} />
					<Redirect exact path="/" to="movies" />
					<Route path="*" component={Whoops404} />
				</Switch>
			</App>
		</ConnectedRouter>
	</Provider>
);

Routes.propTypes = {
	// eslint-disable-next-line react/forbid-prop-types
	store: PropTypes.any.isRequired,
	history: ReactRouterPropTypes.history.isRequired,
};

export default Routes;
