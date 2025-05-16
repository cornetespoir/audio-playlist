import { useSearchDataContext } from '@/context/SearchDataContext';
import { isStringEmpty } from '@/helpers/isEmpty';
import { useAudioPlayer } from '@/hooks/useAudioPlayer'
import { usePagination } from '@/hooks/usePagination';
import { RefObject } from 'react'

interface ControlsProps {
    isPlaying: boolean
    audioRef: RefObject<HTMLAudioElement | null>
}
/**
 * Get formatted time
 */
function getTime(time: number) {
    const minutes: number = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
}

/**
 * Renders the audio controls UI
 */
function Controls({ audioRef, isPlaying = false }: ControlsProps) {
    const { currentSong } = useSearchDataContext()
    const { duration, currentTime, handleSeeking, audioError } = useAudioPlayer(audioRef)
    const { next, previous } = usePagination()

    function togglePlay(): void {
        if (audioRef.current == null) return
        if (isPlaying) {
            audioRef.current?.pause()
        }
        else {
            audioRef.current?.play()
        }
    }

    return (
        <div className='controls flex-wrap align-center'>
            <button onClick={previous}>
                <span className='sr-text'>previous track</span>
                <svg viewBox='0 0 24 24' width='24' height='24' stroke='currentColor'
                    strokeWidth='2' fill='none' strokeLinecap='round' strokeLinejoin='round'
                    className='css-i6dzq1'>
                    <polygon points='19 20 9 12 19 4 19 20'></polygon>
                    <line x1='5' y1='19' x2='5' y2='5'></line>
                </svg>
            </button>
            <button onClick={togglePlay}>
                <span className='sr-text'>{!isPlaying ? 'play' : 'pause'} track</span>
                {!isPlaying
                    ? (
                        <svg xmlns='http://www.w3.org/2000/svg'
                            width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor'
                            strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'
                            className='feather feather-play-circle'>
                            <circle cx='12' cy='12' r='10'></circle>
                            <polygon points='10 8 16 12 10 16 10 8'></polygon>
                        </svg>
                    )
                    : (
                        <svg xmlns='http://www.w3.org/2000/svg'
                            width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor'
                            strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'
                            className='feather feather-pause-circle'>
                            <circle cx='12' cy='12' r='10'></circle>
                            <line x1='10' y1='15' x2='10' y2='9'></line>
                            <line x1='14' y1='15' x2='14' y2='9'></line>
                        </svg>
                    )}
            </button>
            <button onClick={next}>
                <span className='sr-text'>next track</span>
                <svg viewBox='0 0 24 24' width='24' height='24' stroke='currentColor' strokeWidth='2'
                    fill='none' strokeLinecap='round' strokeLinejoin='round'
                    className='css-i6dzq1'>
                    <polygon points='5 4 15 12 5 20 5 4'></polygon>
                    <line x1='19' y1='5' x2='19' y2='19'></line>
                </svg>
            </button>
            {audioError && (
                <p className='flex-wrap align-center error rounded'>
                    <svg viewBox='0 0 24 24' width='24' height='24' stroke='currentColor'
                        strokeWidth='2' fill='none' strokeLinecap='round' strokeLinejoin='round'
                        className='css-i6dzq1'>
                        <path d='M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z'></path>
                        <line x1='12' y1='9' x2='12' y2='13'></line>
                        <line x1='12' y1='17' x2='12.01' y2='17'></line>
                    </svg>
                    There was an error loading this audio. Please skip to another track
                </p>
            )}
            {!isStringEmpty(currentSong) && !audioError && (
                <div className='progress-container flex-wrap align-center'>
                    <span>{getTime(currentTime)}</span>
                    <input
                        type='range'
                        min='0'
                        max={duration}
                        value={currentTime}
                        step='0.01'
                        onChange={(e) => handleSeeking(parseFloat(e.target.value))}
                    />
                    <span>{getTime(duration)}</span>
                </div>
            )}
        </div>
    )
}

export {
    Controls
}