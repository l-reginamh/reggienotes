import { posts } from "#site/content";
import { MDXContent } from "@/components/mdxComponents";
import { notFound } from "next/navigation";
import "@/styles/mdx.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Tag } from "@/components/tag";

interface PostPageProps {
    params: {
        slug: string[];
    };
}

async function getPostFromParams(params: PostPageProps["params"]) {
    const slug = params?.slug?.join("/");
    const post = posts.find((post) => post.slugAsParams === slug);

    return post;
}

export async function generateMetadata({params}: PostPageProps) : Promise<Metadata> {
    const post = await getPostFromParams(params);

    if(!post) {
        return {};
    }

    const ogSearchParams = new URLSearchParams();
    ogSearchParams.set("title", post.title);

    return {
        title: post.title,
        description: post.description,
        authors: {name: siteConfig.author},
        openGraph: {
            title: post.title,
            description: post.description,
            type: "article",
            url: post.slug,
            images: [
                {
                    url: `/api/og?${ogSearchParams.toString()}`,
                    width: 1200,
                    height: 630,
                    alt: post.title
                }
            ]
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
            images: [`/api/og?${ogSearchParams.toString()}`]
        }
    };
}

export async function generateStaticParams(): Promise<PostPageProps["params"][]> {
    return posts.map((post) => ({slug: post.slugAsParams.split("/")}));
}

export default async function PostPage({params}: PostPageProps) {
    const post = await getPostFromParams(params);

    if (!post || !post.published) {
        notFound();
    }

    return (
        <article className="container py-6 prose dark:prose-invert max-w-screen-xl">
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                    <h1 className="my-3">{post.title}</h1>
                    {post.description ? (
                            <p className="text-lg mb-3 text-muted-foreground">{post.description}</p>
                        ) : null
                    }
                    <div className="flex gap-2 mb-3">
                        {
                            post.tags?.map((tag) => (
                                <Tag tag={tag} key={tag} />
                            ))
                        } 
                    </div>
                    <hr className="my-8 border border-b border-foreground" />
                    <MDXContent code={post.body} />
                </div>
            </div>
        </article>
    )
}