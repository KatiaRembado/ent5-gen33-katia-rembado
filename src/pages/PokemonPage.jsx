import { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './styles/PokemonPage.css'

const PokemonPage = () => {

  const url = 'https://pokeapi.co/api/v2/pokemon?limit=200'
  const [infoPokemon, setInfoPokemon] = useState(null)
  const [pokemon, getPokemon] = useFetch(url)
  
  const firstType = pokemon?.types[0].type.name
  
  const { id } = useParams()

  const getPercentStat = (statValue) => {
    const maxStatValue = 255
    const percentStat = ((statValue * 100) / maxStatValue).toFixed(1)
    return `${percentStat}%`
  }

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(({ data }) => setInfoPokemon(data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className="pokeinfo">
      <header className="pokeinfo__header">
        <img className="pokeinfo__image" src="../logo.png" alt="" />
      </header>
      <div className="pokeinfo__main">
      <article className="pokeinfo__article">
        <div className="pokeinfo__image-div ">
      <img  src={infoPokemon?.sprites.other['official-artwork'].front_default} alt="" />
        </div>
        <h3>#{infoPokemon?.id}</h3>
      <h2>{infoPokemon?.name}</h2>
      <div>
        <h3>Type</h3>
        <div>
          <h4>
            <span>{`${firstType}`}</span>
          </h4>
        </div>
      </div>
      <div>
        <h3>Abilities</h3>
      </div>
      <h4>{pokemon?.abilities.map((ability) => (
      <ul>{`${firstType}`} key={ability.ability.name}
      <div>
          <h5>{ability.ability.name}</h5>
        </div>
      </ul>
      ))}
      </h4>
      <section className="pokeinfo__section">
        <h3 className="pokeinfo__stats">Stats</h3>
        <ul className="pokeinfo__ul">
          {
            infoPokemon?.stats.map((stat) => 
            <li className="pokeinfo__li"  key={stat.stat.name}>
              <div className="pokeinfo__divstats">
                <h5>{stat.stat.name}</h5>
                <span>{stat.base_stat}/255</span>
              </div>
              <div style={{ width: getPercentStat(stat.base_stat) }} className="pokeinfo__barprogress">
                <div></div>
              </div>
            </li>  )
          }
        </ul>
      </section>
      </article>
      </div>
    </div>
  )
}


export default PokemonPage