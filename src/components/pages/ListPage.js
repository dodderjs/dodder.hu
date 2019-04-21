import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MediaList from '../ui/MediaList';
import MediaItem from '../ui/MediaItem';


export default class ListPage extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.setFilter(this.props.listtype, this.props.filter);
	}

	componentDidUpdate(prevProps) {
		if (this.props.filter !== prevProps.filter) {
			this.props.setFilter(this.props.listtype, this.props.filter);
		}
	}

	handleLoadMoreClick() {
		!this.props.fetching && this.props.nextPage(this.props.listtype);
	}

	renderMedia(data, key) {
		return (
			<MediaItem key={key} media={data} />
		);
	}

	render() {
		const { pagination, list, fetching } = this.props;

		return(
			<MediaList items={list}
				renderItem={this.renderMedia}
				onLoadMoreClick={this.handleLoadMoreClick.bind(this)}
				fetching={fetching}
				{...pagination} />
		);
	}
}

ListPage.propTypes = {
	listtype: PropTypes.string,
	filter: PropTypes.string,
	nextPage: PropTypes.func.isRequired,
	setFilter: PropTypes.func.isRequired,
	list: PropTypes.array.isRequired,
	fetching: PropTypes.bool,
	pagination: PropTypes.object
};
