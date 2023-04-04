import React, { useState } from 'react'

/*1.set initial string value using 'useState()'
export const D = () => {
  let [value, setValue] = useState('initial value') //`hooks must be setted in the component or custom hook(like 'useFetch()' in './6-useFetch')`
  return (
    <>
      <h1>{value}</h1>
      <button type='button' className='btn'>
        content
      </button>
    </>
  )
}
1*/

/*2.add button using setValue() function to change initial string value
export const D = () => {
  let [value, setValue] = useState('initial value')
  return (
    <>
      <h1>{value}</h1>
      <button type='button' className='btn' onClick={() => setValue('hi')}>
        change content
      </button>
    </>
  )
}
2*/

/*3.add condition into setValue(), to shift string values `condition should always outside 'setValue()' (vs condition should always inside 'useEffect()')
export const D = () => {
  let [value, setValue] = useState('initial value')
  return (
    <>
      <h1>{value}</h1>
      <button
        type='button'
        className='btn'
        onClick={() =>
          value === 'initial value' ? setValue('hi') : setValue('initial value')
        }
      >
        shift content
      </button>
    </>
  )
}
3*/

/*4.add function into setValue(), to shift string values
import { data } from './data'
export const D = () => {
  const [value, setValue] = useState(data)
  const emptyEach1 = (d) => {
    let a = value.filter((t) => t.name !== d)
    console.log(a) //[{id: 2, name: 'peter'},{id: 3, name: 'susan'}, {id: 4, name: 'anna'}] `after onClick the first button` ||[{id: 3, name: 'susan'}, {id: 4, name: 'anna'}] `then after onClick the second button`
    return setValue(a)
  } //`click button, use 'filter()' to filter unclicked ones(result:3), setValue(filtered/ unclicked ones/[x,x,x])`
  const emptyEach2 = () => {
    let i = value.filter((t) => t.name === '')
    console.log(i) //[] `after click each button`
    return setValue(i)
  } //`click button, use 'filter()' to filter empty ones(result:0), setValue(filtered/[])`
  const emptyEach3 = (d) => {
    let e = value.map((t) => t.name !== d)
    console.log(e) //[true, true, true, true] `after click the first button` ||[false, false, false, false] `after onClick left buttons`
    return setValue(e)
  } //`click button, use 'map()' turning values into boolean, setValue([boolean,boolean,boolean,boolean]), same result as setValue(['', '', '', ''])`
  const emptyEach4 = () => {
    let e = value.map((t) => t.name === '')
    console.log(e) //[false, false, false, false] `after click each button`
    return setValue(e)
  }
  return (
    <>
      {value.map(({ id, name }) => {
        return (
          <>
            <div key={id} className='item'>
              <p>{name}</p>
              <button type='button' onClick={() => emptyEach1(name)}>
                bye this line
              </button>
              <button type='button' onClick={() => emptyEach2()}>
                bye 4 lines
              </button>
              <button type='button' onClick={() => emptyEach3()}>
                4 empty lines
              </button>
              <button type='button' onClick={() => emptyEach4()}>
                4 empty lines
              </button>
              <button type='button' onClick={emptyEach4}>
                4 empty lines
              </button>
            </div>
          </>
        )
      })}
      <button type='button' className='btn' onClick={() => setValue()}>
        bye evething
      </button>
      <button type='button' className='btn' onClick={() => setValue('')}>
        bye evething
      </button>
      <button type='button' className='btn' onClick={() => setValue([])}>
        bye 4 lines
      </button>
      <button type='button' className='btn' onClick={() => setValue([''])}>
        1 empty line
      </button>
      <button
        type='button'
        className='btn'
        onClick={() => setValue(['', '', '', ''])}
      >
        4 empty lines
      </button>
    </>
  )
} //variable 'value' is array as setted by 'useState(data)', so 'setValue()/setValue('')' will wipe everything??,
*/

/*5.shift object values 
export const D = () => {
  const [value, setValue] = useState({
    id: 1,
    name: 'john',
  })
  const change1 = () => {
    setValue({ ...value, name: 'anna' })
  } //`use '...value' as already const variable 'value'`
  const change2 = () => {
    setValue({ name: 'anna' })
  }
  return (
    <>
      <h1>{value.id}</h1>
      <h1>{value.name}</h1>
      <button type='button' className='btn' onClick={change1}>
        change 1 content
      </button>
      <button type='button' className='btn' onClick={change2}>
        change all content
      </button>
      <button
        type='button'
        className='btn'
        onClick={() => setValue({ name: 'anna' })}
      >
        change all content
      </button>
    </>
  )
}
5*/

/*6.initial number value 6*/
export const D = () => {
  const [value, setValue] = useState(0)
  const reset = () => {
    setValue(0)
  }
  const reset2 = () => {
    setTimeout(() => {
      setValue(0)
    }, 2000)
  }
  const dec1 = () => {
    setTimeout(() => {
      setValue(value - 1)
    }, 1000)
  }
  const dec2 = () => {
    setTimeout(() => {
      setValue((d) => {
        return d - 1
      })
    }, 1000)
  }

  return (
    <>
      <h1>simple counter</h1>
      <h1>{value}</h1>
      <button type='button' className='btn' onClick={() => setValue(value - 1)}>
        decrease
      </button>
      <button type='button' className='btn' onClick={() => setValue(value + 1)}>
        increase
      </button>
      <br />
      <button type='button' className='btn' onClick={reset}>
        reset
      </button>
      <button type='button' className='btn' onClick={reset2}>
        reset in 2s
      </button>
      <br />
      <h1>complex counter</h1>
      <h1>{value}</h1>
      <button type='button' className='btn' onClick={dec1}>
        decrease1
      </button>
      <button type='button' className='btn' onClick={dec2}>
        decrease2
      </button>
    </>
  )
}
