import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Head from 'next/head'
import PokeCarousel from '../components/PokeCarousel'
import SearchField from '../components/SearchField'
import { getPokemons } from '../services/controllers'
import classes from '../styles/Home.module.css'

export async function getStaticProps() {

  const pokemons = await getPokemons()

  return {
    props: {
      pokemons
    }
  }
}

export default function Home({ pokemons }) {

  return (
    <div className={classes.container} >
      <Head>
        <title>Pokedéx</title>
      </Head>
      <header>
        <img src="pokelogo.png" alt="pokemon logo" />
        <div>
          <h1>Pesquise um pokemon</h1>
          <SearchField />
        </div>
      </header>
      <h1>Pokemons em destaque</h1>
      <PokeCarousel pokemons={pokemons} />
    </div>
  )
}
