import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const names = [{ id: 1, name: 'Suly Teejay' }, { id: 2, name: 'John Doe' }, { id: 3, name: 'Mango Papaya' }];

ReactDOM.render(<App names={names} />, document.getElementById('root'));
