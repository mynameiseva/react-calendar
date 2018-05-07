import {createStore, compose} from 'redux'
import reducers from './reducers/index'

const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

export default createStore(
  reducers,
  composeSetup()
)
