import axios from 'axios';
import {Config} from '../config';

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

export const removePlaylist = (title,playlistid) => {
    return {
        type: 'REMOVE_PLAYLIST',
        title: title,
        id: playlistid
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
      'X-RapidAPI-Key': Config.shazamKey,
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

export const searchResultSuccess = (tracks,artists) => {
    return {
        type: 'SEARCH_RESULT_SUCCESS',
        tracks: tracks,
        artists: artists
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
        params: {term: query, locale: 'en-US', offset: '0', limit: '5'},
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_SHAZAM_API_KEY,
          'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
        }
      };

        return (dispatch) => {
            dispatch(searchResultRequest())
            axios.request(options).then(function (response) {
                console.log(response.data);
                dispatch(searchResultSuccess(response.data.tracks?.hits.map(hit=>hit.track),response.data.artists?.hits.map(hit=>hit.artist)))
            }).catch(function (error) {
                console.error(error);
                dispatch(searchResultFailure('No results found'))
            });
        }
    }


    export const play = (song) => {
        return {
            type: 'PLAY',
            payload: song,
        }
    }

    export const pause = () => {
        return {
            type: 'PAUSE'
        }
    }

    export const resume = () => {
        return {
            type: 'RESUME'
        }
    }

    export const mute = () => {
        return {
            type: 'MUTE'
        }
    }

    export const unmute = () => {
        return {
            type: 'UNMUTE'
        }
    }
    export const setVolume = (volume) => {
        return {
            type: 'SET_VOLUME',
            payload: volume
        }
    }

    export const loop = () => {
        return {
            type: 'LOOP'
        }
    }

    export const setDuration = (duration) => {
        console.log('Duration: ',duration);
        return {
            type: 'SET_DURATION',
            payload: duration
        }
    }

    export const setProgress = (progress,progressSec) => {
        return {
            type: 'SET_PROGRESS',
            payload: progress,
            seconds: progressSec
        }
    }

    export const searchListRequest = () => {
        return {
            type: 'SEARCH_LIST_REQUEST',
        }
    }

    export const searchListSuccess = (data) => {
        return {
            type: 'SEARCH_LIST_SUCCESS',
            payload: data
        }
    }

    export const searchListFailure = (error) => {
        return {
            type: 'SEARCH_LIST_FAILURE',
            payload: error
        }
    }

    export const searchList = (query) => {
    
        const options = {
            method: 'GET',
            url: 'https://shazam.p.rapidapi.com/charts/track',
            params: {locale: 'en-US', pageSize: '20', startFrom: '0'},
            headers: {
              'X-RapidAPI-Key': process.env.REACT_APP_SHAZAM_API_KEY,
              'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
            }
          };          
    
            return (dispatch) => {
                dispatch(searchListRequest())
                axios.request(options).then(function (response) {
                        console.log(response.data);
                        dispatch(searchListSuccess(response.data.tracks))
                        localStorage.setItem('New List', JSON.stringify(response.data.tracks))
                        localStorage.setItem('Date', new Date())
                    }).catch(function (error) {
                        console.error(error);
                        dispatch(searchListFailure('Oops! Data is currently unavailable. Please try again later'))
                    });
                
            }
        }

        export const searchTrackRequest = () => {
            return {
                type: 'SEARCH_TRACK_REQUEST',
            }
        }

        export const searchTrackSuccess = (data) => {
            return {
                type: 'SEARCH_TRACK_SUCCESS',
                payload: data
            }
        }

        export const searchTrackFailure = (error) => {
            return {
                type: 'SEARCH_TRACK_FAILURE',
                payload: error
            }
        }

        export const searchTrack = (song) => {
            const options = {
                method: 'GET',
                url: 'https://shazam-core.p.rapidapi.com/v1/tracks/youtube-video',
                params: {track_id: song.key, name: song.title},
                headers: {
                  'X-RapidAPI-Key': process.env.REACT_APP_SHAZAM_API_KEY,
                  'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
                }
              };

            return (dispatch) => {
                dispatch(searchTrackRequest())
                axios.request(options).then(function (response) {
                    console.log(response.data);
                    dispatch(searchTrackSuccess(response.data.actions[0].uri))
                    dispatch(play(song))
                    console.log(response.data.actions[0].uri);
                }).catch(function (error) {
                    console.error(error);
                    dispatch(searchTrackFailure('Oops! Data is currently unavailable. Please try again later'))
                });
            }
        }


        export const toggleNav = () => {
            return {
                type: 'TOGGLE_NAV'
            }
        }
