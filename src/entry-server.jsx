import React from 'react';
import {renderToString} from 'react-dom/server';
import App,{routes} from './App.jsx';
export {routes};
export const render=page=>renderToString(<App page={page}/>);
