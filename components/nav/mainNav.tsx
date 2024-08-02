"use client";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MainNav() {
    const pathname = usePathname()
    return (
        <>
            <Link href="/" className="flex items-center">
                <span className="font-bold">{siteConfig.name}</span>
            </Link>
            
            {/* <Link href="/" className="mr-6 flex items-center space-x-2">
                <span className="font-bold">{siteConfig.name}</span>
            </Link>
            <Link href="/posts" className={cn("text-sm font-medium transition-colors hover:text-primary", pathname === "/posts" ? "text-foreground": "text-foreground/60")}>
                <span className="font-bold">/posts</span>
            </Link>
            <Link href="/cheatsheet" className={cn("text-sm font-medium transition-colors hover:text-primary", pathname === "/cheatsheet" ? "text-foreground": "text-foreground/60")}>
                <span className="font-bold">/cheatsheets</span>
            </Link> */}
        </>
    );
}