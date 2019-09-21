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
		isLoading: PropTypes.bool.isRequired,
		loadMedia: PropTypes.func.isRequired,
		addWishlist: PropTypes.func.isRequired,
		removeWishlist: PropTypes.func.isRequired,
		media: PropTypes.shape({
			id: PropTypes.number,
			title: PropTypes.string,
			user: PropTypes.string,
			imdb_id: PropTypes.string,
			pg: PropTypes.string,
			runtime: PropTypes.number,
			mainposter: PropTypes.shape({
				image_id: PropTypes.number
			}),
			release_date: PropTypes.string,
			release_year: PropTypes.number,
			wish_added_at: PropTypes.string,
			plot: PropTypes.string,
			imdb_rank: PropTypes.number,
			torrents: PropTypes.arrayOf(PropTypes.object)
		}),
		user: PropTypes.string
	}

	static defaultProps = {
		user: '',
		media: null
	}

	componentDidMount() {
		const { id, type, loadMedia } = this.props;

		if (!id) return;
		loadMedia(type, id);
	}

	componentDidUpdate(prevProps) {
		const { id, type, loadMedia } = this.props;

		if (!id) return;
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
		const { isLoading, media } = this.props;

		if (isLoading) {
			return <Loader />;
		}

		if (!media) {
			return 'There is nothing';
		}

		const {
			user, id, imdb_id: imdbId, title, pg, runtime, mainposter,
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
					<div className={`details__images ${!mainposter && 'no_poster'}`}>
						<figure className="movie-posters">
							<a href={`http://www.imdb.com/title/${imdbId}`} target="_blank" rel="noopener noreferrer">
								<Poster movieId={id} posterId={mainposter && mainposter.image_id} size={400} />
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
