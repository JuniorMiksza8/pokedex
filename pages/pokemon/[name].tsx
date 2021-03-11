import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { getPokemon, getPokemonEvolutions, getPokemons, getPokemonSpecies } from '../../services/controllers'
import Head from 'next/head'
import Image from 'next/image'
import classes from '../../styles/PokeProfile.module.css'
import NotFound from '../../components/NotFound'
import PokeProfileCard from '../../components/PokeProfileCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function filterEvolution(evolutions) {
  var evoChain = [];
  var evoData = evolutions.chain
  do {
    let numberOfEvolutions = evoData['evolves_to'].length;

    evoChain.push({
      "species_name": evoData.species.name
    });

    if (numberOfEvolutions > 1) {
      for (let i = 1; i < numberOfEvolutions; i++) {
        evoChain.push({
          "species_name": evoData.evolves_to[i].species.name,
        });
      }
    }

    evoData = evoData['evolves_to'][0];

  } while (!!evoData && evoData.hasOwnProperty('evolves_to'));
  return evoChain
}


export default function PokeProfile({ pokemon, species, evolutions }) {
  const router = useRouter()
  const { isFallback } = router

  if (isFallback) {
    return (
      <div className={classes.fallbackcontainer} >
        <h1>Buscando pokemon</h1>
        <Image
          src="/pokeload.gif"
          height="200px"
          width="200px"
        />
      </div>
    )
  }

  return (
    <div>
      {
        pokemon ? (
          <>
            <Head>
              <title>{pokemon.name} | Pokédex </title>
              <meta property="og:title" content={`${pokemon.name} | Pokédex`} />
              <meta property="og:url" content={`${process.env.VERCEL_URL}${router.asPath}`} />
              <meta property="og:description" content={species.flavor_text_entries[0].flavor_text} />
              <meta property="og:image" content={pokemon.sprites.other['official-artwork'].front_default} />
              <meta property="og:image:width" content="475" />
              <meta property="og:image:height" content="475" />
              <meta property="og:type" content="game" />
              <meta property="og:locale" content="pt_BR" />
              <meta property="og:locale:alternate" content="en_US" />
              <link rel="shortcut icon" href={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} type="image/x-icon" />
            </Head>
            <span itemProp="thumbnail" itemScope itemType="http://schema.org/ImageObject">
              <link itemProp="url" href={pokemon.sprites.other['official-artwork'].front_default} />
            </span>
            <div className={classes.pokecontainer} >
              <PokeProfileCard
                pokemon={pokemon}
                species={species}
                evolutions={evolutions}
              />
            </div>
            <button
              className={classes.gobackbtn}
              onClick={() => router.replace('/')}
            >
              <FontAwesomeIcon icon={faArrowLeft} className={classes.icon} />
            </button>
          </>
        ) : (
            <NotFound />
          )
      }
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { name } = context.params

  const pokemon = await getPokemon(name)
  if (!pokemon) {
    return {
      props: {
        pokemon: null
      }
    }
  }
  const species = await getPokemonSpecies(name)
  const evolutionsRaw = await getPokemonEvolutions(species.evolution_chain.url)

  const filteredEvolutions = filterEvolution(evolutionsRaw)

  const evolutions = await Promise.all(filteredEvolutions.map(async (value) => {
    return await getPokemon(value.species_name)
  }))

  return {
    props: {
      pokemon,
      species,
      evolutions,
    },
  }
}



export const getStaticPaths: GetStaticPaths = async (context) => {
  const pokemons = await getPokemons()
  const paths = pokemons.map((pokemon: any) => {
    return {
      params: { name: pokemon.name }
    }
  })
  return {
    paths,
    fallback: true,
  }
}