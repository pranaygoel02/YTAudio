const initialState = {
    open: false,
}

const navReducer = (state = initialState, action) => {
    switch (action.type){
        case 'TOGGLE_NAV': {
            return {
                ...state,
                open: !state.open
            }
        }
        default: return state
    }
}

export default navReducer