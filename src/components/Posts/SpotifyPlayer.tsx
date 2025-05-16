import { useSpotifyPlayer } from '@/hooks/useSpotifyPlayer'
import React, { ReactElement, useEffect, useState } from 'react'

interface SpotifyPlayerProps {
  uri: string
}

function SpotifyPlayer ({uri}: SpotifyPlayerProps): ReactElement{
  const [shouldInit, setShouldInit] = useState(false)
  const { isReady: playerReady, play, isScriptReady } = useSpotifyPlayer(
    'spotify-player',
    { uri, autoplay: false },
    shouldInit
  )

  useEffect(() => {
    if (isScriptReady) {
      setShouldInit(true)
    }
  }, [isScriptReady])


  useEffect(() => {
    if (playerReady) {
      play()
    }
  }, [playerReady, play])

  return <div id='spotify-player' />
}

export {SpotifyPlayer}
