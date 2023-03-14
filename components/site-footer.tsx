import { siteConfig } from "@/config/site"

export function SiteFooter() {
  return (
    <footer className="container">
      <div className="flex flex-col items-center justify-between gap-4 py-2 dark:border-t-slate-700 md:h-14 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-slate-600 dark:text-slate-400 md:text-left">
            Built by{" "}
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              {siteConfig.author}
            </a>
            . Make it better on{" "}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
