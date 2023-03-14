import type { NextApiRequest, NextApiResponse } from "next"

import { chatChainFromUrl } from "@/lib/langchain/chain"

type Data = {
  success: boolean
  reply?: {
    body: string
    sender: string
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { messages, url, question } = req.body
  const history = messages.map((message) => message.text)

  try {
    const execute = await chatChainFromUrl(url, history, true)

    const response = await execute(question)

    const answer = response.text

    const reply = {
      body: answer,
      sender: "bot",
    }

    res.status(200).json({ reply, success: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false })
  }
}
