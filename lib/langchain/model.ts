import { OpenAI } from "langchain"

const getModel = (maxTokens: number) =>
  new OpenAI({
    temperature: 0,
    maxTokens,
    topP: 1,
    presencePenalty: 0,
    frequencyPenalty: 0,
    bestOf: 1,
    n: 1,
  })

export default getModel
