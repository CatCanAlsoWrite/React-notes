import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Link, useParams } from 'react-router-dom'
import { data } from './data'

/*29.use Router to build links 29*/
export const D = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/people' element={<People />} />
        <Route path='/people/:id' element={<Person />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  ) //`use 'path='/...' to set href in '<Route/>' (vs 'to='/...' in '<Link>'), use 'element={}' to read data in '<Route>'`
  //`use 'path='/people/:id' to set href to a '<Person />'(only keys like ':id' or ':name' is essential, but remember to keep the prefix like '/people/' the same as in '<Link to={`/people/${id}`}>' in People component)`
  //`use 'path='*' to set href to an '<Error />'`
} //`wrap '<Route/>' in '<Routes>' in '<Router>', put '<Nav/>' before '<Routes>'`

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <p>home info</p>
    </>
  )
}

const About = () => {
  return (
    <>
      <h1>About</h1>
      <p>about info</p>
    </>
  )
}

const People = () => {
  const [people, setPeople] = useState(data)
  return (
    <>
      <h1>People</h1>
      {people.map((m) => {
        return (
          <>
            <div className='item' key={m.id}>
              {m.name}
              <Link to={`/people/${m.id}`}>read more...</Link>
            </div>
          </>
        ) //`use to={`/people/${id}`} to link to href to '<Link >'(only keys like {`${id}`} or {`${name}`} is essential, but remember to keep the prefix like '/people/' the same as in '<Route path='/people/:id'/>' in D component)`
      })}
    </>
  )
}

const Person = () => {
  const [name, setName] = useState('default name')
  const { id } = useParams() //`destructure object 'useParams()', link parameter 'id' to href in '<Route path='/people/:id' />' in D component`
  console.log(useParams()) //{id: '1'}  `
  console.log(parseInt(id)) //1 `opposite method: 'parseInt()' vs 'toString(id)', or '.parseInt' vs '.toString'`
  useEffect(() => {
    const findName = data.find((f) => f.id === parseInt(id))
    console.log(findName)
    setName(findName.name)
  }, [])
  return (
    <>
      <h1>{name}</h1>
      <Link to='/people' className='btn'>
        Back to People
      </Link>
    </>
  )
}

const Error = () => {
  return (
    <>
      <h1>Error</h1>
      <Link to='/'>
        <button className='btn'>back to Home</button>
      </Link>
    </>
  )
} //`use 'to='/...' to link to href in '<Link>' (vs 'path='/...' in '<Route/>')`

const Nav = () => {
  return (
    <nav>
      <ul>
        <Link to='/'>
          <li>Home</li>
        </Link>
        <Link to='/about'>
          <li>About</li>
        </Link>
        <Link to='/people'>
          <li>People</li>
        </Link>
      </ul>
    </nav>
  )
}
