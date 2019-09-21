import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MdLaunch } from 'react-icons/md';
import { CDN_ROOT } from '../../../config';

// src: {`/posters/mm${item.id}/size_${item.poster_id }_200.jpg`}

class Poster extends Component {
	static propTypes = {
		movieId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		posterId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		size: PropTypes.number
	}

	static defaultProps = {
		posterId: null,
		size: 200
	}

	render() {
		const { movieId, posterId, size } = this.props;

		if (!posterId) {
			return <MdLaunch />;
			// return (<span className="material-icons md-60">&#xe02c;</span>);
		}
		return (
			<img
				className="movie-poster"
				src={`${CDN_ROOT}/posters/mm${movieId}/size_${posterId}_${size || 200}.jpg`}
				width="150"
				alt="poster"
			/>
		);
	}
}

export default Poster;
