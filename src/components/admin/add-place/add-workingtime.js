import React, { Fragment } from 'react'

export const AddWorkingTime = ({ tableDay, setTableDay }) => {
  const handleChangeTable = event => {
    event.persist()
    console.log(event)
    setTableDay(state => ({
      ...state,
      [event.target.id]: {
        title: event.target.name,
        id: event.target.id,
        value: event.target.value,
        bd: tableDay[event.target.id].bd,
      },
    }))
  }
  let table = Object.values(tableDay).map(day => {
    return (
      <Fragment key={day.title + 'table'}>
        <p key={day.title}>{day.title}</p>
        <input
          onChange={handleChangeTable}
          type="text"
          id={day.id}
          value={day.value}
          name={day.title}
        ></input>
      </Fragment>
    )
  })
  return <div>{table}</div>
}
