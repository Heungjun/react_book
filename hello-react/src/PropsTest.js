import React from 'react';

const PropsTest = (props) => {
	return (
		<div>
			안녕하세요. 제 이름은 {props.name} 입니다.
			<br /> children 값은 {props.children} 입니다.
		</div>
	);
};

// defaultValue 설정
PropsTest.defaultProps = {
	name: '무명',
};

export default PropsTest;
