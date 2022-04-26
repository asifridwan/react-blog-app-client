import { useState } from 'react';
import ReactPaginate from 'react-paginate';

import BlogDemo from '../components/BlogDemo';

export default function PaginatedView({data}) {
  const [pageNumber, setPageNumber] = useState(0);
  const blogsPerPage = 10;
  const blogsRendered = pageNumber * blogsPerPage;
  const pageCount = Math.ceil(data.length / blogsPerPage);

  const renderBlogs = data
    .slice(blogsRendered, blogsRendered + blogsPerPage)
    .map((item, i) => {
      return <BlogDemo key={i} id={item.id} title={item.title} date={item.post_date} />
    }
  );

  function ChangePage({selected}) {
    setPageNumber(selected);
  }
  
  return (
    <div>
      <div className='paginated-view-container'>{renderBlogs}</div>
      {data.length > 10 &&
        <div className='pagination-container'>
          <ReactPaginate 
            previousLabel='Previous'
            nextLabel='Next'
            pageCount={pageCount}
            onPageChange={ChangePage}
            containerClassName='pagination-buttons'
            activeClassName='paginate-active'
          />
        </div>
      }
    </div>
  )
}