import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TorrentList extends Component {
	static propTypes = {
		items: PropTypes.arrayOf(PropTypes.object),
		user: PropTypes.string
	}

	static defaultProps = {
		items: [],
		user: null
	}

	static convertSize(size) {
		if (!size) {
			return '?';
		}
		const resultMB = Math.floor(size / 102.4) / 10;
		const resultGB = Math.floor(resultMB / 102.4) / 10;

		return (resultGB < 1) ? `${resultMB} MB` : `${resultGB} GB`;
	}

	renderItem(data, key) {
		const { user } = this.props;
		let details = data.season ? `S${data.season}${data.episode ? ` / E${data.episode}` : ''} - ` : '';
		details += data.type + (data.resolution ? `(${data.resolution})` : '');

		const link = `https://ncore.cc/torrents.php?action=details&id=${data.id}`;

		return (
			<tr key={key} title={data.title}>
				<td>{details}</td>
				<td>{data.lang}</td>
				<td>{TorrentList.convertSize(data.size)}</td>
				<td>{new Date(data.uploaded).toLocaleDateString()}</td>
				<td>{data.codec}</td>
				<td>{data.quality}</td>
				<td>{data.group}</td>
				{user
				&& <td><a href={link} target="_blank" rel="noopener noreferrer">Link</a></td>
				}
			</tr>
		);
	}


	render() {
		const {
			user,
			items
		} = this.props;

		if (!items || items.length === 0) {
			return null;
		}
		return (
			<div className="details__torrents">
				<table className="torrents">
					<thead>
						<tr>
							<th>Details</th>
							<th>Lang</th>
							<th>Size</th>
							<th>Uploaded</th>
							<th>Codec</th>
							<th>quality</th>
							<th>Group</th>
							{user
									&& <th>Link</th>
							}
						</tr>
					</thead>
					<tbody>
						{items.map(this.renderItem.bind(this))}
					</tbody>
				</table>
			</div>
		);
	}
}

export default TorrentList;
