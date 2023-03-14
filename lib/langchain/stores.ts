import { Document } from "langchain/dist/document"
import { OpenAIEmbeddings } from "langchain/embeddings"
import { HNSWLib, SupabaseVectorStore } from "langchain/vectorstores"

import supabaseClient from "@/lib/clients/supabase"

const supabaseVectorStore = async (docs: Document[]) => {
  throw new Error("Not implemented")
  // const vectorStore = await SupabaseVectorStore.fromDocuments(
  //   supabaseClient,
  //   docs,
  //   new OpenAIEmbeddings()
  // )

  // return vectorStore
}

const hnswStore = async (docs: Document[]) => {
  const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings())

  return vectorStore
}

export { supabaseVectorStore, hnswStore }
