import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "./site-footer"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="bg-blue flex min-h-screen flex-col">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  )
}
