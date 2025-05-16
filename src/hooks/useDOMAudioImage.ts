import { useEffect } from 'react'

/**
 * Handles grabbing the selector for the album art from th returned post's html
 */
function useDOMAudioImage (isPlaying: boolean, index?: number | null) {
  useEffect(() => {
    if (index == null) return
    const audioImg = document.querySelector('header img')
    if (!audioImg) return

    if (isPlaying) {
      audioImg.classList.add('playing-audio')
      audioImg.classList.remove('remove-rotate')
    } else {
      audioImg.classList.remove('playing-audio')
      audioImg.classList.add('remove-rotate')
    }
  }, [isPlaying, index])
}

export { useDOMAudioImage}