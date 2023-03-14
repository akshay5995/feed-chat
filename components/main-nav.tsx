import * as React from "react"
import Link from "next/link"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/styles/style"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Icons.bot className="h-6 w-6" />
        <span className="inline-block font-bold">
          {siteConfig.name}{" "}
          {siteConfig.beta && (
            <span className="text-xs font-normal text-slate-600 dark:text-slate-400">
              BETA
            </span>
          )}
        </span>
      </Link>
    </div>
  )
}
