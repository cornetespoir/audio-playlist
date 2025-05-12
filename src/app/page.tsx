"use client"
import { SearchDataProvider } from "@/context/SearchDataContext";
import { Search } from "@/components/Search/Search";
import { PlaylistWrapper } from "@/components/Search/PlaylistWrapper";
import { NowPlaying } from "@/components/Player/NowPlaying";
import { Player } from "@/components/Player/Player";
import { Blog } from "@/components/Player/Blog";

export default function Home() {
  return (
    <SearchDataProvider>
      <Search />
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
