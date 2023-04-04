import React, { useState, useEffect } from 'react'
//import { useFetch } from "./xx"  `as a custom hook, if 'useFetch()' !component! is const in another file (unlike other hooks such as 'useState()', import from 'react')`

const url = 'https://api.github.com/users'

/*25.use 'fetch()' function to read data from url 
export const D = () => {
  const [state, setState] = useState([])
  const [loading, setLoading] = useState(true)

  const getData = async () => {
    const a = await fetch(url)
    const t = await a.json()

    setLoading(false)
    setState(t)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      {loading && <>Loading...</>}
      {state.map((m) => {
        console.log(m)
        return (
          <div className='item' key={m.id}>
            <h4>{m.login}</h4>
            <p>{m.id}</p>
          </div>
        )
      })}
    </>
  )
}
25*/

/*26.use 'useFetch()' component/custome hook to read data from url 26*/
export const D = () => {
  const { loading, state } = useFetch(url) //`destructure 'useFetch()' to use properties in 'useFetch()' component , instead of '<useFetch/>'`
  return (
    <>
      {loading && <>Loading...</>}
      {state.map((m) => {
        return (
          <div className='item' key={m.id}>
            <h4>{m.login}</h4>
            <p>{m.id}</p>
          </div>
        )
      })}
    </>
  ) //`use 'map()' to read data and show data`
}

const useFetch = (url) => {
  const [state, setState] = useState([])
  const [loading, setLoading] = useState(true)

  const getData = async () => {
    const a = await fetch(url)
    const t = await a.json()

    setLoading(false)
    setState(t)
  }

  useEffect(() => {
    getData()
  }, [url]) //`re-render when url change`

  return { loading, state }
} //`return properties in 'useFetch()' component, in order to destructure 'useFetch()' in the parent component`
//`should export 'useFetch' if code in another file`
