import { useSearchDataContext } from '@/context/SearchDataContext'
import { isStringEmpty } from '@/helpers/isEmpty'
import { useRef, useState } from 'react'
import { NowPlaying } from './NowPlaying'
import { useDOMAudioImage } from '@/hooks/useDOMAudioImage'
import { Controls } from './Controls'
import Link from 'next/link'

/**
 * Renders the audio player based on the currently selected song (excluding spotify embeds)
 */
function Player() {
    const { currentSong, error, postData, index } = useSearchDataContext()
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const src = !isStringEmpty(currentSong) ? currentSong : undefined
    const [isPlaying, setIsPlaying] = useState(false)
    useDOMAudioImage(isPlaying, index)

    if (index == null || postData == null || error) {
        return null
    }

    return (
        <footer className='flex-wrap align-center full-width'>
            <NowPlaying isPlayer />
            <audio
                src={src}
                ref={audioRef}
                onPlaying={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />
            {index != null && (
                <>
                    <Controls audioRef={audioRef} isPlaying={isPlaying} />
                    <div className=''>
                        <Link href={postData?.[index]?.post_url ?? ''} target='_blank'>View Post</Link>
                    </div>
                </>
            )}

        </footer>
    )
}

export { Player }