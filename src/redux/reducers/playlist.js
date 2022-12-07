const initialState = JSON.parse(localStorage.getItem('Playlist')) === null ? [] : JSON.parse(localStorage.getItem('Playlist'))

const playlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_PLAYLIST': {
            localStorage.setItem('Playlist', JSON.stringify([...state, action.payload]))
            return [...state, action.payload]
        }
        case 'REMOVE_FROM_PLAYLIST': {
            localStorage.setItem('Playlist', JSON.stringify(state.filter((item) => item.key !== action.payload.key)))
            return state.filter((item) => item.key !== action.payload.key)
        }
        default: return state
    }
}

export default playlistReducer