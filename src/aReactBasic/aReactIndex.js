import React from 'react' //`??in new version of react, no need to import`
import ReactDOM from 'react-dom' //`only need to do once this import, normally in index.js`
import './index.css' //`'./' means in the same folder`
//`if no '"type": "module"' in 'package.json'&& importing js code , no need for '.js'; but for other code, need it`
import DefaultName from './file' //`when there is 'const DefaultName=()=>{...}'+'export default DefaultName' in 'file'`
import { Name1 } from './file' //`when there is 'export const Name1=()=>{...}' in 'file'`
import Name2 from './folder' //`can use every file in 'folder'`
//can change 'Name' after 'import' , and use it in this file like '<Name/>' or '<Name><Name/>'
import { data } from '../../../data' //`can use '../' to set unknown mother folder name`

/*1.basic index.js using HTML in return
function Greeting1() {
  return (<h1>hi</h1>) 
}
ReactDOM.render(
  <Greeting2></Greeting2>,
  document.getElementById('root') 
) //hi 
1*/

/*2.basic index.js using 'React.createElement()' in return 
const Greeting2 = () => {
  return (React.createElement('h1', {}, 'hi')) //`same result as 'return <h1>hi</h1>'`
}
ReactDOM.render(<Greeting1 />, document.getElementById('root')) //hi `same result as 'ReactDOM.render(<Greeting />, document.getElementById('root'))'`
2*/

/*3.'{}' in 'React.createElement()'
const Greeting3 = () => {
  return React.createElement(
    'div',
    { style: { color: '#F3CD16', backgroundColor: '#4A5C53' } },
    React.createElement('h1', {}, 'hi')
  )
}
ReactDOM.render(<Greeting3 />, document.getElementById('root')) //ho
3*/

/*4.'{}' in HTML
const d = 'hi'
const Greeting4 = () => {
  //`stateless functional component, having no previous data to address`,
  // `Uppercasse the first letter to distinguish component from function`
  const a = 'ho'
  return (
    <div>
      <h1
        className='h1'
        style={{ color: '#F3CD16', backgroundColor: '#4A5C53' }}
      >
        ha
      </h1>
      <p>{d}</p>
      <p>{a.toUpperCase()}</p>
      <p>{1 + 1}</p>
    </div>
    //`always return single element, even an empty one`,
    //`can use <>/<div>/<section>/<article>,or<React.Fragment> pair to quote`,
    //`use camelCase for HTML attribute`, `use 'className' instead of 'class'`,
    //`use '{}' which brings inner code to js syntax, for non string attribute value, and note that the style value itself is also an object`
    //`can only code expression in '{}', can't code statement like 'let t=1+2' there`
  )
  //`much more readable using HTML syntax than js`,
  //`after 'return', use '()' to avoid probable error, when wrongly pressed an 'enter'`
}
ReactDOM.render(
  <Greeting4 />,
  //`always need closing/self-closing tag in React`
  document.getElementById('root')
  //`what to render, where to render`
) //ho

/*5.split up root component
const Greeting5 = () => {
  return (
    <>
      <G />
      <R />
    </>
  )
} //`split up 'Greeting5()' into several chuncks '<G />' '<R />'`
const G = () => <h1>ha</h1>
const R = () => {
  return <p>message</p>
}
ReactDOM.render(<Greeting5 />, document.getElementById('root'))
//open 'http://localhost:3000', inspect the 'component' using 'React developer tools' extension in chrome, can see the relationship between 'Greeting5()' and '<G />' '<R />'`
5*/

/*6.three methods to render data
import img1 from './Asset 9@4x.png'
const onSales = 'On sales! Days left: '
const endDate = 10
const book5 = {
  img: 'https://images-eu.ssl-images-amazon.com/images/I/81PdkxXJObL._AC_UL300_SR300,200_.jpg',
  author: 'author5',
}

const BookList = () => {
  return (
    <section>
      <h1>BookList for you</h1>
      <article className='art'>
        <Book />
        <Book bookName='bookName2' page={100} />
        <Book bookName='bookName3' author='author3' />
        <Book
          bookName='bookName4'
          img='https://images-eu.ssl-images-amazon.com/images/I/714a8ebZrvL._AC_UL300_SR300,200_.jpg'
        />
        <Book img={book5.img} author={book5.author} />
      </article>
    </section>
  )
}
const Book = (props) => {
  //`use parameter to pass data`, defaul but not strict parameter name can be 'props' (unlike 'children', a special prop, and a strict parameter name when using it)
  return (
    <div>
      <img
        src={img1}
        alt='bookPicLogo'
        style={{ width: '0.7rem', height: '0.7rem' }}
      />
      <img src={props.img} alt='bookPic' />
      <h4>
        {onSales}
        {endDate}
      </h4>
      <p>
        {props.bookName}
        <br />
        {props.author}
      </p>
      <p>{props.page}</p>
    </div>
  ) //`can use stateful values like '{img1}', or stateless property like '{props.img}', and '{props.img}' from object`
}
ReactDOM.render(<BookList />, document.getElementById('root'))
6*/

