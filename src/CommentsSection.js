import  React from 'react';
import Comment from './Comment';



const CommentsSection = ({comments}) => {
  return(
    <div>
      { 
        comments.map((com) => {
         return (<Comment key={com} commentID = {com}/>)
        })
      }
    </div>
  )
};

export default CommentsSection;
