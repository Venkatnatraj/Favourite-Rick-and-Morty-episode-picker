import React, { useContext, useEffect, lazy, Suspense } from 'react';
import './index.css';
import { store } from './Store';
import { IEpisode } from './interfaces/Interface';

const EpisodeList = lazy<any>(() => import("./EpisodeList"));

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
  };

  const toggleFavAction = (episode: IEpisode) => {
    const episodeInFav = state.favourites.includes(episode);
    let dispatchObj = {
      type: "ADD_FAV",
      payload: episode
    }
    if (episodeInFav) {
      const favWithoutEpisode = state.favourites.filter((fav: IEpisode) => fav.id !== episode.id)
      dispatchObj = {
        type: "REMOVE_FAV",
        payload: favWithoutEpisode
      }
    }
    return dispatch(dispatchObj)
  }

  const props = {
    episodes: state.episodes,
    toggleFavAction,
    favourites: state.favourites
  }

  return (
    <div>
      <header className="header">
        <h1>Rick and Morty</h1>
        <p>Pick your favouite episode!!! {state.favourites.length}</p>
      </header>
      <Suspense fallback={<div>loading...</div>}>
        <section className="episode-layout">
          <EpisodeList  {...props } />
        </section>
      </Suspense>
    </div>
  );
}

export default App;
