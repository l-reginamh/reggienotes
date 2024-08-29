import { cn, formatDate } from "@/lib/utils";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Tag } from "./tag";

interface PostItemProps {
    slug: string;
    title: string;
    description?: string;
    date: string;
    tags?: string[];
}

export function PostItem({slug, title, description, date, tags}: PostItemProps) {
    return (
        <article className="flex flex-col gap-2 border-border  bg-white rounded-md p-4 my-3 shadow-md hover:shadow-xl cursor-pointer">
            <div>
                <h2 className="text-3xl font-bold pb-1">
                    <Link href={"/" + slug}>{title}</Link>
                </h2>
                <div className="flex gap-2 pb-2">
                    {tags?.map(tag => (<Tag tag={tag} key={tag}></Tag>))}
                </div>
                <div className="max-w-none text-muted-foreground text-sm">{description}</div>
                <div className="flex justify-between items-center">
                    <dl>
                        <dt className="sr-only">Published On</dt>
                        <dd className="text-sm font-medium flex items-center gap-1 text-tertiary">
                            <Calendar className="h-4 w-4" />
                            <time dateTime={date}>{formatDate(date)}</time>
                        </dd>
                    </dl>
                    <Link href={slug} className={cn(buttonVariants({variant: "link"}), "py-0")}>Read more...</Link>
                </div>
            </div>
        </article>
    );
}