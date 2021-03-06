import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { fromJS } from 'immutable'
import rootReducer from 'reducers'
import config from './utils/config'

//import logger from './logger'

import AppWrapper from './app'
import { SET_COLOR_SCHEME, UPDATE_CONFIG } from './actions'

// Load fonts and master css
require('./public/css/common.css')
require('./public/fonts/font-awesome/webfonts/fontawesome.css')
require('./public/fonts/font-awesome/webfonts/fa-brands.css')
require('./public/fonts/font-awesome/webfonts/fa-light.css')
require('./public/fonts/font-awesome/webfonts/fa-regular.css')
require('./public/fonts/font-awesome/webfonts/fa-solid.css')
require('./public/fonts/quicksand.css')

var status = config.initialize().status

var initialState = {
    status: {
        unlock: null,
        welcome: status === 'WELCOME' ? true : false
    },
    gui: {
        activePane: null, // {string}
        activeNavTab: null, // {string}
        activeNavTabType: null,
        activeEntries: null,
        searchActive: false,
        activeInfo: null,
    },
    cache: {
        favorites: [],
        categories: {},
        tags: {},
        all: [],
        trash: [],
        abstracts: {}
    },
    config: {
    }
}

const store = createStore(rootReducer, fromJS(initialState), applyMiddleware(thunk))

store.dispatch(SET_COLOR_SCHEME())
store.dispatch(UPDATE_CONFIG())
render(
    <Provider store={store}>
        <AppWrapper />
    </Provider>,
    document.getElementById('root')
)