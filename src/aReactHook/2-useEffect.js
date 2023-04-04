import React, { useEffect, useState } from 'react'
const url = 'https://api.github.com/users'

/*7.set callback function to 'useEffect()'
export const D = () => {
  useEffect(() => {
    console.log('hi') //③hi
  })
  console.log('ho') //①ho ②ho `by default showed twice/runs after every re-render, because of using '<React.StrictMode>' in 'index.js'`
  return <h1>ha</h1>
}
7*/

/*8.add condition into useEffect() `condition should always inside 'useEffect()' (vs condition should always outside 'setValue()') 
export const D = () => {
  const [value, setValue] = useState(0)
  useEffect(() => {
    console.log('hi')
    if (value >= 1) {
      document.title = `new message [${value}]`
    }
  })
  console.log('ho')
  return (
    <div>
      <h1>{value}</h1>
      <button className='btn' onClick={() => setValue(value + 1)} />
    </div>
  ) //`print '①ho ②ho ③hi' each time clicked the button`
}
8*/

/*9.add dependency parameter into useEffect() 
export const D = () => {
  const [value, setValue] = useState(0)
  useEffect(() => {
    console.log('hi') //③hi|| ⑧hi `add dependency parameter(use '[]' to contain an array of dependencies), then when 'value' changes, 'useEffect()' renders`
  }, [value])
  useEffect(() => {
    console.log('ho') //④ho `'[]' means this 'useEffect()' only run on the initial render`
  }, [])
  useEffect(() => {
    console.log('ha') //⑤ha|| ⑨ha
  }) //`default with no dependency, 'useEffect()' run on each render`
  //`can add multi 'useEffect()' as needed`
  console.log('hu') //①hu ②hu|| ⑥hu ⑦hu
  return (
    <div>
      <h1>{value}</h1>
      <button className='btn' onClick={() => setValue(value + 1)}>
        add value
      </button> 
    </div>
  )
}
9*/

/*10.add cleanup function to avoid bunch of useless render (when to add both '[]' and cleanup function? see 15)
export const D = () => {
  const [wid, setWid] = useState(window.innerWidth)
  const checkSize = () => {
    setWid(window.innerWidth)
  }
  //(1)repeating 'event listeners' in 'elements' when using web inspect tools
  useEffect(() => {
    console.log('hi')
    window.addEventListener('resize', checkSize)
  })  //①ho ②ho ③hi|| ④ho ⑤ho ... or ⑥ho ⑦ho ⑧hi ... (repeat when resizing)

  //(2)use 'removeEventListener()' to avoid repeating 'event listeners'
  useEffect(() => {
    console.log('hi')
    window.addEventListener('resize', checkSize)
    return () => {
      console.log('ha')
      window.removeEventListener('resize', checkSize)
    } //①ho ②ho ③hi|| ④ho ⑤ho ⑥ha ⑦hi ... (repeat when resizing) `'removeEventListener()' before 'addEventListener()'`
  }) 
  //(3)use '[]'dependency parameter to avoid repeating 'event listeners' 
  useEffect(
    () => {
      console.log('hi')
      window.addEventListener('resize', checkSize)
    }, //①ho ②ho ③hi|| ④ho ⑤ho
    []
  )

  console.log('ho')
  return (
    <div>
      <h1>window</h1>
      <h2>{wid}</h2>
    </div>
  )
}
10*/

/*11.add async&await to fetch url
export const D = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      const d = await fetch(url)
      const a = await d.json()
      setUsers(a)
    }
    getUsers()
  }, []) //`can't directly async 'useEffect()' like 'useEffect(async ()=>{})', just async inside or outside `
  //`add '[]' as dependency parameter, avoid infinite loop as 'setUsers()' and 'useEffect()' triggering each other`

  console.log('ho')
  return (
    <div>
      <h1>github users</h1>
      <ul className='users'>
        {users.map((t) => {
          const { id, login, avatar_url, html_url } = t
          return (
            <li key={id}>
              <img src={avatar_url} alt='avatar' />
              <div>
                <h4>{login}</h4>
                <a href={html_url}>profile</a>
              </div>
            </li>
          ) //`map() can grab special keys into parameter`
        })}
      </ul>
    </div>
  )
}
11*/

/*12.add multi returns with condition5
export const D = () => {
  const [loading, setLoading] = useState(true)
  if (loading) {
    return <h1>Loading...</h1>
  }
  return <h1>Loaded</h1>
}//without condition, multi returns will only return the first one
12*/

/*13.add condition to throw error from fetch()
export const D = () => {
  const [isloading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [users, setUsers] = useState('default user')

  useEffect(() => {
    fetch(url)
      .then((d) => {
        if ((d.status >= 200) & (d.status <= 299)) {
          return d.json()
        } else {
          setIsLoading(false)
          setIsError(true)
          throw new Error(d.statusText)
        }
      })
      .then((a) => {
        a.map((t) => {
          const { login } = t
          setIsLoading(false)
          setUsers(login)
          return t
        }) //`will set the last login`
      })
      .catch((err) => console.log(err))
  }, []) //`set 'fast 3G' in 'network' in web inspect tool, can easily see the web content changes, from 'Loading...' to 'default user' to 'Bmizerany'`

  if (isloading) {
    return <h1>Loading...</h1>
  } else if (isError) {
    return <h1>Error...</h1>
  }
  return <h1>{users}</h1>
}
13*/

/*14.use '||' '&&' short-circuit evaluation, and '?' ':' ternary operator, to add condition
export const D = () => {
  const [text, setText] = useState(false)
  const [err, setErr] = useState(false)
  return (
    <>
      <h1>{text || 'hi'}</h1>
      {!text && <h1>ha</h1>}
      {text && <h1>ho</h1>}
      <button className='btn' onClick={() => setText(!text)}>
        shift text
      </button>
      <br />
      <h1>{err || 'cool'}</h1>
      {err ? (
        <h1>Error</h1>
      ) : (
        <div>
          <p>no error</p>
        </div>
      )}
      <button className='btn' onClick={() => setErr(!err)}>
        shift err
      </button>
    </>
  )
} // hi ha || ho
14*/

/*15.add both dependency parameter and cleanup function into 'useEffect()'  15*/
export const D = () => {
  const [show, setShow] = useState(true)
  return (
    <>
      {show && <Show />}
      <button className='btn' onClick={() => setShow(!show)}>
        show/hide
      </button>
    </>
  )
}

const Show = () => {
  const [size, setSize] = useState(window.innerWidth)
  const getSize = () => {
    setSize(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener('resize', getSize)
    return () => {
      window.removeEventListener('resize', getSize)
    }
  }, []) //`use '[]' to avoid repeat when resize; use cleanup to avoid repeat when show/hide`
  //`every time 'props' or 'state' changes, component re-renders, so always add '[]'in 'useEffect()' when using 'useState()' to avoid repeat (vs always add 'React.memo()' when using '{props}' in './9-ReactOptimization')`
  return (
    <>
      <h1>window</h1>
      <h2>size: {size}</h2>
    </>
  )
}