/*7.use 4th method 'destructure' to render data (vs 10.using '.map()' to distructure '[{}]')`
const onSales = 'On sales! Days left: '
const endDate = 10
const book1 = {
  img: 'https://images-eu.ssl-images-amazon.com/images/I/714a8ebZrvL._AC_UL300_SR300,200_.jpg',
  bookName: 'bookName1',
  author: 'author1',
}
const book2 = {
  img: 'https://images-eu.ssl-images-amazon.com/images/I/81PdkxXJObL._AC_UL300_SR300,200_.jpg',
  bookName: 'bookName2',
  author: 'author2',
}
const BookList = () => {
  return (
    <section>
      <h1>BookList for you</h1>
      <article className='art'>
        <Book />
        <Book img={book1.img} bookName={book1.bookName} author={book1.author} />
        <Book img={book2.img} bookName={book2.bookName} author={book2.author} />
      </article>
    </section>
  )
}
const Book = (props) => {
  const { img, bookName, author } = props
  //`destruct object`
  //const Book =( { img, bookName, author } )=>{...} `short to one line`
  return (
    <div>
      <img src={img} alt='bookPic' />
      <h4>
        {onSales}
        {endDate}
      </h4>
      <p>{bookName}</p>
      <p>{author}</p>
    </div>
  )//`no need to add 'props.' after distructure`
}
ReactDOM.render(<BookList />, document.getElementById('root'))
7*/

/*8.use 5th method 'children' property to render data`
const onSales = 'On sales! Days left: '
const endDate = 10
const book1 = {
  img: 'https://images-eu.ssl-images-amazon.com/images/I/714a8ebZrvL._AC_UL300_SR300,200_.jpg',
  bookName: 'bookName1',
  author: 'author1',
}
const book2 = {
  img: 'https://images-eu.ssl-images-amazon.com/images/I/81PdkxXJObL._AC_UL300_SR300,200_.jpg',
  bookName: 'bookName2',
  author: 'author2',
}
const BookList = () => {
  return (
    <section>
      <h1>BookList for you</h1>
      <article className='art'>
        <Book />
        <Book img={book1.img} bookName={book1.bookName} author={book1.author}>
          <p>some introduces to the book</p>
        </Book>
        <Book img={book2.img} bookName={book2.bookName} author={book2.author} />
      </article>
    </section>
  ) //`always put states of 'children' property between tag and closing tag`
}
const Book = ({ img, bookName, author, children }) => {
  return (
    <div>
      <img src={img} alt='bookPic' />
      <h4>
        {onSales}
        {endDate}
      </h4>
      <p>{bookName}</p>
      <p>{author}</p>
      {children}
    </div>
  ) //`use 'children', a special prop and a strict parameter name when using it, to pass data`
  //`use '{props.children}' to render data when using 'Book(props)' component`
}
ReactDOM.render(<BookList />, document.getElementById('root'))
8*/

/*9.using '.map()' to distructure '[{}]' (vs directly distructure '[]' or '{}')
const arrays = ['bookName1', 'bookName2', 'bookName3']
const newArrays = arrays.map((d) => {
  return <h1>{d}</h1>
})

const books = [
  {
    img: 'https://images-eu.ssl-images-amazon.com/images/I/714a8ebZrvL._AC_UL300_SR300,200_.jpg',
    bookName: 'bookName1',
    author: 'author1',
  },
  {
    img: 'https://images-eu.ssl-images-amazon.com/images/I/81PdkxXJObL._AC_UL300_SR300,200_.jpg',
    bookName: 'bookName2',
    author: 'author2',
  },
]
const newBooks = books.map(({ img, bookName, author }) => {
  return <h2>{bookName}</h2>
})

const BookList = () => {
  return (
    <div>
      {arrays}
      {newArrays}

      {newBooks}
    </div>
  ) //`can't render '{books}'`
}
ReactDOM.render(<BookList />, document.getElementById('root'))
9*/

