import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import axios from 'axios';

export default function CommentCard({info, type, sendID, sendingReplyToParent}) {
  const [replies, setReplies] = useState([]);

  const displayDate = new Date(info.comment_date).toDateString();
  const displayTime = new Date(info.comment_date).toLocaleTimeString();

  useEffect(() => {
    axios.get(`https://react-blog-app-api.herokuapp.com/replies/${info.id}`).then(response => setReplies(response.data));
  }, [info.id]);

  function SendReply(id) {
    sendingReplyToParent(id);
  }

  return (
    <div className='comments-container'>
      <div className={`comment-card ${type}`}>
        <div className='comment-info-container'>
          <div className='comment-author-pic'></div>
          <div className='comment-maker-details'>
            <div className='comment-username'>{info.author}</div>
            <div className='comment-time'>{displayDate} at {displayTime}</div>
          </div>
        </div>
        <p className='comment-body'>{info.body}</p>
        <Link to='comment-reply-form' spy={true} smooth={true}><div className='reply-option' onClick={() => sendID(info.id)}>Reply</div></Link>
      </div>
      {replies.length > 0 && <div className='reply-container'>
        <div className='replies'>
          {replies.map((reply) => {
            return <CommentCard key={reply.id} info={reply} type='reply' sendID={SendReply} />
          })}
        </div>
      </div>}
    </div>
  )
}