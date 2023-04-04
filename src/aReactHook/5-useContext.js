import React, { useState, useContext } from 'react'
import { data } from './data'

/*22.prop drilling: use property(with the same name) to pass data down the components
export const D = () => {
  const [people, setPeople] = useState(data)

  return (
    <>
      <h3>prop drilling</h3>
      <List p1={people} />
    </>
  )
}

const List = ({ p1 }) => {
  return (
    <>
      <Item p2={p1} />
    </>
  )
}

const Item = ({ p2 }) => {
  return (
    <>
      {p2.map((m) => {
        const { id, name } = m
        return (
          <div key={id} className='item'>
            <h4>{name}</h4>
          </div>
        )
      })}
    </>
  )
}
22*/

/*23.prop drilling: use property(with the same name) to pass function down the components 
export const D = () => {
  const [people, setPeople] = useState(data)
  const removeItem = (r) => {
    setPeople((s) => {
      return s.filter((f) => f.id !== r)
    })
  }
  return (
    <>
      <h3>prop drilling</h3>
      <List p1={people} r1={removeItem} />
    </>
  )
}

const List = ({ p1, r1 }) => {
  return (
    <>
      {p1.map((m) => {
        return <Item key={m.id} {...m} r2={r1} />
      })}
    </>
  ) //`use '...' operator to pass properties`
} //`split up property in the penultimate component`

const Item = ({ id, name, r2 }) => {
  return (
    <div className='item'>
      <h4>{name}</h4>
      <button
        onClick={() => {
          r2(id)
        }}
      >
        remove
      </button>
    </div>
  ) //`if a function or an eventlistener such as 'onClick()', callbacks another function with one of several parameters, it should use an entire code like '() => {r2(id)}'
}
23*/

/*24.Context API: use 'useContext()' to pass props directly to the destinate component 24*/
const PeopleContext = React.createContext() //`use 'React.createContext()' to create`
//`use two components '.Provider' and '.Consumer' to throw props`

export const D = () => {
  const [people, setPeople] = useState(data)
  const removeItem = (r) => {
    setPeople((s) => {
      return s.filter((f) => f.id !== r)
    })
  }
  return (
    <PeopleContext.Provider value={{ people, removeItem }}>
      <h3>prop drilling</h3>
      <List />
    </PeopleContext.Provider>
  ) //`use 'PeopleContext.Provider' to get data from 'value={}'`
} //`use '{}' to contain property`

const List = () => {
  const peopleProp = useContext(PeopleContext) //`add new varible to read data (unlike function)`
  return (
    <>
      {peopleProp.people.map((m) => {
        return <Item key={m.id} {...m} />
      })}
    </>
  ) //`split up property in the penultimate component`
}

const Item = ({ id, name }) => {
  const { removeItem } = useContext(PeopleContext) //`use '{}' to read function (unlike data)`
  return (
    <div className='item'>
      <h4>{name}</h4>
      <button
        onClick={() => {
          removeItem(id)
        }}
      >
        remove
      </button>
    </div>
  )
}
