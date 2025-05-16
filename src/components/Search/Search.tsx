'use client'
import { FormEvent } from 'react';
import { usePathname, useRouter, useSearchParams, } from 'next/navigation';
import { useSearchDataContext } from '@/context/SearchDataContext';

const Search = () => {
    const searchParams = useSearchParams();
    const { setTag, setOffset } = useSearchDataContext()
    const pathname = usePathname()
    const router = useRouter()

    function onSearch(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault()
        const value = e.currentTarget.tag?.value
        setTag(value)
        const params = new URLSearchParams(searchParams.toString())
        params.set('user', value)
        setOffset(0)
        if (pathname.includes('playlist')) {
            router.push(`${pathname}?${params}`)
        }
        else {
            router.push(`${pathname}playlist?${params}`)
        }
    }

    return (
        <form onSubmit={onSearch}>
            <input
                type='search'
                name='tag'
                placeholder='Enter a tumblr blog'
                defaultValue={searchParams.get('tag')?.toString()} />
        </form>
    )
}

export { Search }