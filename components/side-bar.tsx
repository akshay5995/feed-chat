import { FeedData, FeedEntry } from "@extractus/feed-extractor"

export function SideBar({
  items,
  callback,
}: {
  items: FeedEntry[]
  callback: (data: FeedData) => void
}) {
  return (
    <div className="flex h-full min-h-[580px] w-full max-w-[300px] flex-col">
      <div className="flex flex-1 flex-col p-4">
        {items.map((id) => (
          <div className="border-slate 100 flex flex-row py-2">
            <h1
              className="text-l cursor-pointer font-bold hover:text-slate-500"
              onClick={() => callback(id)}
            >
              {id.title}
            </h1>
          </div>
        ))}
      </div>
    </div>
  )
}
