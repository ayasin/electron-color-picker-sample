'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import RootComponent from './components/first.root.jsx';

ReactDOM.render(React.createElement(RootComponent, null), document.getElementById('mount-point'));
