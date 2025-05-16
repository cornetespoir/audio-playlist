'use client'
import { useFetch } from '@/hooks/useFetch';
import { PostData, PostResults, SearchDataContextType } from '@/types/types';
import { useSearchParams } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react'
const THE_KEY = process.env.TUMBLR_API_KEY

const SearchDataContext = createContext<SearchDataContextType | undefined>(undefined)
export const SearchDataProvider = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const [tag, setTag] = useState(searchParams.get('user') ?? '')
  const [currentPage, setCurrentPage] = useState(1)
  const [offset, setOffset] = useState(0)
  const [albumArt, setAlbumArt] = useState('')
  const [index, setIndex] = useState<number | null>(null)
  const [currentSong, setCurrentSong] = useState('')
  const { data, loading, error } = useFetch<PostResults>(tag ? `https://api.tumblr.com/v2/blog/${tag}.tumblr.com/posts/audio?api_key=${THE_KEY}&offset=${offset}` : '', `${offset}`)
  const postData: PostData[] | null = data?.response.posts ?? null
  const totalPages = data?.response.total_posts ?? 0
  const endOfResults = currentPage * 20 >= totalPages

  useEffect(() => {
    setOffset(0)
    setIndex(null)
    setCurrentPage(1)
  }, [tag])


  return (
    <SearchDataContext.Provider value={{
        data, 
        loading, 
        error, 
        tag, 
        setTag,
        offset,
        setOffset,
        index,
        setIndex,
        postData,
        currentSong,
        setCurrentSong,
        endOfResults,
        albumArt,
        setAlbumArt,
        currentPage,
        setCurrentPage,
        totalPages
    }}>
      {children}
    </SearchDataContext.Provider>
  )
}

export const useSearchDataContext = () => {
  const context = useContext(SearchDataContext)
  if (!context) {
    throw new Error('must be used within the SearchDataProvider')
  }
  return context
}
