export const getData = (dispatch, get_places) => {
  fetch('http://localhost:3000/getplaces', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(res => dispatch(get_places(res)))
    .catch(err => console.log(err))
}
