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
        <meta property="og:description" content={'Procure e veja detalhes de pokemons | Pokédex'} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_VERCEL_URL}/pokedex.png`} />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
        <meta property="og:type" content="game" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:locale:alternate" content="en_US" />
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <span itemProp="thumbnail" itemScope itemType="http://schema.org/ImageObject">
        <link itemProp="url" href={`${process.env.NEXT_PUBLIC_VERCEL_URL}/pokedex.png`} />
      </span>
      <header>
        <img src={`pokelogo.png`} alt="pokemon logo" />
        <div>
          <h1>Pesquise um pokemon</h1>
          <SearchField />
        </div>
      </header>
      <PokeCarousel pokemons={pokemons} />
    </div>
  )
}
