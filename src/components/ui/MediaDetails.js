import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Loader from './Loader';
import Poster from './Poster';
import TorrentList from './TorrentList';

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

	render() {
		const { media } = this.props;

		if (!media) {
			return <Loader />;
		}

		const {
			user, id, imdb_id: imdbId, title, pg, runtime, poster_id: posterId,
			release_date: releaseDate, release_year: releaseYear, imdb_rank: imdbRank,
			wish_added_at: wishAddedAt
		} = media;

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
								<Poster movieId={id} posterId={posterId} size={400} />
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
				<TorrentList items={media.torrents} user={user} />
			</div>
		);
	}
}

export default MediaDetails;
