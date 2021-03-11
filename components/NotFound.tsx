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
        <title> Pokemon nao encontrado | Pokédex </title>
        <meta property="og:title" content={"Pokemon nao encontrado | Pokédex"} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_VERCEL_URL}${router.asPath}`} />
        <meta property="og:description" content={"Pokemon nao encontrado | Pokédex"} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_VERCEL_URL}/pokenotfound.png`} />
        <meta property="og:type" content="game" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:locale:alternate" content="en_US" />
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
