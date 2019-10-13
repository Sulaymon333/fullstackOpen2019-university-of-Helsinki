import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const names = [
    { id: 1, name: 'Suly Teejay', number: '040-1237854' },
    { id: 2, name: 'John Doe', number: '040-1689594' },
    { id: 3, name: 'Mango Papaya', number: '040-2854123' }
];

ReactDOM.render(<App names={names} />, document.getElementById('root'));
