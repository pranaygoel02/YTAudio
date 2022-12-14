const initialState = {
    lyrics: null,
    loading: false,
    error: ''
}

export const lyricsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LYRICS_REQUEST': {
            return {
                ...state,
                loading: true
            }
        }
        case 'LYRICS_SUCCESS': {
            return {
                ...state,
                loading: false,
                lyrics: action.payload
            }
        }
        case 'LYRICS_FAILURE': {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
        default: return state
    }
}

export default lyricsReducer