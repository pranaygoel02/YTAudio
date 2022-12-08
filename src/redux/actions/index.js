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

export const addToPlaylist = (item,playlistid) => {
    console.log(item,playlistid);
    return {
        type: 'ADD_TO_PLAYLIST',
        payload: item,
        id: playlistid
    }
}

export const removeFromPlaylist = (item,playlistid) => {
    return {
        type: 'REMOVE_FROM_PLAYLIST',
        payload: item,
        id: playlistid
    }
}

export const addNewPlaylist = (item) => {
    return {
        type: 'ADD_NEW_PLAYLIST',
        payload: {name:item,songs:[]}
    }
}

export const removePlaylist = (item) => {
    return {
        type: 'REMOVE_PLAYLIST',
        payload: item
    }
}