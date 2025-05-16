import { useSearchDataContext } from "@/context/SearchDataContext"

function usePagination() {
   const {postData, index, data, currentPage, setCurrentPage, endOfResults, setIndex, setOffset} = useSearchDataContext()
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
   return {next, previous}
}

export { usePagination }