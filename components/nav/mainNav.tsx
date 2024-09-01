"use client";

import { siteConfig } from "@/config/site";
import Link from "next/link";

export function MainNav() {
    return (
        <>
            <Link href="/" className="flex w-full items-center ml-3 sm:ml-0">
                <span className="font-bold">{siteConfig.name}</span>
            </Link>
        </>
    );
}