import React, { createContext, useReducer } from 'react'

interface IState {
    episodes: [],
    favourites: []
};

interface IAction {
    type: string,
    payload: any
}

const initialState: IState = { episodes: [], favourites: [] };

export const store = createContext<IState | any>(initialState);

const reducer = (state: IState, action: IAction): IState => {
    switch (action.type) {
        case "FETCH_DATA":
            return { ...state, episodes: action.payload }

        default:
            return state
    }
}

export const StoreProvider = (props: any): JSX.Element => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <store.Provider value={{ state, dispatch }}>
            {props.children}
        </store.Provider>
    )
}
