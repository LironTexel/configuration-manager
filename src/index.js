import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {applyMiddleware, createStore, compose} from 'redux';
import rootReducer from "./store/reducers/rootReducer";
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import { reduxFirestore, createFirestoreInstance } from "redux-firestore";
import { getFirebase, ReactReduxFirebaseProvider } from "react-redux-firebase";
import firebaseConfig from "./config/firebaseConfig";
import firebase from "firebase/app";

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(getFirebase)),
        reduxFirestore(firebase, firebaseConfig),
    )
);

const rrfConfig = {
    userProfile: 'users', // where profiles are stored in database,
    useFirestoreForProfile: true,
    attachAuthIsReady: true,
    // updateProfileOnLogin: false,
};

const rrfProps = {
    firebase,
    config: rrfConfig,
    firebaseConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
};

ReactDOM.render(
  <React.StrictMode>
      <Provider store={ store }>
          <ReactReduxFirebaseProvider {...rrfProps}>
            <App />
          </ReactReduxFirebaseProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
