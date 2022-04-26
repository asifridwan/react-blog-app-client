import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CommentCard from '../components/CommentCard';
import { fetchComments, selectComments, resetComments } from '../store/comments';

export default function CommentsList({postID, sendCommentID, sendReplyID}) {
  const comments = useSelector(selectComments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetComments());
    dispatch(fetchComments(postID));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postID]);

  const rootComments = comments.filter(comment => comment.parent === null);

  const displayComments = rootComments.map((comment) => {
    return <CommentCard key={comment.id} info={comment} sendID={SendID} sendingReplyToParent={SendingReplyToParent} />
  });

  function SendID(id) {
    sendCommentID(id);
  }

  function SendingReplyToParent(id) {
    sendReplyID(id);
  }

  return (
    <div className='comment-section'>
      {comments.length > 0 && displayComments}
    </div>
  )
}