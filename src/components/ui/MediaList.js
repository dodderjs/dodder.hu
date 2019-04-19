import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from './Loader';
import { topPosition } from '../../utils/positions';

class MediaList extends Component {

	static defaultProps = {
		fetching: true,
		threshold: 100
	};

	constructor(props) {
		super(props);
		this.scrollFunction = this.scrollListener.bind(this);
	}

	componentDidMount () {
		this.attachScrollListener();
	}

	componentDidUpdate () {
		this.attachScrollListener();
	}

	componentWillUnmount () {
		this.detachScrollListener();
	}

	attachScrollListener () {
		if (!this.hasMoreItems() || this.props.fetching) return;

		window.addEventListener('scroll', this.scrollFunction, true);
		window.addEventListener('resize', this.scrollFunction, true);
		this.scrollListener();
	}

	scrollListener() {
		const { onLoadMoreClick, totalCount, threshold, fetching } = this.props;

		if (fetching || totalCount <= 0) return;

		let windowScrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
		let elTotalHeight = topPosition(this.node) + this.node.offsetHeight;
		let currentBottomPosition = elTotalHeight - windowScrollTop - window.innerHeight;

		if (currentBottomPosition < Number(threshold)) {
			this.detachScrollListener();
			onLoadMoreClick();
		}
	}

	detachScrollListener () {
		window.removeEventListener('scroll', this.scrollFunction, true);
		window.removeEventListener('resize', this.scrollFunction, true);
	}

	hasMoreItems() {
		const { items, totalCount } = this.props;

		return totalCount !== items.length;
	}

	renderLoadMore() {
		const { fetching, items } = this.props;

		if (fetching && (items.length || this.hasMoreItems())) {
			return <Loader className="spinner__inline" />;
		}

		return;
	}

	render() {
		const {
			fetching, items, renderItem
		} = this.props;

		const isEmpty = items.length === 0;
		if (isEmpty && fetching) {
			return <Loader />;
		}

		if (isEmpty) {
			return <div><i>Nothing here!</i></div>;
		}
		return(
			<div ref={node => this.node = node}>
				<ul className="movie-list clear">
					{ items.map(renderItem)}
				</ul>

				{this.renderLoadMore()}
			</div>
		);
	}
}

MediaList.propTypes = {
	renderItem: PropTypes.func.isRequired,
	items: PropTypes.array.isRequired,
	fetching: PropTypes.bool.isRequired,
	onLoadMoreClick: PropTypes.func.isRequired,
	threshold: PropTypes.number,
	totalCount: PropTypes.number,
	lastPage: PropTypes.number
};

export default MediaList;
