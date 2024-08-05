import { posts } from "#site/content";
import AdBanner from "@/components/ads/adBanner";
import { PostItem } from "@/components/postItem";
import { QueryPagination } from "@/components/queryPagination";
import { Tag } from "@/components/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllPostTags, sortPosts, sortTagsByCount } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Posts",
    description: "Posts or notes provided by Regina."
}

const POSTS_PER_PAGE = 5;

interface PostPageProps {
    searchParams: {
        page?: string;
    }
}

export default async function PostsPage({ searchParams }: PostPageProps) {
    const currentPage = Number(searchParams?.page) || 1;
    const sortedPosts = sortPosts(posts.filter((post) => post.published));
    const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);

    const displayPosts = sortedPosts.slice(POSTS_PER_PAGE * (currentPage - 1), POSTS_PER_PAGE * currentPage);

    const tags = getAllPostTags(posts);
    const sortedTags = sortTagsByCount(tags);

    const gad = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE as string;
    const aup = process.env.NEXT_PUBLIC_AD_UNIT_POSTS as string;

    return (
        <div className="container max-w-4xl py-6 lg:py-10">
            <div className="flex flex-col items-start gap-4 my-3 md:flex-row md:justify-between">
                <div className="flex-1 space-y-4">
                    <h1 className="inline-block font-black text-4xl lg:text-5xl">Posts</h1>
                    <p className="text-xl text-muted-foreground">
                        Regina&apos;s dummy-dummy notes or posts or thoughts or whatever...
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-3 mt-8">
                <div className="col-span-12 col-start-1 sm:col-span-8">
                    <hr className="mt-8 border-border border-b border-foreground" />
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
                <div className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1">
                    <Card className="">
                        <CardHeader>
                            <CardTitle>Tags</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            {sortedTags?.map((tag) => (<Tag tag={tag} key={tag} count={tags[tag]}></Tag>))}
                        </CardContent>
                    </Card>
                    <div className="bg-black my-5">
                        <AdBanner
                            dataAdFormat="auto"
                            dataFullWidthResponsive={true}
                            dataAdSlot={aup}
                            pId={gad}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}