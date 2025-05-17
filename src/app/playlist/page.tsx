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
    <Suspense>
    <SearchDataProvider>
      <div className='searchbar flex-wrap align-center full-width'>
        <nav className='flex-wrap justify-center align-center'>
          <Link href='/' className='button'>Home</Link>
          <Link href='https://github.com/cornetespoir/audio-playlist?tab=readme-ov-file#maestro' target='_blank'>About</Link>
          <Link href='https://egg.design' target='_blank'>More Projects</Link>
        </nav>
          <Search />
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
    </Suspense>
  )
}
