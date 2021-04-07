import './App.css';
import Header from './components/ui/Header';
import CharacterGrid from './components/characters/CharacterGrid';
import Search from './components/ui/Search';
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  const [ items, setItems ] = useState([])
  const [ isLoading, setIsLoading ] = useState(true)
  const [ query, setQuery ] = useState('')

  useEffect(() => {
    const fetchItems = async () => {
      const result = await axios(`https://www.breakingbadapi.com/api/characters?name=${query}`) //This endpoint comes from https://breakingbadapi.com/documentation

      setItems(result.data)
      setIsLoading(false)
    }

    fetchItems()
  }, [query]) //If this 'dependency' is empty, useEffect will only fire once at the beginning when the app is loaded the first time
              //With this 'query' dependency, it will fire any time 'query' changes

  return (
    <div className="container">
      <Header/>
      <Search getQuery={(q) => setQuery(q)} />
      <CharacterGrid isLoading={isLoading} items={items}/>
    </div>
  );
}

export default App;
