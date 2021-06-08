import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PropsTest4 extends Component {
	static defaultProps = {
		age: 30,
	};

	// static propTYpes = {
	// 클래스에서도 사용가능
	// }

	render() {
		const { name, favoriteNumber, age, children } = this.props;

		return (
			<div>
				안녕하세요, 제 이름은 {name} 입니다. <br />
				children 값은 {children} 입니다. <br />
				제가 좋아하는 숫자는 {favoriteNumber} 입니다. <br />
				나이는 {age} 입니다.
			</div>
		);
	}
}

PropsTest4.defaultProps = {
	name: '기본 이름',
};

PropsTest4.propTypes = {
	name: PropTypes.string,
	favoriteNumber: PropTypes.number.isRequired,
};

export default PropsTest4;
