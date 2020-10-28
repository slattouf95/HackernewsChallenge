import  React, {useEffect, useState} from 'react';
import {ref} from './HackerNewsApi';

const Comment = ({commentID}) => {
  const [author,setAuthor] = useState('');
  const [isDeleted,setIsDeleted] = useState(false);
  const [text,setText] = useState('');
  
  useEffect(() => {
    ref.child(`item/${commentID}`).once("value", function(snapshot) {
      const data = snapshot.val();
      if(data?.deleted === true || data?.dead === true){                                
        setIsDeleted(true);
      }else {
        setAuthor(data.by);
        setText(data.text);
      }
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  },[commentID]);
  return(
    <div>
      {
        !isDeleted &&
        <div>
          <div dangerouslySetInnerHTML={{__html: text}} />
          by {author}
        </div>
      }
    </div>
  )
};

export default Comment;