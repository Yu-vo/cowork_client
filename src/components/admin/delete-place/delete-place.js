import React, { useRef, useState } from 'react'

import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'
import { get_places } from '../../../actions'

const DeletePlace = ({ places }) => {
  const dispatch = useDispatch()
  const [deleteEl, setDeleteEl] = useState([])
  const deletePlace = useRef()

  const handelClick = event => {
    event.persist()
    event.target.checked
      ? setDeleteEl(places => [...places, event.target.id])
      : setDeleteEl(places => {
          const id = places.indexOf(event.target.id)
          return places.slice(0, id).concat(places.slice(id + 1))
        })
  }
  const handleDelete = () => {
    fetch('http://localhost:3000/deleteplaces', {
      method: 'POST',
      body: JSON.stringify(deleteEl),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(
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
    )
  }
  if (places)
    deletePlace.current = places.data.map(item => {
      return (
        <li key={item.id_place}>
          <input
            className="checkbox-delete"
            type="checkbox"
            onClick={handelClick}
            id={item.id_place}
          ></input>
          {item.title_place}
        </li>
      )
    })
  return (
    <div>
      <button type="button" onClick={handleDelete}>
        Удалить
      </button>
      <ul>{deletePlace.current}</ul>
    </div>
  )
}
const mapStateToProps = ({ places }) => {
  return { places }
}
export default connect(mapStateToProps)(DeletePlace)
