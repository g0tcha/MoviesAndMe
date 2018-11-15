import { createStore, combineReducers } from 'redux'
import toggleFavorite from './reducers/favoriteReducer'
import setAvatar from './reducers/setAvatar'

export default createStore(combineReducers({toggleFavorite, setAvatar}))
