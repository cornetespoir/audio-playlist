import { useSearchDataContext } from '@/context/SearchDataContext';
import { PostData } from '@/types/types';
import { useEffect } from 'react';
interface PostProps {
    data: PostData
    isPlaylist: boolean
}
function AudioPost({ data, isPlaylist = true }: PostProps) {
    const { setCurrentSong } = useSearchDataContext()
    useEffect(() => {
        setCurrentSong(data.audio_source_url ?? '')
    }, [])
    if (data == null) {
        return null
    }
    const background = isPlaylist ? '' : `url(${data?.album_art})`
    return (
        <>
            {!isPlaylist ? (
                <div className='audio-player' style={{ background }}>
                    <div className='audio-container'>
                        <figure className='tmblr-full'>
                            <figcaption className='audio-caption flex-wrap align-center'>
                                <div className='audio-details'>
                                    <span className='title'>{data.track_name}</span>
                                    <span className='artist'>{data.artist}</span>
                                </div >
                                <div className='album-art'>
                                    <img src={data.album_art} />
                                </div>
                            </figcaption>
                        </figure>
                    </div>
                </div>
            ) : (
                <figure className='tmblr-full'>
                    <figcaption className='audio-caption flex-wrap align-center'>
                        <div className='audio-details'>
                            <span className='title'>{data.track_name}</span>
                            <span className='artist'>{data.artist}</span>
                        </div >
                        <div className='album-art'>
                            <img src={data.album_art} />
                        </div>
                    </figcaption>
                </figure>
            )}
        </>
    )

}

export { AudioPost }