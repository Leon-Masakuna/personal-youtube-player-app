import React from 'react'
import moment from 'moment/moment'
import CommentForm from './CommentForm'

const Comment = ({
   comment,
   replies,
   currentUserId,
   activeComment,
   setActiveComment,
   addComment,
   parentComment = null,
}) => {
   const canReply = Boolean(currentUserId)
   const isReplying =
      activeComment &&
      activeComment.type === 'replying' &&
      activeComment.id == comment._id

   const replyId = parentComment ? parentComment : comment._id
   return (
      <div className="comment-part-2">
         <div className="comment-user">
            <img
               src="https://ca.slack-edge.com/T03BH6JN601-U03FK6874CF-fb4094095857-512"
               alt="Léon Mfeng"
               className="profile-picture"
            />
         </div>
         <div className="user-names">
            <div className="comment-time">
               <p>{'Léon Masakuna'}</p>
               <p>{moment(comment.createdAt).fromNow()}</p>
            </div>
            <div>
               <p>{comment.message}</p>
               <div className="comment-mentions">
                  <div>
                     <i className="fa-solid fa-thumbs-up"></i>
                     <span> 0</span>
                  </div>
                  <div>
                     <i className="fa-solid fa-thumbs-down"></i>
                  </div>
                  <div>
                     {canReply && (
                        <div
                           className="reply-button"
                           onClick={() =>
                              setActiveComment({
                                 id: comment._id,
                                 type: 'replying',
                              })
                           }
                        >
                           Reply
                        </div>
                     )}
                  </div>
               </div>
               <div className="isReplying">
                  {isReplying && (
                     <CommentForm
                        submitLabel="Reply"
                        handleSubmit={(text) => addComment(text, replyId)}
                     />
                  )}
                  {replies.length > 0 && (
                     <div>
                        <div className="comment-replies">
                           <div className="replies">
                              <i className="fa-solid fa-square-caret-up"></i>
                           </div>
                           <div>replies</div>
                        </div>
                        {replies.map((reply) => (
                           <Comment
                              comment={reply}
                              key={reply._id}
                              replies={[]}
                              addComment={addComment}
                              parentComment={comment._id}
                              activeComment={activeComment}
                              setActiveComment={setActiveComment}
                           />
                        ))}
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   )
}

export default Comment
