import { Document } from "langchain/document"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"

const splitDocsIntoChunks = async (docs: Document[]): Promise<Document[]> => {
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 2000,
    chunkOverlap: 200,
  })

  const splitDocs = await textSplitter.splitDocuments(docs)
  return splitDocs
}

export { splitDocsIntoChunks }
