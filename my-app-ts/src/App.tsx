import React, { useContext } from 'react';
import './App.css';
import { store } from './Store';

function App(): JSX.Element {
  const data = useContext(store);
  return (
    <div>
      <h1>Rick and Morty</h1>
      {console.log(data.episodes)}
    </div>
  );
}

export default App;
