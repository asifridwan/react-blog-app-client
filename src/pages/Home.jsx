import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import PaginatedView from '../containers/PaginatedView';
import AddModal from '../components/AddModal';
import { fetchPosts, selectPosts } from '../store/posts';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [date, setDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal]);

  function ToggleModal() {
    setShowModal(!showModal);
  }

  function CloseModal() {
    setTitle('');
    setBody('');
    setDate('');
    setErrorMessage('');
    ToggleModal();
  }

  function SubmitPost() {
    axios.post('https://react-blog-app-api.herokuapp.com/add/post', {
      title: title,
      body: body,
      post_date: date
    }).then(response => {
      if (response.data === 'Success') {
        CloseModal();
      }
      else {
        setErrorMessage(response.data);
      }
    });
  }

  return (
    <section className='blog-home'>
      <div className='blog-home-wrapper'>
        {showModal && <AddModal 
          clickAction={ToggleModal} 
          errorMessage={errorMessage} 
          title={e => setTitle(e.target.value)} 
          body={e => setBody(e.target.value)} 
          date={e => setDate(e.target.value)} 
          submit={SubmitPost} 
          cancel={CloseModal} 
        />}
        <div>
          <button className='add-button' onClick={ToggleModal}><i className='fa fa-plus-circle'></i> Add New Post</button>
        </div>
        {posts.length > 0 && <PaginatedView data={posts} />}
      </div>
    </section>
  )
}