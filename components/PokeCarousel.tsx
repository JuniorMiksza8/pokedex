import React from 'react'
import styles from '../styles/PokeCarousel.module.css'
import Link from 'next/link'
import PokeCard from './PokeCard'

export default function PokeCarousel({ pokemons }) {
  return (
    <main className={styles.carousel}>
      {
        pokemons.map(pokemon => (
          <Link
            href={`pokemon/${pokemon.name}`}
            key={pokemon.name}
          >
            <a>
              <PokeCard
                pokemon={pokemon}
              />
            </a>
          </Link>
        ))
      }
    </main>
  )
}
