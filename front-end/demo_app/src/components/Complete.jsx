const Complete = ({ message }) => {
  if (message === null) {
    return null
  }
  
  return (
    <div className='complete'>
      {message}
    </div>
  )
}
export default Complete;