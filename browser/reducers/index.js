/**
 * Since some processings of the database may be CPU and time consuming, 
 * any gui state updates that rely on database state are done in the action
 * creators by using redux-thunk which made getState() available. In this way,
 * accessing database state is more like accesing a API over the network.
 */

import statusReducer from './status'
import guiReducer from './gui'
import { combineReducers } from 'redux-immutable'


export default combineReducers({
    status: statusReducer,
    gui: guiReducer,
})