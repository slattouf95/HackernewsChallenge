import {useEffect, useState} from 'react';
import {ref} from './HackerNewsApi';

function useArticle(articleID) {
  const [article, setArticle] = useState({});

  useEffect(() => {
    ref.child(`item/${articleID}`).once("value", function(snapshot) {
      setArticle(snapshot.val());
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  },[articleID]);
  return article;
};

export default useArticle;