
import { useEffect, useRef } from 'react'
import useFetch from '../../hooks/useFetch'
import './styles/SelectType.css'

const SelectType = ({ setTypeSelected }) => {

    const url = 'https://pokeapi.co/api/v2/type'

    const [ types, getTypes ] = useFetch(url)

    useEffect(() => {
        getTypes()
    }, [])

    const typeRef = useRef()

    const handleChange = e =>
        setTypeSelected(typeRef.current.value)


  return (
    <div className="filter__type__bar">
    <select defaultValue="allPokemons"className="type__select__bar" ref={typeRef} onChange={handleChange}>
        <option className="type__select__options" value="allPokemons">All Pokemons</option>
        {
            types?.results.map(type => (
                <option className="type__select__options" key={type.url} value={type.url}>{type.name}</option>
            ))
        }
    </select>
    </div>
  )
}

export default SelectType