import { useSearchDataContext } from '@/context/SearchDataContext'
import { PostData } from '@/types/types'
import clsx from 'clsx'
import { Post } from '../Posts/Post'
import { useRef, MouseEvent, useState } from 'react'

interface PlaylistItemProps {
    data: PostData
    index: number
}

interface Coordinates {
    x: number
    y: number
}

/**
 * The individual playlist items and their post contents
 */
function PlaylistItem({data, index}: PlaylistItemProps) {
    const {setIndex, index: activeIndex} = useSearchDataContext()
    const playlistItemRef = useRef<HTMLDivElement | null>(null)
    const clickRef = useRef<HTMLDivElement | null>(null)

    const [coordinates, setCoordinates] = useState<Coordinates>({x: 0, y: 0})

    const handleSetActive = (e: MouseEvent<HTMLDivElement>) :void => {
        setIndex(index)
        if (playlistItemRef.current != null) {
            clickRef.current?.classList.remove('pulse')
            const x = e.pageX - playlistItemRef.current.offsetLeft
            const y = e.pageY - playlistItemRef.current.offsetTop
            setCoordinates({x, y})
            clickRef.current?.classList.add('pulse')
        }
    }
    const active = activeIndex === index
    const activeClasses = clsx(
        'playlist-item flex-wrap align-center rounded',
        active && 'active'
    )
    return (
        <div
            ref={playlistItemRef}
            onClick={handleSetActive}
            className={activeClasses}
        >
            <div ref={clickRef} className='click' style={{top: coordinates.y, left: coordinates.x}}></div>
            <Post data={data} isPlaylist />
        </div>
    )
}

export {
    PlaylistItem
}