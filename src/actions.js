export const install_user = (user_name, id_user) => ({
  type: 'USER_INSTALL',
  payload: [user_name, id_user],
})
export const get_places = places => {
  return { type: 'GET_PLACES', payload: places }
}
export const type_reducer = type => {
  return { type: 'SAVE_TYPE', payload: type }
}
export const state_search_reducer = state_search => {
  return { type: 'SAVE_STATE_SEARCH', payload: state_search }
}
export const favorite_reducer = favorite_places => {
  console.log(favorite_places)
  return { type: 'SAVE_FAVORITE', payload: favorite_places }
}
