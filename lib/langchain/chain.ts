import { ChatVectorDBQAChain } from "langchain/chains"
import { CheerioWebBaseLoader } from "langchain/document_loaders"
import { type VectorStore } from "langchain/vectorstores"

import getModel from "./model"
import { hnswStore, supabaseVectorStore } from "./stores"

const chatChainFromUrl = async (
  url: string,
  chatHistory: string[],
  inMemory: boolean
) => {
  const model = getModel(200)

  const loader = new CheerioWebBaseLoader(url)

  const docs = await loader.load()

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
