// /* eslint-disable */




// ///////////////////////////////////////////////////////////////Jo Redux Thunk Chal Rahi Hai Lekin Chat ki Waja Se Band Ki Hai
// eslint-disable-next-line 
// import/prefer-default-export
// import { createStore, applyMiddleware,compose } from 'redux';
// // import createSagaMiddleware from 'redux-saga';
// import thunk from 'redux-thunk';
// import reducers from './reducers';



// // import sagas from './sagas';
// // const sagaMiddleware = createSagaMiddleware();


// // const middlewares = [sagaMiddleware];
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export function configureStore(initialState) {

//   const store = createStore(
//     reducers,
//     initialState,
//     // applyMiddleware(thunk)
//     composeEnhancers(applyMiddleware(thunk))
//   );

//   // sagaMiddleware.run(sagas);

//   if (module.hot) {
//     module.hot.accept('./reducers', () => {
//       // eslint-disable-next-line global-require
//       const nextRootReducer = require('./reducers');
//       store.replaceReducer(nextRootReducer);
//     });
//   }     

//   return store;
// }

// /////////////////////////////////////////////Ye Woh Redux Hai Jo Theme Ki Hai 
// import { createStore, applyMiddleware, compose } from 'redux';
// import createSagaMiddleware from 'redux-saga';
// import reducers from './reducers';
// import sagas from './sagas';

// const sagaMiddleware = createSagaMiddleware();

// const middlewares = [sagaMiddleware];

// // eslint-disable-next-line import/prefer-default-export
// export function configureStore(initialState) {
//   const store = createStore(
//     reducers,
//     initialState,
//     compose(applyMiddleware(...middlewares))
//   );

//   sagaMiddleware.run(sagas);

//   if (module.hot) {
//     module.hot.accept('./reducers', () => {
//       // eslint-disable-next-line global-require
//       const nextRootReducer = require('./reducers');
//       store.replaceReducer(nextRootReducer);
//     });
//   }

//   return store;
// }


// thunkkkkkkkkkkkkk
/* eslint-disable */

import { createStore, applyMiddleware,compose } from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

import reducers from './reducers';
// import sagas from './sagas';

// const sagaMiddleware = createSagaMiddleware();

// const middlewares = [sagaMiddleware];

// eslint-disable-next-line import/prefer-default-export
export function configureStore(initialState) {
  const store = createStore(
    reducers,
    initialState,
    // applyMiddleware(thunk)
    composeEnhancers(applyMiddleware(thunk))
  );

  // sagaMiddleware.run(sagas);   

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      // eslint-disable-next-line global-require
      const nextRootReducer = require('./reducers');
      store.replaceReducer(nextRootReducer);
    });
  }     

  return store;
}




