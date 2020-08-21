import React, { useState } from 'react'

import './comment.css'

export const Comment = ({ setUpdateComments, id_place, id_user }) => {
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(0)
  const handleOnChange = event => {
    setComment(event.target.value)
    console.log(event.target.value)
  }
  const handleOnClick = () => {
    const data = { id_user, id_place, comment, rating }
    console.log(comment.length)
    console.log(rating)
    if (comment.length > 0 && rating != 0) {
      fetch('http://localhost:3000/setcomment', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(
        setUpdateComments(value => !value),
        setComment(''),
        setRating(0)
      )
    } else
      alert(
        'Поле комментария не доолжно быть пусто и оценка должна быть поставлена'
      )
  }
  const handleRating = event => {
    setRating(parseInt(event.target.value))
  }
  return (
    <div className="block-comment">
      <h4>Напишите впечатление о месте и оцените его</h4>
      <textarea
        className="textarea-comment"
        type="text"
        onChange={handleOnChange}
        value={comment}
      ></textarea>
      <div className="rating-area">
        <input
          type="radio"
          id="star-5"
          name="rating"
          value="5"
          onChange={handleRating}
        />
        <label htmlFor="star-5" title="Оценка «5»"></label>
        <input
          type="radio"
          id="star-4"
          name="rating"
          value="4"
          onChange={handleRating}
        />
        <label htmlFor="star-4" title="Оценка «4»"></label>
        <input
          type="radio"
          id="star-3"
          name="rating"
          value="3"
          onChange={handleRating}
        />
        <label htmlFor="star-3" title="Оценка «3»"></label>
        <input
          type="radio"
          id="star-2"
          name="rating"
          value="2"
          onChange={handleRating}
        />
        <label htmlFor="star-2" title="Оценка «2»"></label>
        <input
          type="radio"
          id="star-1"
          name="rating"
          value="1"
          onChange={handleRating}
        />
        <label htmlFor="star-1" title="Оценка «1»"></label>
      </div>
      <button className="button-comment" type="button" onClick={handleOnClick}>
        Отправить
      </button>
    </div>
  )
}
