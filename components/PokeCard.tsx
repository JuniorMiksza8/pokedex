import classes from '../styles/PokeCard.module.css'
import React from 'react'
import types from '../helpers/type'
import hexToRgb from '../helpers/hexToRgb'
import ReactTooltip from 'react-tooltip'
import Image from 'next/image'

export const colours = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
}

const status = {
  attack: 'attack.png',
  defense: 'defense.png',
  hp: 'hp.png',
  speed: 'speed.png'
}

export default function PokeCard({ pokemon }) {
  return (
    <div className={classes.card} >
      <div className={classes.spritecontainer}>
        <Image
          src={pokemon.sprites.other.dream_world.front_default}
          alt={`${pokemon.name} sprite`}
          layout="fill"
        />
      </div>
      <h3 className={classes.pokename} >{pokemon.name}</h3>
      <div className={classes.typecontainer} >
        {
          pokemon.types.map(({ type }) => (
            <div
              className={`${classes.typechip} ${classes[type.name]}`}
              style={{
                color: colours[type.name],
                background: hexToRgb(colours[type.name], 0.2)
              }}
              key={type.name}
            >
              <p> {types[type.name]} </p>
            </div>
          ))
        }
      </div>
      <div className={classes.statscontainer} >
        {
          pokemon.stats.filter(value => status[value.stat.name]).map((value) => (
            <React.Fragment key={value.stat.name}>
              <ReactTooltip id={value.stat.name} backgroundColor="rgba(0,0,0,0.5)" >
                {value.stat.name}
              </ReactTooltip>
              <div className={classes.statscolumn} data-tip={value.stat.name} data-for={value.stat.name}>
                <Image
                  src={`/icons/${status[value.stat.name]}`}
                  alt={value.stat.name}
                  height="20"
                  width="20"
                />
                <p>{value.base_stat}</p>
              </div>
            </React.Fragment>
          ))
        }
      </div>
    </div>
  )
}
