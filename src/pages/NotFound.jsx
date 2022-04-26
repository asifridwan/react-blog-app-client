export default function NotFound() {
  return (
    <section className='not-found-view'>
      <div className='not-found-thingy'>
        <p className='error-header'>
          <i className='fa fa-warning'></i> 404 Error
        </p>
        <p className='error-body'>The requested object doesn't exist !</p>
      </div>
    </section>
  )
}