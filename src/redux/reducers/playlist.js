import produce from 'immer';
const initialState = JSON.parse(localStorage.getItem('Playlist')) === null ? [] : JSON.parse(localStorage.getItem('Playlist'))

const playlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_PLAYLIST': {
            return produce(state, draft => {
                draft[action.id].songs.push(action.payload)
                localStorage.setItem('Playlist', JSON.stringify(draft))
            })
        }
        case 'REMOVE_FROM_PLAYLIST': {
            return produce(state, draft => {
                draft[action.id].songs = draft[action.id].songs.filter(el => el.key !== action.payload.key)
                localStorage.setItem('Playlist', JSON.stringify(draft))
            })
        }
        case 'ADD_NEW_PLAYLIST': {
            localStorage.setItem('Playlist', JSON.stringify([...state, action.payload]))
            return [...state, action.payload]
        }
        case 'REMOVE_PLAYLIST': {
            localStorage.setItem('Playlist', JSON.stringify(state.filter((item) => item.name !== action.payload)))
            return state.filter((item) => item.name !== action.payload)
        }
        default: return state
    }
}

export default playlistReducer