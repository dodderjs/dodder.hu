import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdOpenInNew } from 'react-icons/md';
import Poster from './Poster';

// src: {`/posters/mm${item.id}/size_${item.poster_id }_200.jpg`}

class MediaItem extends Component {
	static propTypes = {
		media: PropTypes.object.isRequired
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
						<Poster movieId={media.id} posterId={media.poster_id} />
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
