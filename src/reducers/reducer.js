const startFetch = "START_FETCH";
const fetchSuccess = "FETCH_SUCCESS";
const errorFetch = "FETCH_ERROR";
const reachedEnd = "REACHED_END";

const idleStatus = "IDLE";
const errorStatus = "ERROR";
const loadingStatus = "LOADING";
const finishedStatus = "FINISHED";

function infiniteScrollReducer(state, action) {
  switch (state.status) {
    case idleStatus:
    case errorStatus:
      return action.type === startFetch
        ? { ...state, status: loadingStatus }
        : state;

    case loadingStatus:
      if (action.type === errorFetch) {
        return { ...state, status: errorStatus };
      }
      if (action.type === reachedEnd) {
        return { ...state, status: finishedStatus };
      }
      if (action.type === fetchSuccess) {
        let endNumber = state.startNumber + 5;
        localStorage.setItem('articlesFetched',  Number(endNumber));
        return {
          ...state,
          articlesIDS: [...state.articlesIDS, ...action.payload.articlesIDS],
          startNumber: endNumber,
          status: idleStatus
        };
      }
      return state;
    case finishedStatus:
      return state;
    default:
      throw new Error("Unknown state");
  }
};


export {infiniteScrollReducer, errorFetch, fetchSuccess,reachedEnd,idleStatus,startFetch,loadingStatus,errorStatus, finishedStatus};
