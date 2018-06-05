import React from 'react';
import { render as renderDom } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './components/app/app';
import reducer from './reducer';
import thunk from './lib/redux-thunk';
import reporter from './lib/redux-reporter';
import session from './lib/redux-session';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk, reporter, session)));

const appContainer = document.createElement('div');
document.body.appendChild(appContainer);

renderDom(<Provider stroe={store}><App/></Provider>);