import { createTool } from '@mastra/core/tools'
import { z } from 'zod'

export const newsTool = createTool({
  id: 'get-news',
  description: '指定されたキーワードのニュース記事を提供します。',
  inputSchema: z.object({
    keyword: z.string().describe('keyword'),
  }),
  execute: async ({ context }) => {
    return await getNews(context.keyword)
  },
})

const getNews = async (keyword: string) => {
  const newsUrl = `https://newsapi.org/v2/everything?q=${keyword}&pageSize=5&page=1&from=2025-03-01&apiKey=${process.env.NEWS_API_KEY}`
  const response = await fetch(newsUrl)
  const data = await response.json()

  return data
}
