import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

const Whoops404 = ({ location: { pathname } }) => (
	<div className="whoops-404">
		<h1>Whoops, route not found</h1>
		<p>Cannot find content for </p>
		<p>
			{pathname}
		</p>
	</div>
);

Whoops404.propTypes = {
	location: ReactRouterPropTypes.location.isRequired,
};
export default Whoops404;
