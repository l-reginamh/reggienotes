import { cheatsheets } from "#site/content";
import { MDXContent } from "@/components/mdxComponents";
import { notFound } from "next/navigation";
import "@/styles/mdx.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface SheetPageProps {
    params: {
        slug: string[];
    };
}

async function getSheetFromParams(params: SheetPageProps["params"]) {
    const slug = params?.slug?.join("/");
    const sheet = cheatsheets.find((sheet) => sheet.slugAsParams === slug);

    return sheet;
}

export async function generateMetadata({params}: SheetPageProps) : Promise<Metadata> {
    const sheet = await getSheetFromParams(params);

    if(!sheet) {
        return {};
    }

    const ogSearchParams = new URLSearchParams();
    ogSearchParams.set("title", sheet.title);

    return {
        title: sheet.title,
        description: sheet.description,
        authors: {name: siteConfig.author},
        openGraph: {
            title: sheet.title,
            description: sheet.description,
            type: "article",
            url: sheet.slug,
            images: [
                {
                    url: `/api/og?${ogSearchParams.toString()}`,
                    width: 1200,
                    height: 630,
                    alt: sheet.title
                }
            ]
        },
        twitter: {
            card: "summary_large_image",
            title: sheet.title,
            description: sheet.description,
            images: [`/api/og?${ogSearchParams.toString()}`]
        }
    };
}

export async function generateStaticParams(): Promise<SheetPageProps["params"][]> {
    return cheatsheets.map((sheet) => ({slug: sheet.slugAsParams.split("/")}));
}

export default async function SheetPage({params}: SheetPageProps) {
    const sheet = await getSheetFromParams(params);

    if (!sheet || !sheet.published) {
        notFound();
    }

    return (
        <article className="container py-6 prose dark:prose-invert max-w-screen-xl w-screen">
            <h1 className="my-3 text-muted-foreground dark:text-foreground">{sheet.title}</h1>
            <hr className="my-8 border-border border-b border-foreground" />
            <div className="flex flex-col w-full">
                <MDXContent code={sheet.body} />
            </div>
        </article>
    )
}