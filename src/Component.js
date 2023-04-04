import { onSales } from './data'
import { endDate } from './data'

const Book = ({ img, bookName, author }) => {
  const t = () => alert('hi')
  return (
    <div>
      <img src={img} alt='bookPic' />
      <h4>
        {onSales}
        {endDate}
      </h4>
      <p>{bookName}</p>
      <p>{author}</p>
      <button type='button' onClick={t}>
        click me
      </button>
    </div>
  )
}
export default Book
