import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import { books } from './data'
import B from './Component'

const BookList = () => {
  return (
    <section>
      <h1>BookList for you</h1>
      <article className='art'>
        {books.map((d) => {
          return <B key={d.id} {...d} />
        })}
      </article>
    </section>
  )
}
ReactDOM.render(<BookList />, document.getElementById('root'))
