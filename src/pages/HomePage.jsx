import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setTrainerG } from '../store/states/trainer.state'
import './styles/HomePage.css'

const HomePage = () => {

  const [messageError, setMesaggeError] = useState('')
  const [error, setError] = useState(false)

  const inputTrainer = useRef()

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    if (inputTrainer.current.value.trim().length < 3) {
      setError(true)
      setMesaggeError('You must provide a trainer name with more than 3 characters')
    } else {
      dispatch(setTrainerG(inputTrainer.current.value.trim()))
      navigate('/pokedex')
    }
  }

  return (
    <main className="home__main">
    <section className="home__section">
    <div className='home__div'>
      <img className="home__image" src="../logo.png" alt="" />
      <h2 className="home__h2">Hi trainer!</h2>
      <p className="home__p">To start, please give me your trainer name</p>
      <form className="home__form"  onSubmit={handleSubmit}>
        {
          error ? (
            <span className='home__error'>{messageError}</span>

          ) :
            (
              ''
            )
        }
        <input className="home__input" ref={inputTrainer} type="text" />
        <button className="home__btn">Catch them all!</button>
      </form>
    </div>
    </section>
      <footer className="home__footer">
      <div className="home__footer-red">
      </div>
      </footer>
    </main>
  )
}

export default HomePage