import { useSearchDataContext } from "@/context/SearchDataContext"
import { useEffect } from "react"

/**
 * Handles next/previous pagination using the SearchDataContext
 */
function usePagination() {
    const { postData, index, data, currentPage, setCurrentPage, endOfResults, setIndex, setOffset } = useSearchDataContext()
    const next = () => {
        if (postData == null || index == null) return
        const lastIndex = postData.length - 1
        if (index === lastIndex && !endOfResults && postData != null) {
            setIndex(0)
            setOffset(prev => prev + 20)
            setCurrentPage(prev => prev + 1)
        }
        else if (index < lastIndex) {
            setIndex(prev => (prev ?? 0) + 1)
        }
    }

    const previous = () => {
        console.log('prev', index)
        if (postData == null || index == null) return
        if (index === 0 && postData != null && data != null) {
            setIndex(20)
            if (currentPage > 1) {
                setOffset((prev: number) => prev - 20)
                setCurrentPage(prev => prev - 1)
            }
        }
        else if (index > 0) {
            setIndex(prev => (prev ?? 0) - 1)
        }
    }

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            console.log(event.key)
            if (event.key === 'ArrowRight') {
                next()
            }

            if (event.key === 'ArrowLeft') {
                previous()
            }
        }

        window.addEventListener('keydown', onKeyDown);
        return () => {
            window.removeEventListener('keydown', onKeyDown);
        }
    }, [index])
    return { next, previous }
}

export { usePagination }