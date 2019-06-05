import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { parse } from 'query-string';
import { isEqual } from 'lodash';
import MediaList from '../ui/MediaList';
import MediaItem from '../ui/MediaItem';


export default class ListPage extends Component {
	static propTypes = {
		listtype: PropTypes.string,
		filter: PropTypes.string,
		nextPage: PropTypes.func.isRequired,
		setFilter: PropTypes.func.isRequired,
		list: PropTypes.arrayOf(PropTypes.object).isRequired,
		fetching: PropTypes.bool,
		pagination: PropTypes.object,
		queries: PropTypes.object,
		location: ReactRouterPropTypes.location.isRequired
	}

	static defaultProps = {
		listtype: '',
		filter: 'all',
		fetching: false,
		pagination: {},
		queries: {},
	}


	componentDidMount() {
		const {
			setFilter, listtype, filter, location
		} = this.props;
		setFilter(listtype, filter, parse(location.search));
	}

	componentDidUpdate(prevProps) {
		const {
			setFilter, filter, listtype, queries
		} = this.props;
		if (filter !== prevProps.filter || !isEqual(queries, prevProps.queries)) {
			setFilter(listtype, filter, queries);
		}
	}

	handleLoadMoreClick() {
		const {
			fetching, nextPage, listtype
		} = this.props;

		if (!fetching) {
			nextPage(listtype);
		}
	}

	// eslint-disable-next-line class-methods-use-this
	renderMedia(data, key) {
		return (
			<MediaItem key={key} media={data} />
		);
	}

	render() {
		const { pagination, list, fetching } = this.props;

		return (
			<MediaList
				items={list}
				renderItem={this.renderMedia}
				onLoadMoreClick={() => this.handleLoadMoreClick()}
				fetching={fetching}
				{...pagination}
			/>
		);
	}
}
