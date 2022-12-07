const initialState = JSON.parse(localStorage.getItem('Fav')) === null ? [] : JSON.parse(localStorage.getItem('Fav'))

const favReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_FAV': {
            localStorage.setItem('Fav', JSON.stringify([...state, action.payload]))
            return [...state, action.payload]
        }
        case 'REMOVE_FAV': {
            localStorage.setItem('Fav', JSON.stringify(state.filter((item) => item.key !== action.payload.key)))
            return state.filter((item) => item.key !== action.payload.key)
        }
        default: return state
    }
}

export default favReducer