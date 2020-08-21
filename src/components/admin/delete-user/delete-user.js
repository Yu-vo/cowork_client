import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import './delete-block.css'

export const DeleteUser = () => {
  const places = useSelector(store => store.places)

  let listUser
  let listComments
  const [users, setUsers] = useState(null)
  const [comments, setComments] = useState(null)
  const [activeUser, setActiveUser] = useState(null)
  useEffect(() => {
    fetch('http://localhost:3000/getallusers', {
      method: 'POST',
      // body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => setUsers(res.data))
    fetch('http://localhost:3000/getallcomment', {
      method: 'POST',
      // body: JSON.stringify({ id_place }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => setComments(res.data))
  }, [])
  useEffect(() => {
    fetch('http://localhost:3000/getallusers', {
      method: 'POST',
      // body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => setUsers(res.data))
  }, [comments])
  const handleClickUser = event => {
    setActiveUser(event)
  }
  const handleDeleteUser = event => {
    fetch('http://localhost:3000/deleteuser', {
      method: 'POST',
      body: JSON.stringify({ user: event }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(
      fetch('http://localhost:3000/getallcomment', {
        method: 'POST',
        // body: JSON.stringify({ id_place }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(res => {
          setComments(res.data)
        })
    )
  }

  const handleDeleteComment = event => {
    fetch('http://localhost:3000/deletecomment', {
      method: 'POST',
      body: JSON.stringify({ comment: event }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(
      fetch('http://localhost:3000/getallcomment', {
        method: 'POST',
        // body: JSON.stringify({ id_place }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(res => setComments(res.data))
    )
  }
  if (users)
    listUser = users.map(user => {
      return (
        <li
          className="listDelete"
          key={user.id_user}
          onClick={() => handleClickUser(user.id_users)}
        >
          <span>{user.user_name}</span>
          {activeUser == user.id_users ? (
            <button
              type="button"
              onClick={() => handleDeleteUser(user.id_users)}
            >
              Удалить
            </button>
          ) : null}
        </li>
      )
    })
  if (comments)
    listComments = comments.map(comment => {
      // console.log(
      //   places.data.find(place => place.id_place == comment.id_place).id_place
      // )
      return comment.id_users == activeUser ? (
        <li className="listDelete">
          <p>
            {
              places.data.find(place => place.id_place == comment.id_place)
                .title_place
            }
          </p>
          <p>{comment.text_comment}</p>
          <p>
            {comment.rating}
            {'★'}
          </p>
          <button
            type="button"
            onClick={() => handleDeleteComment(comment.id_comment)}
          >
            Удалить
          </button>
        </li>
      ) : null
    })
  return (
    <div className="delete-block">
      <ul className="userlist">{listUser}</ul>
      <ul className="commentslist">{listComments}</ul>
    </div>
  )
}
