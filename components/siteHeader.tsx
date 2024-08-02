"use client";

import { MainNav } from "./nav/mainNav";
import { SideNav } from "./nav/sideNav";
import { MobileNav } from "./nav/mobileNav";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";

export function SiteHeader() {
    const pathname = usePathname()
    const router = useRouter()

    return (
        <header className="z-10 sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filyer]:bg-background/60">
            <div className="container flex h-14 min-w-full max-w-screen-2xl items-center">
                {pathname !== "/" ? 
                    (<Button onClick={router.back}>Back</Button>)
                    :
                    null
                }
                <nav className="flex flex-1 items-center sm:justify-center space-x-4 lg:space-x-6">
                    <MainNav />
                </nav>
                <nav className="flex items-center justify-end hidden sm:inline-flex">
                    <SideNav />
                </nav>
                <MobileNav />
            </div>
        </header>
    );
}