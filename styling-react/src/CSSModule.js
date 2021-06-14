import React, { useEffect } from 'react';
import styles from './CSSModule.module.scss';

const CSSModule = () => {
	useEffect(() => console.log(styles));
	return (
		<div className={`${styles.wrapper} ${styles.inverted}`}>
			안녕하세요, 저는 <span className="something">CSS Module!</span>
		</div>
	);
};

export default CSSModule;
