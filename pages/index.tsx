import Head from 'next/head'
import PokeCarousel from '../components/PokeCarousel'
import SearchField from '../components/SearchField'
import { getPokemons } from '../services/controllers'
import classes from '../styles/Home.module.css'

export async function getStaticProps() {

  const pokemons = await getPokemons()
  
  return {
    props: {
      pokemons,
    }
  }
}

export default function Home({ pokemons, url }) {

  return (
    <div className={classes.container} >
      <Head>
        <title>Pokedéx</title>
        <meta property="og:title" content={`Pokédex`} />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_VERCEL_URL} />
        <meta property="og:description" content={'Simples pokedex,procure seus pokemons'} />
        <meta property="og:image" content={'pokelogo.png'} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:locale:alternate" content="en_US" />
        <link rel="shortcut icon" href={`pokelogo.png`} type="image/x-icon" />
      </Head>
      <header>
        <img src="pokelogo.png" alt="pokemon logo" />
        <div>
          <h1>Pesquise um pokemon</h1>
          <SearchField />
        </div>
      </header>
      <PokeCarousel pokemons={pokemons} />
    </div>
  )
}
