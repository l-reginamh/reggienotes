import { siteConfig } from "@/config/site";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Icons } from "./icons";
import { FaLinkedin } from "react-icons/fa6";

export function SiteFooter() {
    return (
        <footer>
            <div className="mb-6 mt-14 flex flex-row items-center justify-center">
                <div className="mb-1 flex space-x-2 text-sm text-muted-foreground pr-3 border-r border-r-muted-foreground">
                    <Link href={siteConfig.links.personalSite} target="_blank" rel="noreferrer" className="hover:text-primary">
                        {siteConfig.author} &copy; 2024
                    </Link>
                </div>
                <div className="mb-1 flex items-center justify-center">
                    <Link href={siteConfig.links.github} target="_blank" rel="noreferrer" className="ml-3 hover:text-secondary">
                            <Icons.github className="h-4 w-4" />
                            <span className="sr-only">Github</span>
                    </Link>
                    <Link href={siteConfig.links.linkedin} target="_blank" rel="noreferrer" className="ml-3 hover:text-secondary">
                            <FaLinkedin className="text-lg" />
                            <span className="sr-only">Twitter</span>
                    </Link>
                </div>
            </div>
        </footer>
    )
}