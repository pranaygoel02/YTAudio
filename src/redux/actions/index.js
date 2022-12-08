import axios from 'axios';
  
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

export const searchRequest = () => {
    return {
        type: 'SEARCH_REQUEST',
    }
}

export const searchSuccess = (data) => {
    return {
        type: 'SEARCH_SUCCESS',
        payload: data
    }
}

export const searchFailure = (error) => {
    return {
        type: 'SEARCH_FAILURE',
        payload: error
    }
}

export const search = (query) => {
    
const options = {
    method: 'GET',
    url: 'https://shazam.p.rapidapi.com/auto-complete',
    params: {term: query, locale: 'en-US'},
    headers: {
      'X-RapidAPI-Key': 'eb87d280d8msh1f6138ec6acc772p1ae74ajsn7328652ffde6',
      'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
    }
  };
  
    return (dispatch) => {
        dispatch(searchRequest())
        axios.request(options).then(function (response) {
            console.log(response.data);
            dispatch(searchSuccess(response.data.hints.map(hint=>hint.term)))
        }).catch(function (error) {
            console.error(error);
            dispatch(searchFailure('No results found'))
        });
    }
}


export const searchResultRequest = () => {
    return {
        type: 'SEARCH_RESULT_REQUEST',
    }
}

export const searchResultSuccess = (data) => {
    return {
        type: 'SEARCH_RESULT_SUCCESS',
        payload: data
    }
}

export const searchResultFailure = (error) => {
    return {
        type: 'SEARCH_RESULT_FAILURE',
        payload: error
    }
}

export const searchResult = (query) => {
    
    const options = {
        method: 'GET',
        url: 'https://shazam.p.rapidapi.com/search',
        params: {term: query, locale: 'en-US', offset: '7', limit: '5'},
        headers: {
          'X-RapidAPI-Key': 'eb87d280d8msh1f6138ec6acc772p1ae74ajsn7328652ffde6',
          'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
        }
      };

        return (dispatch) => {
            dispatch(searchResultRequest())
            axios.request(options).then(function (response) {
                console.log(response.data);
                dispatch(searchResultSuccess(response.data.tracks.hits.map(hit=>hit.track)))
            }).catch(function (error) {
                console.error(error);
                dispatch(searchResultFailure('No results found'))
            });
        }
    }
