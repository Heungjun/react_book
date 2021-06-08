// page: 103.
import React from 'react';
// import MyComponent from './MyComponent';
// import PropsTest from './PropsTest';
// import PropsTest2 from './PropsTest2';
// import PropsTest3 from './PropsTest3';
import PropsTest4 from './PropsTest4';

// const App = () => <MyComponent />;
// const App = () => <PropsTest>리액트</PropsTest>;
// const App = () => <PropsTest2>리액트2</PropsTest2>;
// const App = () => <PropsTest3 name={'React'}>리액트3</PropsTest3>;
const App = () => (
	<PropsTest4 name={'React'} favoriteNumber={9}>
		리액트3
	</PropsTest4>
);

export default App;
