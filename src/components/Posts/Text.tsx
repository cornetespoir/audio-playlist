import { ReactElement, useEffect } from 'react'
import { useSearchDataContext } from '@/context/SearchDataContext'
import { parsedHTML } from './parseHTML'

interface TextProps {
    body: string
    isPlaylist?: boolean
}

/**
 * Renders the text inside of a text post
 * @returns converted jsx for the body text and sets the current song source
 */
function Text ({ body, isPlaylist }: TextProps): ReactElement[] | null {
    const {setCurrentSong, setAlbumArt, index} = useSearchDataContext()
    const {jsx, song, albumArt} = parsedHTML(body, isPlaylist ?? false)
    function handleCurrentSong() {
        setCurrentSong(song ?? '')
    }
    useEffect(() => {
       handleCurrentSong()
    }, [song, index])

    useEffect(() => {
        setAlbumArt(albumArt ?? '')
    }, [albumArt, index])
    return jsx
}

export { Text }
