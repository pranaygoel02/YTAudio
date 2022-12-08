const initialState = {
    loading : false,
    data : [],
    error: ''
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SEARCH_REQUEST': {
            return {
                ...state,
                loading: true
            }
        }
        case 'SEARCH_SUCCESS': {
            return {
                loading: false,
                data: action.payload,
                error: ''
            }
        }
        case 'SEARCH_FAILURE': {
            return {
                loading: false,
                data: [],
                error: action.payload
            }
        }
        default: return state
    }
}

export default searchReducer