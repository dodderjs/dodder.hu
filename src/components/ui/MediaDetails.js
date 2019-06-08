import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Loader from './Loader';
import { API_ROOT } from '../../config';

class MediaDetails extends Component {
	static propTypes = {
		id: PropTypes.number.isRequired,
		type: PropTypes.string.isRequired,
		loadMedia: PropTypes.func.isRequired,
		addWishlist: PropTypes.func.isRequired,
		removeWishlist: PropTypes.func.isRequired,
		media: PropTypes.shape({
			title: PropTypes.string
		}),
		user: PropTypes.string
	}

	static defaultProps = {
		user: '',
		media: null
	}

	componentDidMount() {
		const { type, id, loadMedia } = this.props;
		loadMedia(type, id);
	}

	componentDidUpdate(prevProps) {
		const { type, id, loadMedia } = this.props;
		if (id !== prevProps.id) {
			loadMedia(type, id);
		}
	}

	// eslint-disable-next-line class-methods-use-this
	renderBottom() {
		return null;
	}

	renderButtons() {
		const {
			user, media, addWishlist, removeWishlist
		} = this.props;

		if (user) {
			if (media.wish_added_at) {
				return (
					<button
						type="button"
						className="details__buttons__wish button remove"
						onClick={() => removeWishlist(media.id)}
					>
						Remove to wishlist
					</button>
				);
			}
			return (
				<button
					type="button"
					className="details__buttons__wish button add"
					onClick={() => addWishlist(media.id)}
				>
					Add to wishlist
				</button>
			);
		}
		return (<a className="details__buttons__wish button login" href="/login">Add to wishlist</a>);
	}

	static renderPoster(movieId, posterId) {
		if (!posterId) {
			return (<span className="material-icons md-60">&#xe02c;</span>);
		} if (typeof posterId === 'string' && posterId.indexOf(':') > 0) {
			const posterIds = posterId.split(':');

			return (
				<img
					className="movie-poster"
					src={`${API_ROOT}/posters/mm${posterIds[0]}/size_${posterIds[1]}_400.jpg`}
					width="300"
					alt="Poster"
				/>
			);
		}
		return (
			<img
				className="movie-poster"
				src={`${API_ROOT}/posters/mm${movieId}/size_${posterId}_400.jpg`}
				width="300"
				alt="poster"
			/>
		);
	}

	render() {
		const { media } = this.props;

		if (!media) {
			return <Loader />;
		}

		const {
			id, imdb_id: imdbId, title, pg, runtime, mainposter,
			release_date: releaseDate, release_year: releaseYear, imdb_rank: imdbRank,
			wish_added_at: wishAddedAt
		} = media;

		const posterId = mainposter ? mainposter.image_id : null;

		return (
			<div className="movie-details-view clear">
				<div className="movie details clear">
					<NavLink to="/" className="details__close material-icons">close</NavLink>
					<div className="details__title clear">
						<h2>
							<a
								href={`http://www.imdb.com/title/${imdbId}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								{ title }
							</a>
						</h2>

						<span className="details__pg">{ pg }</span>
						<span className="details__runtime">{ runtime }</span>
					</div>
					<div className={`details__images ${!posterId && 'no_poster'}`}>
						<figure className="movie-posters">
							<a href={`http://www.imdb.com/title/${imdbId}`} target="_blank" rel="noopener noreferrer">
								{ MediaDetails.renderPoster(id, posterId) }
							</a>
						</figure>
					</div>
					<div className="details__info">
						<p>{media.plot}</p>
						<ul className="spec">
							<li>
								<strong>Released date:</strong>
								{ new Date(releaseDate).toDateString() }
							</li>
							<li>
								<strong>Released year:</strong>
								{ releaseYear }
							</li>
							<li>
								<strong>Rank:</strong>
								{ imdbRank }
							</li>
							{ wishAddedAt && (
								<li>
									<strong>Added at:</strong>
									{' '}
									{ wishAddedAt }
								</li>
							)}
						</ul>
					</div>
					<div className="details__buttons">
						{ this.renderButtons() }
					</div>
				</div>
				{ this.renderBottom() }
			</div>
		);
	}
}

export default MediaDetails;
