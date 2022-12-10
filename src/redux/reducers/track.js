const initialState = {
    loading : false,
    track: '',
    error: ''
}

const trackReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SEARCH_TRACK_REQUEST': {
            return {
                ...state,
                loading: true
            }
        }
        case 'SEARCH_TRACK_SUCCESS': {
            return {
                loading: false,
                track: action.payload,
                error: ''
            }
        }
        case 'SEARCH_TRACK_FAILURE': {
            return {
                loading: false,
                track: '',
                error: action.payload
            }
        }
        default: return state
    }
}

export default trackReducer