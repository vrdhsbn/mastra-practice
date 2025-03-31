import { createLogger } from '@mastra/core/logger'
import { Mastra } from '@mastra/core/mastra'
import { VercelDeployer } from '@mastra/deployer-vercel'
import { newsAgent } from './agents/newsAgent'
import { pokemonAgent } from './agents/pokemonAgent'
import { weatherAgent } from './agents/weatherAgent'
import { weatherWorkflow } from './workflows/travelPlanning'

export const mastra = new Mastra({
  // Vercelへのデプロイ設定
  deployer: new VercelDeployer({
    teamSlug: process.env.VERCEL_TEAM as string,
    projectName: process.env.VERCEL_PROJECT as string,
    token: process.env.VERCEL_TOKEN as string,
  }),
  // ワークフローとエージェントの定義
  workflows: { weatherWorkflow },
  agents: { newsAgent, weatherAgent, pokemonAgent },
  // ログ取得の設定
  logger: createLogger({
    name: 'Mastra',
    level: 'info',
  }),
})
