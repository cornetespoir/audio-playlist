import { useSearchDataContext } from "@/context/SearchDataContext"
import { RefObject, useEffect, useState } from "react"
import { usePagination } from "./usePagination"


/**
 * Handles audio playing of selected/active track
 * @param audioRef audio element
 * @returns duration and current time of audio playing
 */
function useAudioPlayer(audioRef: RefObject<HTMLAudioElement | null>) {
    const { index, currentSong} = useSearchDataContext()
    const [currentTime, setCurrentTime] = useState(0)
    const [audioError, setAudioError] = useState(false)
    const [duration, setDuration] = useState(0)
    const { next } = usePagination()

    const onEnded = () => next()

    useEffect(() => {
        setAudioError(false)
        const audio = audioRef.current
        if (!audio) return
    
        const updateTime = () => setCurrentTime(audio.currentTime)
        const updateDuration = () => setDuration(audio.duration)
        const onError = () => {
            console.warn('Audio playback error.')
            setAudioError(true)
        }
        
        // event listeners for audio states
        audio.addEventListener('timeupdate', updateTime)
        audio.addEventListener('loadedmetadata', updateDuration)
        audio.addEventListener('ended', onEnded)
        audio.addEventListener('error', onError)

        audio.pause()
        audio.load()
        audio.play().catch((err) => {
            console.log('audio error', err)
         })

        return () => {
            audio.removeEventListener('timeupdate', updateTime)
            audio.removeEventListener('loadedmetadata', updateDuration)
            audio.removeEventListener('ended', onEnded)
            audio.removeEventListener('error', onError)
        }
    }, [currentSong, index])

    // handle getting the current time of the audio
    function handleSeeking(newTime: number) {
        const audio = audioRef.current
        if (audio) {
            audio.currentTime = newTime
            setCurrentTime(newTime) 
        }
    }

    return {
        currentTime,
        duration,
        handleSeeking,
        audioError
    }
}

export { useAudioPlayer }