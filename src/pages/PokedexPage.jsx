import { useSelector } from "react-redux"
import useFetch from "../hooks/useFetch"
import { useEffect, useRef, useState } from "react"
import PokeCard from "../components/PokedexPage/PokeCard"
import SelectType from "../components/PokedexPage/SelectType"
import './styles/PokedexPage.css'

const PokedexPage = () => {

  const [inputValue, setInputValue] = useState('')
  const [typeSelected, setTypeSelected] = useState('allPokemons')


  console.log(typeSelected)

  const trainerName = useSelector(states => states.trainer)

  const url = 'https://pokeapi.co/api/v2/pokemon?limit=500'
  const [pokemons, getPokemons, getTypePokemon] = useFetch(url)

  useEffect(() => {
    if (typeSelected === 'allPokemons') {
      getPokemons()
    } else {
      getTypePokemon(typeSelected)
    }
  }, [typeSelected])

  const inputName = useRef()

  const handleSearch = e => {
    e.preventDefault()
    setInputValue(inputName.current.value.toLowerCase().trim())
  }

  const cbFilter = (pokeInfo) => pokeInfo.name.toLowerCase().includes(inputValue)

  return (
    <div className="pokedex" >
      <header className="pokedex__header">
        <img className="pokedex__image" src="../logo.png" alt="" />
      </header>
      <h2 className="pokedex__welcome">Hi <span>{trainerName}</span>, here you can find your favorite pokemon. Let's go!</h2>
      <form className="pokedex__form" onSubmit={handleSearch}>
        <input className="pokedex__input" ref={inputName} type="text" />
        <button className="pokedex__btn">Search</button>
        <div className="pokedex__types">
          <SelectType setTypeSelected={setTypeSelected} />
        </div>
      </form>
      <div className="pokedex__cards">
      {
        pokemons?.results.filter(cbFilter).map(pokeInfo => (
          <PokeCard
            key={pokeInfo.url}
            url={pokeInfo.url}
          />
        ))
      }
      </div>
    </div>
  )
}

export default PokedexPage