import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { reducers } from './reducers';
import { GoogleOAuthProvider } from '@react-oauth/google';

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <GoogleOAuthProvider
        clientId="72175302364-f1u2q9lak0agbne0c6o7d4ocfg7ag44s.apps.googleusercontent.com"  // Replace with your actual Google client ID
      >
        <Provider store={store}>
          <App />
        </Provider>
      </GoogleOAuthProvider>

  </React.StrictMode>
);