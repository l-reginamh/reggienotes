import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn, sortPosts } from "@/lib/utils";
import { posts } from "#site/content";
import Link from "next/link";
import { PostItem } from "@/components/postItem";

export default function Home() {
  const latestPosts = sortPosts(posts).slice(0, 5);
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 mx-1 sm:mt-10 md:pb-12 lg:py-32">
        <div className="container flex flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-balance">
            Hihi, I&apos;m Regina
          </h1>
          <p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl text-balance">
            Congratulation!🥳 You have found the hidden space of notes and cheatsheets written by Regina!
          </p>
          <p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl text-balance">
            Let&apos;s get started!🤪
          </p>
          <div className="w-full flex flex-col gap-4 justify-center mt-5 sm:flex-row">
            <Link
              href="/posts"
              className={cn(buttonVariants({ variant: "secondary", size: "xl" }), "w-full sm:w-fit")}
            >
              Checkout Posts!
            </Link>
            <Link
              href="/cheatsheets"
              className={cn(buttonVariants({ variant: "tertiary", size: "xl" }), "w-full sm:w-fit")}
            >
              Looking for Cheatsheets! 😍
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
