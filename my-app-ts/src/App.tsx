import React, { useContext, useEffect } from 'react';
import './index.css';
import { store } from './Store';

interface IEpisode {
  airdate: string,
  airstamp: string,
  airtime: string,
  id: number,
  image: { medium: string, original: string },
  name: string,
  number: number,
  runtime: number,
  season: number,
  summary: string,
  url: string
}

function App(): JSX.Element {
  const { state, dispatch } = useContext(store);

  useEffect(() => {
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
      <header className="header">
        <h1>Rick and Morty</h1>
        <p>Pick your favouite episode!!!</p>
      </header>
      <section className="episode-layout">
        {state.episodes.map((episode: IEpisode) => {
          return (
            <section key={episode.id} className="episode-box">
              <img src={episode.image?.medium} alt={`Rick and Mort ${episode.name}`} />
              <div>{episode.name}</div>
              <section>
                Season: {episode.season} Number: {episode.number}
              </section>
            </section>
          )
        })}
      </section>
    </div>
  );
}

export default App;
