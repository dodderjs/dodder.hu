import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

class Sub extends Component {
	render() {
		const { to, children} = this.props;
		return  (
			<li className="navItem">
				<NavLink to={to} activeClassName="active" exact>{children}</NavLink>
			</li>
		);
	}
}
Sub.propTypes = {
	to: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired
};

export default Sub;
