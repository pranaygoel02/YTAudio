export const addFav = (item) => {
    return {
        type: 'ADD_FAV',
        payload: item
    }
}

export const removeFav = (item) => {
    return {
        type: 'REMOVE_FAV',
        payload: item
    }
}

export const addToPlaylist = (item) => {
    return {
        type: 'ADD_TO_PLAYLIST',
        payload: item
    }
}

export const removeFromPlaylist = (item) => {
    return {
        type: 'REMOVE_FROM_PLAYLIST',
        payload: item
    }
}