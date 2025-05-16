import { Dispatch, SetStateAction } from "react"

export type PostResults = {
    [x: string]: any
    response: {
        posts: PostData[]
        blog: UserData
        total_posts?: number
    }
}

export interface UserData {
    name?: string
    url?: string
    title?: string
    theme?: Theme
    description?: string
    avatar?: Avatar[]
}

interface Theme {
    header_image: string
}

interface Avatar {
    width: number
    height: number
    url: string
}

export interface PostData {
    blog: object
    track_name?: string
    blog_name?: string
    body?: string
    date?: string
    id: number
    note_count: number
    post_url: string
    reblog_key: string
    tags?: []
    title?: string
    type: string
    photos?: []
    answer?: string
    asking_name?: string
    asking_url?: string
    question?: string
    timestamp: number
    interactability_reblog?: string
    source_url?: string
    summary?: string
    source_title?: string,
    description?: string
    audio_source_url?: string
    album_art?: string
    artist?: string
}

export interface Offset {
    prefix: 'after' | 'before' | ''
    timestamp: string
}


export interface SearchDataContextType {
    data: PostResults | null
    loading: boolean
    error: Error | null
    setTag: (tag: string) => void
    tag: string
    setAlbumArt: (albumArt: string) => void
    albumArt: string
    postData?: PostData[] | null
    index: number | null
    setIndex: Dispatch<SetStateAction<number | null>>
    offset?: number
    setOffset: Dispatch<SetStateAction<number>>
    currentSong: string
    setCurrentSong: (currentSong: string) => void
    currentPage: number
    setCurrentPage: Dispatch<SetStateAction<number>>
    endOfResults: boolean
    totalPosts: number
  }