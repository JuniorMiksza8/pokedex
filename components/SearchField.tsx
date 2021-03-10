import classes from '../styles/SearchField.module.css'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default function SearchField({ placeholder = 'Nome do pokemon' }) {

  const router = useRouter()
  const [search, setSearch] = useState('')

  return (
    <div className={classes.searchgroup} >
      <input
        type="text"
        placeholder={placeholder}
        id="pokemon-input-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={() => router.push(`/pokemon/${search}`)} >
        <FontAwesomeIcon icon={faSearch} size="lg" />
      </button>
    </div>
  )
}
