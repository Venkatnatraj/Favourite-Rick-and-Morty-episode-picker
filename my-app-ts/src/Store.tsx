import React, { createContext } from 'react'

interface IState {
    episodes: [],
    favourites: []
}

const initialState: IState = {episodes: [], favourites:[]};

export const store = createContext<IState>(initialState);

export const StoreProvider = (props: any)=> {
    return (
        <store.Provider value={initialState}>
            {props.children}
        </store.Provider>
    )
}
