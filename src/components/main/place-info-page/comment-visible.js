import React, { useEffect, useState, useRef } from 'react'

import './comment-visible.css'
export const CommentVisible = ({ updateComments, id_place, stars }) => {
  const [comments, setComments] = useState(null)
  const listComments = useRef(null)
  useEffect(() => {
    fetch('http://localhost:3000/getcomment', {
      method: 'POST',
      body: JSON.stringify({ id_place }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        setComments(res)
        stars(res)
      })
  }, [updateComments])
  if (comments)
    listComments.current = comments.data.map(item => {
      return (
        <div
          className="visible-comment-block"
          key={item.user_name + Math.random()}
        >
          <div className="comment">
            {item.user_name}
            {item.rating == 1 ? (
              <div className="rating-mini">
                <span className="active"></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            ) : item.rating == 2 ? (
              <div className="rating-mini">
                <span className="active"></span>
                <span className="active"></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            ) : item.rating == 3 ? (
              <div className="rating-mini">
                <span className="active"></span>
                <span className="active"></span>
                <span className="active"></span>
                <span></span>
                <span></span>
              </div>
            ) : item.rating == 4 ? (
              <div className="rating-mini">
                <span className="active"></span>
                <span className="active"></span>
                <span className="active"></span>
                <span className="active"></span>
                <span></span>
              </div>
            ) : item.rating == 5 ? (
              <div className="rating-mini">
                <span className="active"></span>
                <span className="active"></span>
                <span className="active"></span>
                <span className="active"></span>
                <span className="active"></span>
              </div>
            ) : null}
          </div>
          <p>{item.text_comment}</p>
        </div>
      )
    })
  return <>{listComments.current}</>
}
