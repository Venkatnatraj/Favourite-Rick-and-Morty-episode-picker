import React, { useContext, useEffect } from 'react';
import './App.css';
import { store } from './Store';

function App(): JSX.Element {
  const { state, dispatch } = useContext(store);

  useEffect(()=>{
    state.episodes.length === 0 && fetchData()
  })

  const fetchData = async () => {
    const url = "https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes"
    const data = await fetch(url);
    const jsonData = await data.json();
    return dispatch({
      type: "FETCH_DATA",
      payload: jsonData._embedded.episodes
    })
  }
  return (
    <div>
      {console.log(state)}
      <h1>Rick and Morty</h1>
    </div>
  );
}

export default App;
