import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { loadSeriesById } from '../actions';
import { withRouter } from 'react-router';
import MediaDetails from '../components/MediaDetails';
import TorrentList from '../components/TorrentList';

class SeriesDetails extends MediaDetails {
	constructor(props) {
		super(props);
	}

	renderBottom() {
		const {
			media
		} = this.props;

		return (<TorrentList items={media.torrents} />);
	}
}

const mapStateToProps = (state, ownProps) => {
	const id = ownProps.match.params.id;

	const {
		entities: { series },
		user: { userId }
	} = state;

	return {
		id,
		media: series[id],
		prevRoute: state.routing.prevRoute,
		user: userId
	};
};

const mapDispatchToProps =  {
	loadMedia: loadSeriesById
};

SeriesDetails.propTypes = {
	media: PropTypes.shape({
		title: PropTypes.string.isRequired,
		runtime: PropTypes.number,
		pg: PropTypes.string
	})
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SeriesDetails));
