import React, { Component } from 'react';
import ErrorBoundary from './ErrorBoundary';
import LifeCycleSample from './LifeCycleSample';

class LifeCycleSampleWrap extends Component {
	getRandomColor = () =>
		'#' + Math.floor(Math.random() * 16777215).toString(16);
	state = {
		color: '#000000',
	};

	handleClick = () => this.setState({ color: this.getRandomColor() });

	render() {
		return (
			<div>
				<button onClick={this.handleClick}>랜덤 색상</button>
				<ErrorBoundary>
					<LifeCycleSample color={this.state.color} />
				</ErrorBoundary>
			</div>
		);
	}
}

export default LifeCycleSampleWrap;
