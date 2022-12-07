import {useSelector} from 'react-redux'
import List from './List'

function Playlist() {
  const playlists = useSelector(state=> state.playlist)
    return (
    <List data={playlists}/>
  )
}

export default Playlist