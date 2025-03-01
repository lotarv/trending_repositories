import { useState } from 'react'
import './App.css'
import Header from './Header/Header'
import TrendingRepos from './TrendingRepos/TrendingRepos'
import SearchRepo from './SearchRepo/SearchRepo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header></Header>
      <SearchRepo></SearchRepo>
      <TrendingRepos></TrendingRepos>
    </>
  )
}

export default App
