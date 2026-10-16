import React from 'react';
import {createRoot,hydrateRoot} from 'react-dom/client';
import App from './App.jsx';
import './styles.css';
const page=window.location.pathname.split('/').pop().replace(/\.html$/,'').replace(/^index$/,'');
const root=document.getElementById('root');
const app=<App page={page}/>;
root.hasChildNodes()?hydrateRoot(root,app):createRoot(root).render(app);
