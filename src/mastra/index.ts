import { createLogger } from '@mastra/core/logger'
import { Mastra } from '@mastra/core/mastra'
import { VercelDeployer } from '@mastra/deployer-vercel'
import { weatherAgent } from './agents'
import { weatherWorkflow } from './workflows'

export const mastra = new Mastra({
  deployer: new VercelDeployer({
    teamSlug: process.env.VERCEL_TEAM as string,
    projectName: process.env.VERCEL_PROJECT as string,
    token: process.env.VERCEL_TOKEN as string,
  }),
  workflows: { weatherWorkflow },
  agents: { weatherAgent },
  logger: createLogger({
    name: 'Mastra',
    level: 'info',
  }),
})
