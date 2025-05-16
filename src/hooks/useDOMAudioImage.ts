import { useEffect } from 'react'

const useDOMAudioImage = (isPlaying: boolean, index?: number | null) => {
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