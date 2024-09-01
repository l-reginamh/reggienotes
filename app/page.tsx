import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn, getAllPostTags, sortPosts, sortTagsByCount } from "@/lib/utils";
import { posts } from "#site/content";
import Link from "next/link";
import { PostItem } from "@/components/postItem";
import { QueryPagination } from "@/components/queryPagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag } from "@/components/tag";

const POSTS_PER_PAGE = 10;

interface PostPageProps {
    searchParams: {
        page?: string;
    }
}

export default function Home({ searchParams }: PostPageProps) {
  const latestPosts = sortPosts(posts).slice(0, 5);
  
  const currentPage = Number(searchParams?.page) || 1;
  const sortedPosts = sortPosts(posts.filter((post) => post.published));
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);

  const displayPosts = sortedPosts.slice(POSTS_PER_PAGE * (currentPage - 1), POSTS_PER_PAGE * currentPage);

  const tags = getAllPostTags(posts);
  const sortedTags = sortTagsByCount(tags);
  return (
    <>
      <section className="max-w-screen-xl space-y-6 pb-8 pt-6 mx-auto sm:mt-10 md:pb-12 lg:py-32">
        <div className="container flex flex-col justify-center gap-4">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-balance">
            Hihi, I&apos;m Regina
          </h1>
          <p className="max-w-[42rem] text-muted-foreground sm:text-xl text-balance">
            Congratulation!🥳 You have found the hidden space of notes and cheatsheets!
          </p>
          <p className="max-w-[42rem] text-muted-foreground sm:text-xl text-balance">
            Let&apos;s get started!🤪
          </p>
          <div className="w-full flex flex-col gap-4 justify-start my-5 sm:flex-row">
            <Link
              href="/cheatsheets"
              className={cn(buttonVariants({ variant: "tertiary", size: "xl" }), "w-full sm:w-fit")}
            >
              Checkout Cheatsheets! 😍
            </Link>
          </div>
          <div>

          </div>
          <div className="grid grid-cols-12 gap-3 mt-8">
                <div className="col-span-12 col-start-1 sm:col-span-8">
                    {/* <hr className="mt-8 border-border border-b border-foreground" /> */}
                    {displayPosts?.length > 0 ? (
                        <ul className="flex flex-col">
                            {displayPosts.map(post => {
                                const {slug, date, title, description, tags} = post
                                return (
                                    <li key={slug}>
                                        <PostItem 
                                            slug={slug}
                                            date={date}
                                            title={title}
                                            description={description}
                                            tags={tags}
                                        />
                                    </li>
                                )
                            })}
                        </ul>
                        )
                        :
                        (
                        <p>Regina has nothing to show here yet.</p>
                    )}
                    <QueryPagination totalPages={totalPages} className="justify-end mt-4"></QueryPagination>
                </div>
                <Card className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1 mt-3">
                    <CardHeader>
                        <CardTitle>Tags</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                        {sortedTags?.map((tag) => (<Tag tag={tag} key={tag} count={tags[tag]}></Tag>))}
                    </CardContent>
                </Card>
            </div>
        </div>
      </section>
    </>
  );
}
