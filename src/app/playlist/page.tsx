'use client'
import { SearchDataProvider } from '@/context/SearchDataContext';
import { Search } from '@/components/Search/Search';
import { PlaylistWrapper } from '@/components/Search/PlaylistWrapper';
import { NowPlaying } from '@/components/Player/NowPlaying';
import { Player } from '@/components/Player/Player';
import { Blog } from '@/components/Player/Blog';
import Link from 'next/link';
import { Suspense } from 'react'

export default function Home() {
  return (
    <SearchDataProvider>
      <div className='searchbar flex-wrap justify-center align-center full-width'>
        <nav className='flex-wrap justify-center align-center'>
          <Link href='/'>Home</Link>
        </nav>
        <Suspense>
          <Search />
        </Suspense>
      </div>
      <Blog />
      <header className='flex-wrap full-width'>
        <NowPlaying />
      </header>
      <main className='full-width'>
        <PlaylistWrapper />
      </main>
      <Player />
    </SearchDataProvider>
  )
}
