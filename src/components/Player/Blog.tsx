import { useSearchDataContext } from '@/context/SearchDataContext'
import { isStringEmpty } from '@/helpers/isEmpty'
import { ReactElement } from 'react'

function Blog(): ReactElement {
    const { loading, data, error } = useSearchDataContext()
    const isNotFound = !loading && (!data?.response?.blog || error);

    if (isNotFound) {
        return (
            <div className='blog-card flex-wrap align-center justify-center'>
                <div className='header full-width flex-wrap justify-center' />
                {!loading && (
                    <>
                        <h1>Blog info not found</h1>
                        <p>Try searching for another username</p>
                    </>
                )}
            </div>
        )
    }
    const { name, theme, avatar } = data?.response.blog ?? {}
    const hasImage = !isStringEmpty(avatar?.[0]?.url)
    const hasName = !isStringEmpty(name)
    return (
        <div className='blog-card flex-wrap align-center justify-center'>
            <div className='header full-width flex-wrap justify-center' style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,.6), rgba(0,0,0, 1)), url( ${theme?.header_image})` }}>
                {hasName && (
                    <h1>{name}&apos;s playlist</h1>
                )}
                {hasImage && (
                    <img src={avatar?.[0].url} style={{ height: 64 }} className='rounded' />
                )}
            </div>
        </div>
    )
}

export { Blog }