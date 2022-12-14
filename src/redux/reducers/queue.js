const initialState = {
    loading: false,
    queue: [],
    error: '',
    curr_id: 0,
    loop: false
}

const queueReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_QUEUE': {
            return {
                ...state,
                // curr_id: state.queue.length,
                queue: [...state.queue, action.payload],
            }
        }
        case 'REMOVE_FROM_QUEUE': {
            return {
                ...state,
                queue: state.queue.filter((item) => item.key !== action.payload.key)
            }
        }
        case 'SET_IDX': {
            return {
                ...state,
                curr_id: action.payload
            }
        }
        case 'SET_IDX_END' : {
            return {
                ...state,
                curr_id: state.queue.length - 1,
            }
        }
        case 'SET_QUEUE' : {
            return {
                ...state,
                queue: action.payload,
                curr_id: 0
            }
        }
        case 'CLEAR_QUEUE': {
            return {
                ...state,
                queue: [],
                curr_id: 0
            }
        }
        case 'NEXT_SONG': {
            return {
                ...state,
                curr_id: (state.curr_id + 1) % state.queue.length
            }
        }
        case 'PREV_SONG': {
            return {
                ...state,
                curr_id: state.curr_id - 1 >= 0 ? state.curr_id - 1 : state.curr_id
            }
        }
        case 'LOOP_QUEUE': {
            return {
                ...state,
                loop: !state.loop
            }
        }
        default: return state
    }
}

export default queueReducer