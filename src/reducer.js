import { combineReducers } from 'redux'

const initialStatePlaces = null
const places_reducer = (state = initialStatePlaces, action) => {
  console.log(action.type)
  switch (action.type) {
    case 'GET_PLACES':
      console.log(action.payload)
      return action.payload
    default:
      return state
  }
}
const initialStateUser = null
const user_reducer = (state = initialStateUser, action) => {
  console.log(action.type)
  switch (action.type) {
    case 'USER_INSTALL':
      console.log(action.payload)
      return action.payload
    default:
      return state
  }
}
const initialStateType = null
const type_reducer = (state = initialStateType, action) => {
  console.log(action.type)
  switch (action.type) {
    case 'SAVE_TYPE':
      console.log(action.payload)
      return action.payload
    default:
      return state
  }
}
const initialStateSearch = null
const state_search_reducer = (state = initialStateSearch, action) => {
  console.log(action.type)
  switch (action.type) {
    case 'SAVE_STATE_SEARCH':
      console.log(action.payload)
      return action.payload
    default:
      return state
  }
}
const initialStateFavorite = null
const favorite_reducer = (state = initialStateFavorite, action) => {
  console.log('SAVE_FAVORITE')
  switch (action.type) {
    case 'SAVE_FAVORITE':
      console.log(action.payload)
      return action.payload
    default:
      return state
  }
}
const rootReducer = combineReducers({
  user: user_reducer,
  places: places_reducer,
  type: type_reducer,
  state_search: state_search_reducer,
  favorite_places: favorite_reducer,
})
export default rootReducer
