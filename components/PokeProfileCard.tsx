import React from 'react'
import classes from '../styles/PokeProfileCard.module.css'
import Image from 'next/image'
import { colours } from '../components/PokeCard'
import hexToRgb from '../helpers/hexToRgb'
import types from '../helpers/type'

export default function PokeProfileCard({ pokemon, species }) {
  return (
    <div className={classes.card} >
      <h1> {pokemon.name} </h1>
      <div className={classes.typecontainer} >
        {
          pokemon.types.map(({ type }) => (
            <div
              className={`${classes.typechip} ${classes[type.name]}`}
              style={{
                color: colours[type.name],
                background: hexToRgb(colours[type.name], 0.3)
              }}
              key={type.name}
            >
              <p> {types[type.name]} </p>
            </div>
          ))
        }
      </div>
      <header>
        <div className={classes.leftcolumn} >
          <div className={classes.profileimg}>
            <Image
              src={pokemon.sprites.other.dream_world.front_default}
              layout="fill"
            />
          </div>
        </div>
        <div className={classes.statssection} >
          <p className={classes.description} >
            {
              String(species.flavor_text_entries[0].flavor_text).normalize()
            }
          </p>
          <div className={classes.skills} >
            <div className={classes.column} >
              <div className={classes.field} >
                <p>Altura</p>
              </div>
              <div className={classes.value} >
                <p> {Number(pokemon.height) / 0.10000} cm </p>
              </div>
            </div>
            <div className={classes.column} >
              <div className={classes.field} >
                <p>Peso</p>
              </div>
              <div className={classes.value} >
                <p> {Number(pokemon.weight) / 10} kg </p>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
