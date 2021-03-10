import React from 'react'
import classes from '../styles/NotFound.module.css'
import Image from 'next/image'
import Head from 'next/head'
import SearchField from './SearchField'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className={classes.container} >
      <Head>
        <title>Pokemon não encontrado</title>
      </Head>
      <h1>Pokemon não encontrado</h1>
      <div className={classes.imagecontainer} >
        <Image
          src="/pokenotfound.png"
          layout="fill"
        />
      </div>
      <div className={classes.btncontainer} >
        <button onClick={() => router.replace('/')} >
          <FontAwesomeIcon icon={faArrowLeft} className={classes.icon} />
          Voltar
        </button>
        <SearchField placeholder="Procurar outro pokemon" />
      </div>
    </div>
  )
}
