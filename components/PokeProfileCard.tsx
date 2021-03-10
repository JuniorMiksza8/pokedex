import React, { useEffect, useState } from 'react'
import classes from '../styles/PokeProfileCard.module.css'
import Image from 'next/image'
import { colours } from '../components/PokeCard'
import hexToRgb from '../helpers/hexToRgb'
import types from '../helpers/type'
import StatsChart from './StatsChart'
import Link from 'next/link'
import changeColorLightness from '../helpers/changeColorLightness'
import ReactTooltip from 'react-tooltip'

export default function PokeProfileCard({ pokemon, species, evolutions }) {

  return (
    <div className={classes.card} >
      <h1> {pokemon.name} </h1>
      <div className={classes.typecontainer} >
        {
          pokemon.types.map(({ type }) => (
            <div
              className={`${classes.typechip}`}
              style={{
                color: String(changeColorLightness(colours[type.name], 10)),
                fontWeight: 600,
                background: hexToRgb(colours[type.name], 0.4)
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
            {
              pokemon.sprites.other.dream_world.front_default && (
                <Image
                  src={pokemon.sprites.other.dream_world.front_default}
                  layout="fill"
                />
              )
            }
          </div>
          <StatsChart stats={pokemon.stats} />
        </div>
        <div className={classes.rightcolumn}>
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
          <h1 className={classes.evotxt} >Evoluções</h1>
          <div className={classes.evolutionscontainer} >
            {
              evolutions.map((evolution) => (
                <Link
                  key={evolution.name}
                  href={`/pokemon/${evolution.name}`}
                >
                  <a>
                    <p className={classes.evolutionname} >{evolution.name}</p>
                    <div className={classes.evo} >
                      <div className={classes.evoimg} >
                        {
                          evolution.sprites.other.dream_world.front_default || evolution.sprites.other['official-artwork'].front_default ? (
                            <Image
                              src={evolution.sprites.other.dream_world.front_default || evolution.sprites.other['official-artwork'].front_default}
                              layout="fill"
                            />
                          ) : ''
                        }
                      </div>
                    </div>
                  </a>
                </Link>
              ))
            }
          </div>
          <h1 className={classes.evotxt} >Habilidades</h1>
          <div className={classes.abilities} >
            {
              pokemon.abilities.map(skill => (
                <p key={skill} >{skill.ability.name}</p>
              ))
            }
          </div>
        </div>
      </header>

    </div>
  )
}
