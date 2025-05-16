'use client'
import { SearchDataProvider } from '@/context/SearchDataContext';
import { Search } from '@/components/Search/Search';
import { Start } from '@/components/Search/Start';

export default function Home() {
  return (
    <>
      <SearchDataProvider>
        <div className='searchbar flex-wrap justify-cetner align-center full-width'>
          <Search />
        </div>
        <header className='heading flex-wrap jusitfy-center align-center full-width'>
            <h1>Make a playlist out of any blog</h1>
            <p>Search for a valid tumblr username to get all of their audio posts.</p>
            <Start />
          </header>
      </SearchDataProvider>
    </>
  )
}
