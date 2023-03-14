import { FeedData, FeedEntry } from "@extractus/feed-extractor"

export function SideBar({
  items,
  callback,
}: {
  items: FeedEntry[]
  callback: (data: FeedData) => void
}) {
  return (
    <aside className="fixed top-12 z-30 hidden h-[calc(100vh-7.5rem)] w-[300px] shrink-0 overflow-y-auto border-r border-r-slate-100 dark:border-r-slate-700 md:sticky md:block">
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
    </aside>
  )
}
