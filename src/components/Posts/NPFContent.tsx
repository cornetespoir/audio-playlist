import { ReactElement } from 'react'
import { isStringEmpty } from '@/helpers/isEmpty'
import { SpotifyPlayer } from './SpotifyPlayer'

interface NPFData {
    title: string
    album: string
    artist: string
}
interface NPFContentProps {
    isPlaylist: boolean
    npfData: NPFData
    spotifyURI: string
}
function NPFContent({ isPlaylist, npfData, spotifyURI }: NPFContentProps): ReactElement | null {
    if (isStringEmpty(spotifyURI)) return null
    return (
        <div className={isPlaylist ? '' : 'audio-player'}>
            {!isPlaylist && (<SpotifyPlayer uri={spotifyURI} />)}
                <figure className='tmblr-full spotify'>
                    <figcaption className='audio-caption flex-wrap align-center'>
                        <span className='audio-details'>
                            <span className='title'>{npfData?.title}</span>
                            <span className='artist'>{npfData?.artist}</span>
                            <span className='album'>{npfData?.album}</span>
                        </span>
                        <img src='/spotify-logo.png' alt='spotify logo' style={{ padding: '1rem' }} />
                    </figcaption>
                </figure>
        </div>
    )
}

export { NPFContent }