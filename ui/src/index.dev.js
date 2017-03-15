import "./css/app.css";

import "react-hot-loader/patch";
import "webpack/hot/only-dev-server";
import "webpack-dev-server/client?http://localhost:8080";

import React from "react";
import {render} from "react-dom";
import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import thunkMiddleware from "redux-thunk";

import createHistory from "history/createBrowserHistory";

import { ConnectedRouter, routerReducer, routerMiddleware } from "react-router-redux";

import createLogger from "redux-logger";
import {AppContainer} from "react-hot-loader";

import App from "./app/app";
import reducers from "./app/reducers";
import axiosConfig from "./app/config/axios";
import authStateMiddleware from "./app/middleware/auth-state";
import "./mock";

const history = createHistory();

const rootReducer = combineReducers({
	...reducers,
	routing: routerReducer
});

const logger = createLogger();

const middleware = applyMiddleware(
	routerMiddleware(history),
	thunkMiddleware,
	// logger,
	authStateMiddleware
);

const composeEnhancers =
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	rootReducer,
	composeEnhancers(middleware)
);

axiosConfig(store.dispatch);

render(
	<AppContainer>
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<App/>
			</ConnectedRouter>
		</Provider>
	</AppContainer>,
	document.getElementById("root")
);
