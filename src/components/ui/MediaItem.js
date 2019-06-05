import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdLaunch, MdOpenInNew } from 'react-icons/md';
import { API_ROOT } from '../../config';

// src: {`/posters/mm${item.id}/size_${item.poster_id }_200.jpg`}

class MediaItem extends Component {
	static propTypes = {
		media: PropTypes.object.isRequired
	}

	renderPoster() {
		const { media } = this.props;

		if (!media.poster_id) {
			return <MdLaunch />;
			// return (<span className="material-icons md-60">&#xe02c;</span>);
		} if (typeof media.poster_id === 'string' && media.poster_id.indexOf(':') > 0) {
			const posterIds = media.poster_id.split(':');

			return (
				<img
					className="movie-poster"
					src={`${API_ROOT}/posters/mm${posterIds[0]}/size_${posterIds[1]}_200.jpg`}
					width="150"
					alt="Poster"
				/>
			);
		}
		return (
			<img
				className="movie-poster"
				src={`${API_ROOT}/posters/mm${media.id}/size_${media.posterIds}_200.jpg`}
				width="150"
				alt="poster"
			/>
		);
	}

	render() {
		const { media } = this.props;

		return (
			<li>
				<Link
					to={`/${media.type === 'series'
						? media.type
						: `${media.type}s`}/details/${media.id}`}
					className={`movie ${!media.poster_id && 'no_poster'}`}
				>
					<figure>
						{this.renderPoster()}
						<div className="movie__fullscreen">
							<MdOpenInNew className="material_icons md-60" />
						</div>
					</figure>
					<div className="movie-details">
						<h4>{ media.title }</h4>
						<p>{ media.release_year }</p>
						<p>{ media.imdb_rank }</p>
					</div>
				</Link>
			</li>
		);
	}
}

export default MediaItem;
