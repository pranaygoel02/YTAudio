const initialState = {
    play: false,
    song: null,
    list: [],
    mute: false,
    volume: 100,
    loop: false
};

export const playerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PLAY': {
            return {
                ...state,
                play: true,
                song: action.payload
            }
        }
        case 'PAUSE': {
            return {
                ...state,
                play: false
            }
        }
        case 'RESUME': {
            return {
                ...state,
                play: true
            }
        }
        case 'MUTE': {
            return {
                ...state,
                mute: true,
            }
        }
        case 'UNMUTE': {
            return {
                ...state,
                mute: false
            }
        }
        case 'SET_VOLUME': {
            console.log('vol:',action.payload);
            return {
                ...state,
                volume: action.payload,
                mute : action.payload === 0 ? true : false
            }
        }
        case 'LOOP': {
            return {
                ...state,
                loop: !state.loop
            }
        }
        default: return state
    }
}