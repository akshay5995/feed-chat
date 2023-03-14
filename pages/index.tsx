import { useState } from "react"
import { InferGetServerSidePropsType } from "next"
import Head from "next/head"
import logger from "@/logger"
import { FeedEntry, extract } from "@extractus/feed-extractor"

import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"
import { Layout } from "@/components/layout"
import { SideBar } from "@/components/side-bar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export async function getServerSideProps(context) {
  const rssDomain = process.env.RSS_DOMAIN
  const rssPath = process.env.RSS_PATH

  try {
    const result = await extract(`${rssDomain}/${rssPath}`)

    const sortedResultIds = result.entries
      .sort((a, b) => {
        return new Date(b.published).getTime() - new Date(a.published).getTime()
      })
      .map((entry) => entry.id)

    const resultMap = result.entries.reduce((acc, entry) => {
      acc[entry.id] = entry
      return acc
    }, {}) as Record<string, FeedEntry>

    return {
      props: {
        ids: sortedResultIds,
        result: resultMap,
        messages: [
          {
            sender: "bot",
            body: `Hi! You can chat with me regarding "${result.entries[0].title}"`,
          },
        ],
      },
    }
  } catch (error) {
    logger.error(error, "Error extracting feed")
    return {
      props: {
        ids: [],
        result: {},
      },
    }
  }
}

export default function IndexPage({
  ids,
  result,
  messages,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [blogId, setBlog] = useState(ids[0])
  const [message, setMessage] = useState("")
  const [chatMessages, setChatMessages] = useState(messages)
  const [isLoading, setIsLoading] = useState(false)

  const handleBlogChange = (data: FeedEntry) => {
    setBlog(data.id)
    setChatMessages([
      {
        sender: "bot",
        body: `Hi! You can chat with me regarding "${data.title}"`,
      },
    ])
  }

  const handleSendMessage = async () => {
    setIsLoading(true)
    setMessage("")

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: message,
          url: result[blogId].link,
          messages: chatMessages,
        }),
      })

      const res = await response.json()

      const userMessage = {
        sender: "user",
        body: message,
      }

      if (res.success) {
        setChatMessages((prev) => [...prev, userMessage, res.reply])
      } else {
        setChatMessages((prev) => [
          ...prev,
          userMessage,
          {
            sender: "bot",
            body: "Sorry, I didn't understand that. Please try again.",
          },
        ])
      }
    } catch (error) {
      logger.error(error, "Error sending message")
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          body: "Sorry, I didn't understand that. The page might be too long or the content might be too complex.",
        },
      ])
    }
    setIsLoading(false)
  }

  return (
    <Layout>
      <Head>
        <title>{siteConfig.name}</title>
        <meta name="description" content={siteConfig.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-full w-full  flex-1 flex-row">
        <SideBar items={Object.values(result)} callback={handleBlogChange} />
        <div className="flex w-full flex-1 flex-col items-start gap-2 px-2 pt-4">
          <div className="flex w-full flex-col items-start gap-2">
            <div className="flex w-full flex-row border-b px-4 pb-2 text-2xl font-bold">
              <div>
                {result[blogId].title}{" "}
                {result[blogId].description && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Icons.info className="h-4 w-4" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm text-slate-500">
                          {result[blogId].description}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <a
                className="flex flex-1 flex-row justify-end"
                href={result[blogId].link}
                target="_blank"
                rel="noreferrer"
              >
                <Icons.externalLink className="h-5 w-5" />
              </a>
            </div>
            <div className="border-1 flex h-[440px] w-full flex-col items-start gap-2 overflow-y-auto border-slate-700 p-2">
              {chatMessages.map((message, i) => {
                if (message.sender === "bot") {
                  return (
                    <div className="flex w-full flex-row" key={i}>
                      <div className="flex max-w-[40%] flex-col items-start rounded-md border border-slate-300 p-2">
                        <div className="flex flex-row gap-2 font-semibold text-blue-300">
                          Bot
                        </div>
                        <div className="flex flex-row gap-2">
                          {message.body}
                        </div>
                      </div>
                    </div>
                  )
                } else {
                  return (
                    <div className="flex w-full flex-row" key={i}>
                      <div className="flex flex-1" />
                      <div className="flex flex-col rounded-md border border-slate-300 p-2">
                        <div className="flex flex-row gap-2 font-semibold text-green-300">
                          You
                        </div>
                        <div className="flex flex-row gap-2">
                          {message.body}
                        </div>
                      </div>
                    </div>
                  )
                }
              })}
            </div>
            <div className="my-2 h-[10px] animate-pulse text-sm text-slate-500">
              {isLoading && "Bot is typing..."}
            </div>
            <div className="border-3 flex w-full flex-row items-center gap-2 border-slate-200">
              <Textarea
                autoFocus={true}
                className="max-h-[40px] flex-1 resize-none outline-none focus:outline-none"
                placeholder="Type your message here"
                value={message}
                disabled={isLoading}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
              />
              <Button
                className="bg-slate-500 text-white"
                onClick={handleSendMessage}
                disabled={isLoading}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
