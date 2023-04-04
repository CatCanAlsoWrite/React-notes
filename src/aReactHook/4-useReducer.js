import React, { useState, useReducer, useEffect } from 'react'
import { data } from './data'

/*20.with only 'useState()', too much redundant steps 
export const D = () => {
  const [name, setName] = useState('')
  const [people, setPeople] = useState(data)
  const [showR, setShowR] = useState(false)
  const upload = (a) => {
    a.preventDefault()
    if (name) {
      setShowR(true)
      setPeople([...people, { id: new Date().getDate().toString(), name }])
      setName('')
    } else {
      setShowR(true)
    }
  }

  return (
    <>
      {showR && <R />}
      <form className='form' onSubmit={upload}>
        <div>
          <input
            type='text'
            value={name}
            onChange={(t) => setName(t.target.value)}
          />
        </div>
        <button type='submit'>add</button>
      </form>
      {people.map((t) => {
        const { name, id } = t
        return (
          <div key={id}>
            <h4>{name}</h4>
          </div>
        )
      })}
    </>
  )
}

export const R = () => <div className='model'>hi (from R component)</div>
20*/

/*21.add 'useReducer()' to short code (add and remove items) 21*/
export const D = () => {
  const reducer = (state, action) => {
    if (action.type === 'ADD_ITEM') {
      const newPeople = [...state.people, action.payload]
      return {
        ...state,
        people: newPeople,
        showR: true,
        contentR: 'name added',
      } //`always use '...state' is a good habit no matter if needed to keep previous data`
    } else if (action.type === 'NO_VALUE') {
      return {
        ...state,
        showR: true,
        contentR: 'input sth',
      } //`use '...state' to keep previous data`
    } else if (action.type === 'CLOSE_R') {
      return {
        ...state,
        showR: false,
      }
    } else if (action.type === 'REMOVE_ITEM') {
      const newPeople = state.people.filter((t) => t.id !== action.payload)
      return {
        ...state,
        people: newPeople,
      }
    } //`use 'filter()' to remove items`
    throw new Error('no matching action type')
  } //`always return some state stuff in function 'reducer', otherwise, 'value' won't be updated, further function/return will meet error`
  const defaultValue = {
    people: [],
    showR: false,
    contentR: '',
  }

  const [name, setName] = useState('')
  const [value, dispatch] = useReducer(reducer, defaultValue) //`all these 4 variable names can change, in which 'dispatch' is a default name`
  //const [people, setPeople] = useState(data)
  //const [showR, setShowR] = useState(false)

  const upload = (a) => {
    a.preventDefault()
    if (name) {
      const newItem = { id: new Date().getTime().toString(), username: name }
      dispatch({ type: 'ADD_ITEM', payload: newItem }) //`always add an object with 'type' key and uppercase value, for matching the 'action' parameter of 'reducer'`
      //`can add some other key-value pairs into 'dispatch()'`
      setName('')
    } else {
      dispatch({ type: 'NO_VALUE' })
    }
  }

  const closeR = () => {
    dispatch({ type: 'CLOSE_R' })
  }

  return (
    <>
      {value.showR && <R contentR={value.contentR} closeR={closeR} />}
      <form className='form' onSubmit={upload}>
        <div>
          <input
            type='text'
            value={name}
            onChange={(t) => setName(t.target.value)}
          />
        </div>
        <button type='submit'>add</button>
      </form>
      {value.people.map((i) => {
        return (
          <div key={i.id} className='item'>
            <h4>{i.username}</h4>
            <button
              onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: i.id })}
            >
              remove
            </button>
          </div>
        ) //`add 'dispatch()' directly to link to action`
      })}
    </>
  ) ///`can set value like ' <R contentR={state.contentR} />', for already  added '{ contentR }' as parameter in './4-component'`
}

export const R = ({ contentR, closeR }) => {
  useEffect(() => {
    setTimeout(() => {
      closeR()
    }, 3000)
  })
  return <div className='model'>{contentR}</div>
} //`add '{ contentR }' as parameter, so can set value like ' <R contentR={state.contentR} />' in './4-useReducer'`
//`add '{ closeR }' as parameter, so can set value like ' <R contentR={closeR} />' in './4-useReducer'`
