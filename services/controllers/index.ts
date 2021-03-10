import api from "../api"

export async function getPokemons(limit?: number, offset?: number) {
  const { data: { results } } = await api.get(`${process.env.API_URL}/pokemon`, { params: { limit, offset } })

  const pokemons = await Promise.all(results.map(async (pokemon) =>
    api.get(`${process.env.API_URL}/pokemon/${pokemon.name}`).then(res => res.data)
  ))

  return pokemons
}

export async function getPokemon(name: any) {
  try {
    const { data } = await api.get(`${process.env.API_URL}/pokemon/${name}`)

    return data
  } catch (error) {
    return null
  }
}

export async function getPokemonSpecies(name: any) {
  try {
    const { data } = await api.get(`${process.env.API_URL}/pokemon-species/${name}`)

    return data
  } catch (error) {
    return null
  }
}

export async function getPokemonCharacteristics(id: any) {
  try {
    const { data } = await api.get(`${process.env.API_URL}/characteristic/${id}/`)
    return data
  } catch (error) {
    return null
  }
}

export async function getPokemonEvolutions(url) {
  try {
    const { data } = await api.get(url)
    return data
  } catch (error) {
    return null
  }
}
