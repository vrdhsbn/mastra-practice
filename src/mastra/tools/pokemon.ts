import { createTool } from '@mastra/core/tools'
import { z } from 'zod'

interface PokemonResponse {
  name: string
  types: { type: { name: string } }[]
  weight: number
  height: number
  abilities: { ability: { name: string } }[]
}

export const pokemonTool = createTool({
  id: 'get-pokemon',
  description: '指定されたポケモンの名前からポケモンの情報を取得します。',
  inputSchema: z.object({
    name: z.string().describe('Pokemon name'),
  }),
  outputSchema: z.object({
    name: z.string(),
    type: z.string(),
    weight: z.number(),
    height: z.number(),
    abilities: z.string(),
  }),
  execute: async ({ context }) => {
    return await getPokemon(context.name)
  },
})

const getPokemon = async (name: string) => {
  const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${name}`
  const response = await fetch(pokemonUrl)
  const data = (await response.json()) as PokemonResponse
  console.log('pokemon.ts 34', data)

  return {
    name: data.name,
    type: data.types.map(type => type.type.name).join(', '),
    weight: data.weight,
    height: data.height,
    abilities: data.abilities.map(ability => ability.ability.name).join(', '),
  }
}
