import React, { useState, useEffect, useRef } from 'react'

/*16.add eventlistener to set function, use '.target.value' to upload value (vs use 'useRef()' to upload value, see 19)
export const D = () => {
  const [email, setEmail] = useState('')
  const handle = (d) => {
    d.preventDefault()
    console.log({ email })
  } //`add '.preventDefault()' to avoid unexpected chrome action`
  return (
    <>
      <article>
        <form className='form' onSubmit={handle}>
          <div className='form-control'>
            <label htmlFor='name'>Name: </label>
            <input type='text' id='name' name='name' />
          </div>
          <div className='form-control'>
            <label htmlFor='email'>Email: </label>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={(a) => setEmail(a.target.value)}
            />
          </div>
          <button type='submit'>add person</button>
        </form>
      </article>
    </>
  ) //`<form onSubmit={handle}>=<button onClick={handle}>`
} //`use 'value' and 'onChange' pair to set dynamic value`
16*/

/*17.input form data to new array 
export const D = () => {
  const [age, setAge] = useState('')
  const [email, setEmail] = useState('')
  const [people, setPeople] = useState([])

  const change = (t) => {
    t.preventDefault()
    if (age && email) {
      const person = { id: new Date().getTime().toString(), age, email }
      console.log(person)
      setPeople((people) => {
        return [...people, person]
      })

      setAge('')
      setEmail('')
    } else {
      console.log('input something')
    }
  }
  return (
    <>
      <article>
        <form className='form' onSubmit={change}>
          <div className='form-control'>
            <label htmlFor='name'>Name: </label>
            <input type='text' id='name' name='name' />
          </div>
          <div className='form-control'>
            <label htmlFor='age'>Age: </label>
            <input
              type='number'
              id='age'
              name='age'
              value={age}
              onChange={(a) => setAge(a.target.value)}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='email'>Email: </label>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={(a) => setEmail(a.target.value)}
            />
          </div>
          <button type='submit'>add person</button>
        </form>
      </article>
      {people.map((e) => {
        const { id, age, email } = e
        console.log(id)
        return (
          <div className='item' key={id}>
            <h4>{age}</h4>
            <p>{email}</p>
          </div>
        )
      })}
    </>
  )
}//`using 'onChange()'+'.target.value' can see changes in 'hooks' in 'component' in web inspect tool`
17*/

/*18.short code 
export const D = () => {
  const [person, setPerson] = useState({ username: '', age: '', email: '' })
  const [people, setPeople] = useState([])

  const upload = (a) => {
    const name = a.target.name
    const value = a.target.value
    setPerson({ ...person, [name]: value }) //`add dynamic value`
  }
  const submitUpload = (t) => {
    t.preventDefault()
    if (person.username && person.email && person.age) {
      const newPerson = { ...person, id: new Date().getTime().toString() }
      setPeople([...people, newPerson])
      setPerson({ username: '', age: '', email: '' })
    } else {
      alert('input sth')
    }
  }
  return (
    <>
      <article>
        <form className='form' onSubmit={submitUpload}>
          <div className='form-control'>
            <label htmlFor='username'>Username: </label>
            <input
              type='text'
              id='username'
              name='username'
              value={person.username}
              onChange={upload}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='age'>Age: </label>
            <input
              type='number'
              id='age'
              name='age'
              value={person.age}
              onChange={upload}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='email'>Email: </label>
            <input
              type='email'
              id='email'
              name='email'
              value={person.email}
              onChange={upload}
            />
          </div>
          <button type='submit'>add person</button>
        </form>
      </article>
      {people.map((i) => {
        const { id, username, age, email } = i
        return (
          <div className='item' key={id}>
            <h4>{username}</h4>
            <h4>{age}</h4>
            <h4>{email}</h4>
          </div>
        ) //`need unique key in div when showing each return on the webpage`
      })}
    </>
  )
}
18*/

/*19.use 'useRef()' to upload value(vs use '.target.value', see 16) 19*/
export const D = () => {
  const reference1 = useRef(null)
  const reference2 = useRef(null)

  const upload = (a) => {
    a.preventDefault()
    console.log(reference1.current.value) //123 (content of input) `'useRef()' targets DOM nodes/elements`
    console.log(reference2.current) //<div>hi</div> `'useRef()' targets DOM nodes/elements`
    console.log(reference2.current.value) //undefined `??because of no input??`
  }

  useEffect(() => {
    console.log(reference1.current) //<input type='text'/>
    reference1.current.focus() //`when first open the webpage, cursor will be in the typing space of this reference1 item`
  }) //`'useRef()' doesn't trigger re-render, so no need for dependency parameter of 'useEffect()'`

  return (
    <>
      <form className='form' onSubmit={upload}>
        <div>
          <input type='text' ref={reference1} />
        </div>
        <button type='submit'>submit</button>
      </form>
      <div ref={reference2}>hi</div>
    </>
  ) //`'useRef()' preserves value`
}