/*10.use 6th method '.map()' to render data (vs 7.using directly and repeatedly 'distructure' )`
const onSales = 'On sales! Days left: '
const endDate = 10
const books = [
  { id: 1 },
  {
    id: 2,
    img: 'https://images-eu.ssl-images-amazon.com/images/I/714a8ebZrvL._AC_UL300_SR300,200_.jpg',
    bookName: 'bookName1',
    author: 'author1',
  },
  {
    id: 3,
    img: 'https://images-eu.ssl-images-amazon.com/images/I/81PdkxXJObL._AC_UL300_SR300,200_.jpg',
    bookName: 'bookName2',
    author: 'author2',
  },
]
const BookList = () => {
  return (
    <section>
      <h1>BookList for you</h1>
      <article className='art'>
        {books.map((d) => {
          //const { img, bookName, author } = d `no need for destructuring`
          return <Book key={d.id} {...d} />
          //return <Book a={d}  /> `fix 'props' using '...' destructuring`
          //`add 'key' to do more things
        })}
      </article>
    </section>
  )
} //`use '{.map() return <Books/>}' to short '<Books/><Books/><Books/>'`

const t = () => alert('hi')
const i = (e) => console.log(e)
//const Book = (props) => {
//const { img, bookName, author } = props.a `the value of 'props' changes from 'books' to 'books.map()', can be fixed using '...' in props states`
const Book = ({ img, bookName, author }) => {
  return (
    <div>
      <img
        src={img}
        alt='bookPic'
        onMouseOver={() => console.log({ bookName })}
      />
      <h4>
        {onSales}
        {endDate}
      </h4>
      <p>{bookName}</p>
      <p>{author}</p>
      <button type='button' onClick={() => console.log(bookName)}>
        click me1
      </button>
      <button type='button' onClick={() => i(bookName)}>
        click me2
      </button>
      <button type='button' onClick={i}>
        click me3
      </button>
    </div>
  ) //`inline onClick vs 2 kinds of function onClick`
}
ReactDOM.render(<BookList />, document.getElementById('root'))
10*/

/*11.split up data, component, and root component 
import { books } from './src/books' //`need '{}' to match 'export { books }' || 'export const books=...'`
import B from './src/Book' //`don't need '{}' to match 'export default Book', also can rename the component``

const BookList = () => {
  return (
    <section>
      <h1>BookList for you</h1>
      <article className='art'>
        {books.map((d) => {
          //const { img, bookName, author } = d `no need for destructuring`
          return <B key={d.id} {...d} />
          //return <Book a={d}  /> `fix 'props' using '...' destructuring`
          //`add 'key' to do more things
        })}
      </article>
    </section>
  )
}
ReactDOM.render(<BookList />, document.getElementById('root'))
11*/

//12.initiating
/*vs initiate from 0
ctrl+`, `open terminal in vsCode`,
mkdir folderName,
cd folderName, `can directly drag the folder after 'cd'`,
npm init,
packageName, `eg: app, then find a 'package.json' file was created, with name='app'`,
npm install bootstrap*/

/*initiate with create-react-app
1.npm uninstall -g create-react-app `if previously installed, in order to ensure npx use the latest version`,
2.npx create-react-app appName,
3.npm start `by the way, open chrome besides vsCode`
4.npm install bootstrap `when using, in the same folder, can check in 'package.json' after installation`
5.npm install react-router-dom `when using, in the same folder, can check in 'package.json' after installation`

`if the chrome preview is delayed, you can search 'create react app hot reloading not working'`
https://www.bilibili.com/video/BV1c44y1u7Rc/?p=15&spm_id_from=pageDriver&vd_source=f66e0891a6ac513c7709150a803a70e1
*/

/*extensions
1.Prettier - Code formatter, `search setting 'format' and chose 'Format On Paste'+'Format On Save'`
2.`shift setting to json code, add:
    "emmet.includeLanguages": {
        "javascript": "javascriptreact"
    }
or copy settings in https://github.com/john-smilga/VS-CODE-SETUP/blob/master/settings.json`
3.??ES7+ React/Redux/React-Native snippets, by dsznajder, `read the info and use shortcuts`
*/

/*start 
empty 'src' folder except 'index.js', 
empty the content in 'index.js',
ctrl+b, `open/close sidebar`,
*/

/*build
index.js,
do sth,

1.ctrl+`, ctrl+c, n(for 'Terminate batch job (Y/N)?', https://tech.forums.softwareag.com/t/terminate-batch-job-y-n-means/174765/5 ), 
2.npm run build,
3.cd build, `mistake: didn't 'cd build', can't success 'serve -s build' ('npm\serve.ps1 cannot be loaded because running scripts is disabled on this system'), then can't drag to 'netlify'('Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node')`
4.npm install -g serve, `only do this step for the first time after 'npm run build', or will lead to HTTP failure. solution: restart VS code, then 'npm run build'+'serve -s build'`
5.serve -s build
6.drag 'build' folder into https://app.netlify.com/teams/catcanalsowrite/sites
7.site setting, change site name `then can share the site`https://react-homework-johnsmilga.netlify.app/
8.ctrl+l(clear command line)

update build:
1.npm run build,
2.serve -s build,
3.drag 'build' folder into https://app.netlify.com/sites/react-homework-johnsmilga/deploys?filter
*/

/*test
1.npm i jest,
2."scripts": { "test": "jest" },
3.in 'xx-fileName.js'
```
function sum(a, b) {
  return a + b;
}
module.exports = sum; //`instead of 'export {sum}'`
```
4.in 'xx-fileName.test.js'
```
const sum= require './folder/xx-fileName.js'

test('add 1+2 to equal 3',()=>{
  expect(sum(1, 2)).toBe(3)
})
```
3.npm run test
*/
