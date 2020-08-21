export const getUser = (dispatch, install_user) => {
  fetch('http://localhost:3000/getuser', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then(res => res.json())
    .then(res => dispatch(install_user(res.data.user_name, res.data.id_users)))
    .catch(err => console.log(err))
}
