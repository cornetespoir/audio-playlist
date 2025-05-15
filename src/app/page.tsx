"use client"
import { SearchDataProvider } from "@/context/SearchDataContext";
import { Search } from "@/components/Search/Search";

export default function Home() {
  return (
   <>
    <SearchDataProvider>
      <Search />
    </SearchDataProvider>
    <header className='flex-wrap full-width'>
      <h1>Make a playlist out of any blog</h1>
    </header>
   </>
  )
}
