import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import BlogPost from '../components/BlogPost';
import CommentForm from '../components/CommentForm';
import CommentsList from '../containers/CommentsList';
import { fetchDetails, selectDetails, resetDetails } from '../store/details';

export default function Blog() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [author, setAuthor] = useState('');
  const [commentBody, setCommentBody] = useState('');
  const [replyID, setReplyID] = useState('');
  const [sentCheck, setSentCheck] = useState(false);

  const details = useSelector(selectDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetDetails());
    dispatch(fetchDetails(id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, sentCheck]);

  function BackToHome() {
    navigate('/');
  }

  function SettingReply(id) {
    setReplyID(id);
  }

  function GenerateTimestampWithUTCOffset(date) {
    const tzOffset = -date.getTimezoneOffset();
    const diff = tzOffset >= 0 ? '+' : '-';
    const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
    return date.getFullYear() +
      '-' + pad(date.getMonth() + 1) +
      '-' + pad(date.getDate()) +
      'T' + pad(date.getHours()) +
      ':' + pad(date.getMinutes()) +
      ':' + pad(date.getSeconds()) +
      diff + pad(tzOffset / 60) +
      ':' + pad(tzOffset % 60);
  }

  function ResetComment() {
    setAuthor('');
    setCommentBody('');
  }

  function PostComment() {
    const comment_date = GenerateTimestampWithUTCOffset(new Date());

    if (author && commentBody) {
      axios.post('https://react-blog-app-api.herokuapp.com/add/comment', {
        author: author,
        body: commentBody,
        comment_date: comment_date,
        post_id: id,
        parent: replyID
      }).then(response => {
        if (response.data === 'Success') {
          setSentCheck(!sentCheck);
          ResetComment();
        }
      });
    }
  }

  return (
    <section className='blog-view'>
      {details.length > 0 && <div className='blog-view-wrapper'>
        <div>
          <button className='back-button' onClick={BackToHome}><i className='fa fa-arrow-circle-left'></i> Back To Home</button>
        </div>
        <BlogPost date={details[0].post_date} title={details[0].title} body={details[0].body} />
        <CommentForm author={e => setAuthor(e.target.value)} body={e => setCommentBody(e.target.value)} submitComment={PostComment} />
        <CommentsList postID={id} sendCommentID={SettingReply} sendReplyID={SettingReply} />
      </div>}
      {details === 'Not Found' && navigate('*')}
    </section>
  )
}