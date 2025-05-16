import { useSearchDataContext } from '@/context/SearchDataContext'
import { ReactElement } from 'react'
import { isArrayEmpty, isStringEmpty } from '@/helpers/isEmpty'
import { PlaylistItem } from './PlaylistItem'

/**
 * Wraps the entire playlist
 */
function PlaylistWrapper(): ReactElement | null {
    const { loading, error, postData, tag, setTag, setOffset, setIndex, endOfResults } = useSearchDataContext()
   
    if (error) {
        return null
    }

    if (!loading && !isStringEmpty(tag) && isArrayEmpty(postData ?? [])) {
        return (
            <div className='not-found flex-wrap align-center justify-center'>No audio posts detected</div>
        )
    }

    function startOver() {
        setIndex(0)
        setTag(tag)
        setOffset(0)
    }

    return (
        <div className='playlist-wrapper'>
            {loading && (
              <div className='full-width flex-wrap justify-center'>
                  <div className='lds-ellipsis'><div></div><div></div><div></div><div></div></div>
             </div>
            )}
            {postData?.map((data, index) => (
                <PlaylistItem key={data.id} data={data} index={index} />
            ))}
            {endOfResults && !error && !loading && (
                <div className='end-of-results flex-wrap justify-center full-width'>
                    <h3>You&apos;ve reached the end of the playlist!</h3>
                    <p>Start over from the beginning?</p>
                    <button onClick={startOver}>Restart playlist</button>
                </div>
            )}
        </div>
    )
}

export {
    PlaylistWrapper
}