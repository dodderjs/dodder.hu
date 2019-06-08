import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

class Sub extends Component {
	static propTypes = {
		to: PropTypes.string.isRequired,
		children: PropTypes.node.isRequired
	}

	render() {
		const { to, children } = this.props;
		return (
			<li className="navItem">
				<NavLink to={to} className="navItem__link" activeClassName="active" exact>{children}</NavLink>
			</li>
		);
	}
}

export default Sub;
