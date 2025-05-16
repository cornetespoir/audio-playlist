import { useSearchDataContext } from '@/context/SearchDataContext'
import { Post } from '../Posts/Post'
import { ReactElement } from 'react'

interface NowPlayingProps {
    isPlayer?: boolean
}

/**
 * Displays the currently playing track in the header
 */
function NowPlaying({ isPlayer = false }: NowPlayingProps): ReactElement | null {
    const { postData, index, albumArt } = useSearchDataContext()
    if (postData == null || index == null) return null
    const background = postData?.[index]?.album_art ?? albumArt

    return (
        <div className='playing' style={{ background: `url(${background})` }}>
            <div className='audio-backdrop'>
                {!isPlayer && <h2>Now Playing</h2>}
                <Post key={postData?.[index]?.id} data={postData[index]} />
            </div>
        </div>
    )
}

export {
    NowPlaying
}