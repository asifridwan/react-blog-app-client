export default function BlogPost({date, title, body}) {
  const displayDate = new Date(date).toDateString();

  return (
    <div className='blog-post'>
      <div className='blog-date'>Posted on : {displayDate}</div>
      <div className='blog-title'>{title}</div>
      <p className='blog-content'>{body}</p>
    </div>
  )
}