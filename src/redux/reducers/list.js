const initialState = {
    loading : false,
    tracks : [],
    error: ''
}

const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SEARCH_LIST_REQUEST': {
            return {
                ...state,
                loading: true
            }
        }
        case 'SEARCH_LIST_SUCCESS': {
            return {
                loading: false,
                tracks: action.payload,
                error: ''
            }
        }
        case 'SEARCH_LIST_FAILURE': {
            return {
                loading: false,
                tracks: [],
                error: action.payload
            }
        }
        default: return state
    }
}

export default listReducer