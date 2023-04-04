import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import defaultImg from './default-image.jpeg'

const url = 'https://course-api.com/react-prop-types-example'

//`just use 'useFetch' component in './6-useFetch'`
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
  }, [url])

  return { loading, state }
}

/*27.error when 'useFetch(url)' information missing  
export const D = () => {
  const { state } = useFetch(url) //`can use only a part of property('{state}') from 'useFetch' component, then also will get only part of data`
  return (
    <>
      {state.map((m) => {
        return <Article key={m.id} {...m} />
      })}
    </>
  ) //`split up the component 'D' with another component 'Article' in 'return'`
}

const Article = ({ name, image, price }) => {
  console.log({ name, image, price }) //{name: 'utopia sofa', image: {…}, price: 39.95} {name: 'entertainment center', image: {…}, price: 29.98} ...
  return (
    <article>
      <img src={image.url} alt='pic' />
      <h4>{name}</h4>
      <p>${price}</p>
    </article>
  ) //`can print value in 'console.log', but can't print in 'return', when facing info missing` 
} //`don't need to use every property as parameter`
27*/

/*28.3 method to add default value when 'useFetch(url)' information missing 28*/
export const D = () => {
  const { state } = useFetch(url)
  return (
    <>
      {state.map((m) => {
        return <Article key={m.id} {...m} />
      })}
    </>
  )
}

const Article = ({ name, image, price }) => {
  const imgUrl = image && image.url //`use both of this condition (means: if image is true, then check image.url) and 'src={imgUrl || defaultImg}' condition (means: if imgUrl is false, then check defaultImg) to deal with img problem`
  return (
    <article>
      <img src={imgUrl || defaultImg} alt={'pic' || 'default pic'} />
      <h4>{name || 'default name'}</h4>
      <p>${price}</p>
    </article>
  ) //`attention with img: if only add a condition in img src value, like 'src={image.url || defaultImg}', this will lead to error warning: 'Cannot read properties of undefined (reading 'url')'`
} //`'alt' can also add a condition to match 'src' condition`

Article.propTypes = {
  image: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
} //`'propTypes' is the property of 'Article' component; 'PropTypes' is a component`
//`if no 'defaultProps' property setted, 'propTypes' property will lead to error warning: 'Failed prop type: The prop `image` is marked as required in `Article`, but its value is `undefined`'...`
//`shortcut: ptor/ptsr/ptnr`
Article.defaultProps = {
  //image: defaultImg `attention with img: if no condition setted in 'Article' component, this variable 'defaultImg' will lead to a broken image, for the img src is an object`
  //name: 'default name' `same result as adding condition '{name || 'default name'}' in 'Article' component`
  price: 9999,
}
