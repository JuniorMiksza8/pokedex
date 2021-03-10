import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { getPokemon, getPokemonCharacteristics, getPokemons, getPokemonSpecies } from '../../services/controllers'
import PokeCard from '../../components/PokeCard'
import Head from 'next/head'
import Image from 'next/image'
import classes from '../../styles/PokeProfile.module.css'
import NotFound from '../../components/NotFound'
import PokeProfileCard from '../../components/PokeProfileCard'

export const getStaticProps: GetStaticProps = async (context) => {
  const { name } = context.params

  const pokemon = await getPokemon(name)
  const species = await getPokemonSpecies(name)

  return {
    revalidate: 10,
    props: {
      pokemon,
      species,
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

export default function PokeProfile({ pokemon, species }) {
  const { isFallback } = useRouter()

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
              <link rel="shortcut icon" href={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} type="image/x-icon" />
            </Head>
            <div className={classes.pokecontainer} >
              <PokeProfileCard
                pokemon={pokemon}
                species={species}
              />
            </div>
          </>
        ) : (
            <NotFound />
          )
      }
    </div>
  )
}
