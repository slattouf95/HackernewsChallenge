import React, {useState,useEffect} from 'react';
import Article from './Article';
import CommentsSection from './CommentsSection';
import { ref } from './HackerNewsApi';
import styled from 'styled-components';
import Modal from 'simple-react-modal'

const Title = styled.h2`
  color: rgba(0,0,0,1);
  font-weight: 300;
  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;

const Date = styled.div`
  color: #999999;
  font-weight: 300;
  margin: 6px 0;
  @media (max-width: 500px) {
    font-size: 0.8rem;
  }
`;

const Action = styled.button`
  padding: 8px 14px;
  background: #FF004F;
  color: #fff;
  cursor: pointer;
  border: 1px solid #fff;
  border-radius: 12px;
  outline: 0;
  font-weight: 300;
  :hover {
    opacity: 0.8;
  }
  :active {
    background: grey;
  }
`;

const Card = ({title,text,date,comments,articleID}) => {
  const [isOpenComments,setIsOpenComments] = useState(false);
  const [isBookmarked,setIsBookmarked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  let isSubscriptionOn = false;

  useEffect(() => {
    const init = ref.child(`item/${articleID}/kids`);
      if(isBookmarked){
        init.on("value", function(snapshot) {
          if(isSubscriptionOn === false){
            isSubscriptionOn = true;
          }else {
            console.log("new comment has been posted");
            setShowModal(true);
          }
        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });
      }
      return () => {
        ref.off("value");
      };
  },[isBookmarked]);

  const handleBookmark = () => {
    if(!isBookmarked){
      isSubscriptionOn = false;
    }
    setIsBookmarked(!isBookmarked);
  };

  const onHandleComments = () => {
    setIsOpenComments(!isOpenComments);
  };

  const onClose = () => {
    setShowModal(false);
  };

  return (
    <div >
      <Title>{title}</Title>
      <Date>{date}</Date>
      <Action onClick={() => onHandleComments(isOpenComments)}>
        { comments?.length || 0} Comments
      </Action>
      {  
        isOpenComments && 
        <CommentsSection comments={comments || []} />
      }
      <div style={{color:"blue"}}>
        <Action onClick={() => handleBookmark()} >
          {isBookmarked? "bookmarked" : "bookmark"}
        </Action>
      </div>
      <Modal 
        show={showModal}
        closeOnOuterClick={true}
        onClose={onClose}
      >
        <Article id={articleID}/>
      </Modal>
    </div>
  );

};
export default Card;