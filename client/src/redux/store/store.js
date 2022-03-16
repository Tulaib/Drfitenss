/*eslint-disable*/

import { createStore, applyMiddleware,compose} from 'redux';
import reducers from './reducer/rootReducer';
import thunk from 'redux-thunk';

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSIONS_COMPOSE__ || compose;

const store = createStore(
    reducers,
    {},
    composeEnhancers(applyMiddleware(thunk))
    );

export default store;
