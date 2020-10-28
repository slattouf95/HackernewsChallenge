import React,{useReducer} from 'react';
import Container from './Container';
import {idleStatus, infiniteScrollReducer} from './reducers/reducer';
import NavBar from './NavBar';
import notificationContext from './notificationContext';

const initialState = { articlesIDS: [], status: idleStatus, startNumber: 1 };

function App() {
  const [state, dispatch] = useReducer(infiniteScrollReducer, initialState);

  return (
    <notificationContext.Provider value={{state,dispatch}}>
      <div className="App">    
        <NavBar />
        <Container />
      </div>
    </notificationContext.Provider>
  );
}

export default App;