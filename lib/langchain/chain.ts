import { ChatVectorDBQAChain } from "langchain/chains"
import { type VectorStore } from "langchain/vectorstores"

import { CustomWebLoader } from "./loader"
import getModel from "./model"
import { hnswStore, supabaseVectorStore } from "./stores"
import { splitDocsIntoChunks } from "./utils"

const maxTokens = Number(process.env.OPENAI_MAX_TOKENS) || 100

const chatChainFromUrl = async (
  url: string,
  chatHistory: string[],
  inMemory: boolean
) => {
  const model = getModel(maxTokens)

  const loader = new CustomWebLoader(url)

  const rawDocs = await loader.load()

  const docs = await splitDocsIntoChunks(rawDocs)

  let vectorStore: VectorStore

  if (inMemory) {
    vectorStore = await hnswStore(docs)
  } else {
    vectorStore = await supabaseVectorStore(docs)
  }

  const chain = ChatVectorDBQAChain.fromLLM(model, vectorStore)

  const res = (question: string) => {
    return chain.call({
      question,
      chat_history: chatHistory,
    })
  }

  return res
}

export { chatChainFromUrl }
