const initialState = {
    loading : false,
    data : [],
    error: ''
}

const resultReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SEARCH_RESULT_REQUEST': {
            return {
                ...state,
                loading: true
            }
        }
        case 'SEARCH_RESULT_SUCCESS': {
            return {
                loading: false,
                data: action.payload,
                error: ''
            }
        }
        case 'SEARCH_RESULT_FAILURE': {
            return {
                loading: false,
                data: [],
                error: action.payload
            }
        }
        default: return state
    }
}

export default resultReducer