import React from 'react';
import PropTypes from 'prop-types';

const Loader = (props) => {
	const { className } = props;
	let finalClassName = `${className} spinner`;

	return (
		<div className={finalClassName}>
			<i>&nbsp;</i><i>&nbsp;</i><i>&nbsp;</i><i>&nbsp;</i>
		</div>

	);
};

Loader.propTypes = {
	className: PropTypes.string
};

export default Loader;