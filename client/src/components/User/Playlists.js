import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from "react-router-dom"
import UserContext from '../../context/UserContext'
import { getItems, putItems } from '../../service/CRUDService'

const Playlists = () => {
    const { id } = useParams()
    const [user, setUser] = useState()

    const { userData } = useContext(UserContext)

    useEffect(() => {
        getItems(`user/${id}`, true)
            .then(res => setUser(res.data))
            .catch(err => alert(`${err.response.status} error occurred`))
    }, [id])

    const removeVideoFromPlaylist = (videoId, title, image) => {
        const conf = window.confirm(`Are you sure you want to delete ${title} from your playlist?`)
        if (conf) {
            putItems(`user/${id}/playlists/video`, { id: userData.user.id, videoId: videoId, title: title, image: image })
                .then(res => setUser(res.data))
                .catch(err => alert(`${err.response.status} error occurred`))
        }
    }

    const removeAudioFromPlaylist = (audioId, song, singer, image) => {
        const conf = window.confirm(`Are you sure you want to delete ${song} from your playlist?`)
        if (conf) {
            putItems(`user/${id}/playlists/audio`, { id: userData.user.id, audioId: audioId, song: song, singer: singer, image: image })
                .then(res => setUser(res.data))
                .catch(err => alert(`${err.response.status} error occurred`))
        }
    }

    return (
        <div className="playlist">
            {user?.videoPlaylist.length === 0 && user?.audioPlaylist.length === 0
            ? <h2>There playlist is empty</h2>
            : (
                <div>
                    <h2>Video</h2>
                    <div className='video-playlist'>
                        {user?.videoPlaylist.map((video, i) => (
                            <div key={i}>
                                <Link to={`/${ video.videoId }`}><img className='img' src={ video.image } alt='video'></img></Link>
                                <h4>{video.title} <i class="fas fa-ban" onClick={() => removeVideoFromPlaylist(video.videoId, video.title, video.image)}></i></h4>
                            </div>
                        ))} 
                    </div>
                    <h2 className='audio-playlist-title'>Audio</h2>
                    <div className='audio-playlist'>
                        {user?.audioPlaylist.map((audio, i) => (
                            <div className='playlist-child' key={i}>
                                <Link to={`/audio/${ audio.audioId }`}><img className='audio-img' src={ audio.image } alt='audio'></img></Link>
                                <h3>{ audio.song } <i class="fas fa-ban" onClick={() => removeAudioFromPlaylist(audio.audioId, audio.song, audio.singer, audio.image)}></i></h3>
                                <h5>{ audio.singer }</h5>
                            </div>
                        ))} 
                    </div>
                </div>
            )}
        </div>      
    )
}

export default Playlists