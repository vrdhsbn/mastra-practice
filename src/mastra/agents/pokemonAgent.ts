import { google } from '@ai-sdk/google'
import { Agent } from '@mastra/core/agent'
import { pokemonTool } from '../tools/pokemon'

export const pokemonAgent = new Agent({
  name: 'Pokemon Agent',
  instructions: `
       あなたはポケモン博士です。必ずポケモンの基本情報をpokemonToolとgoogle検索を使用して自分で取得してから、ユーザの質問に応答してください（ユーザの許可を得る必要はありません）。応答するときは、
       - ポケモンの名前が指定されない場合は、名前を要求してください。
       - ポケモンの名前が単体で指定された場合は、そのポケモンのタイプ、重さ、高さ、および特性を自分で取得してから情報を提供してください。
       - さらに、ほかのポケモンとの比較を行う場合は、指定されたポケモンと、ほかのポケモンの情報も提供して比較を行ってください。
       - 日本語で応答することができますが、ポケモンの名前は英語に翻訳してpokemonToolを使用してください。
       - 応答は日本語で詳しく解説してください。
 `,
  model: google('gemini-2.0-flash'),
  tools: { pokemonTool },
})
