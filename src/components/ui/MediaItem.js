import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { API_ROOT } from '../../config';
import { MdLaunch, MdOpenInNew } from 'react-icons/md';

// src: {`/posters/mm${item.id}/size_${item.poster_id }_200.jpg`}

class MediaItem extends Component {

	renderPoster() {
		let { media } = this.props;

		if (!media.poster_id) {
			return <MdLaunch />
			//return (<span className="material-icons md-60">&#xe02c;</span>);
		} if (typeof media.poster_id === "string" && media.poster_id.indexOf(':') > 0) {
			let poster_ids = media.poster_id.split(':');

			return (<img className="movie-poster" src={`${API_ROOT}/posters/mm${poster_ids[0]}/size_${poster_ids[1]}_200.jpg`} width="150" />);
		}
		return (<img className="movie-poster" src={`${API_ROOT}/posters/mm${media.id}/size_${media.poster_id}_200.jpg`} width="150" />);
	}

	render() {
		let { media } = this.props;

		return (<li>
			<Link to={`/${media.type === 'series' ? media.type : media.type + 's' }/details/${media.id}`} className={`movie ${!media.poster_id && 'no_poster'}`}>
				<figure>
					{this.renderPoster()}
					<div className="movie__fullscreen">
						<MdOpenInNew className='material_icons md-60' />
					</div>
				</figure>
				<div className="movie-details">
					<h4>{ media.title }</h4>
					<p>Release: { media.id }</p>
				</div>
			</Link>
		</li>
		);
	}
}


MediaItem.propTypes = {
	media: PropTypes.object.isRequired
};

export default MediaItem;
