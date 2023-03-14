import { NavItem } from "@/types/nav"

export interface SiteConfig {
  name: string
  description: string
  mainNav: NavItem[]
  author: string
  links: {
    twitter: string
    github: string
    docs: string
  }
  beta: boolean
}

export const siteConfig: SiteConfig = {
  name: `FeedChat`,
  description: `A chat interface blog posts.`,
  author: "Akshay Ram",
  mainNav: [],
  links: {
    twitter: "https://twitter.com/akshay5995",
    github: "https://github.com/akshay5995/feed-chat",
    docs: "https://ui.shadcn.com",
  },
  beta: true,
}
