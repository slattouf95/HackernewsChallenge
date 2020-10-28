import React, {useEffect,useContext,useCallback} from 'react';
import Article from './Article.js';
import {errorFetch, fetchSuccess,reachedEnd,loadingStatus,startFetch, errorStatus, finishedStatus} from './reducers/reducer';
import TopRightSvg from './assets/TopRightSvg';
import BottomLeftSvg from './assets/BottomLeftSvg';
import notificationContext from './notificationContext';


const axios = require('axios');

const Container = () => {
  const {state,dispatch} = useContext(notificationContext);

  useEffect(()=>{
    if(state.status === loadingStatus){
      fetchArticles(state,dispatch);
    }
  },[state,dispatch]);

  async function fetchArticles(state, dispatch) {
    try {
      const res = await axios.get(`https://hacker-news.firebaseio.com/v0/topstories.json?&orderBy="$key"&startAt="${state.startNumber}"&endAt="${state.startNumber + 5}"&print=pretty`);

      if (res.status === 200) {
        if (res.data.length === 0) {
          return dispatch({ type: reachedEnd });
        }
        const arts =[];
        Object.keys(res.data).forEach((key) => {
          arts.push(res.data[key]);
        });
        return dispatch({
          type: fetchSuccess,
          payload: { articlesIDS: arts }
        });
      } else {
        dispatch({ type: errorFetch });
      }
    } catch (e) {
      dispatch({ type: errorFetch });
    }
  };

  const observeBorder = useCallback(node => {
    if (node !== null) {
      new IntersectionObserver(
        entries => {
          entries.forEach(en => {
            if (en.intersectionRatio === 1) {
              dispatch({ type: startFetch });
            }
          });
        },
        { threshold: 1 }
      ).observe(node);
    }
  }, [dispatch]);
  
  return(
    <div>
      <TopRightSvg />
      <div style={{border: '1px solid grey', width: '500px',boxShadow: '3px 4px 5px 0px rgba(0, 0, 0, 0.38)', borderRadius: "3px", margin: "auto", backgroundColor: "white"}}>
        { state.articlesIDS &&
          state.articlesIDS.map((article) => <Article key={article} id={article}/>)
        }
        {state.status === errorStatus && renderErrorRetryButton()}
        {state.status === loadingStatus && renderLoadingMessage()}
        {state.status === finishedStatus && renderNoMoreImagesMessage()}
        {renderBottomBorder()}
      </div>
      <BottomLeftSvg />
    </div>
  );


  function renderBottomBorder() {
    return <div ref={observeBorder} />;
  }

  function renderNoMoreImagesMessage() {
    return <p>No More Articles</p>;
  }

  function renderErrorRetryButton() {
    return (
      <button type="button" onClick={() => dispatch({ type: startFetch })}>
        Error! Click to try again
      </button>
    );
  }

  function renderLoadingMessage() {
    return <p>Loading...</p>;
  }
};

export default Container;