import React from 'react';
import Navigation from './containers/Navigation';
import { hot } from 'react-hot-loader';
import { PropTypes } from 'prop-types';

import '../scss/normalize.scss';
import '../scss/core.scss';
import '../scss/spinner.scss';
import '../scss/app.scss';
import '../scss/mediaqueries.scss';

const App = hot(module)(({ children }) => (
	<div className="app">
		<Navigation />
		{children}
	</div>
));

App.propTypes = {
	children: PropTypes.node,
};
export default App;
