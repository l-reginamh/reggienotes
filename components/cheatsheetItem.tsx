import { formatDate } from "@/lib/utils";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { Tag } from "./tag";

interface SheetItemProps {
    slug: string;
    title: string;
    description?: string;
    date: string;
    tags?: string[];
}

export function SheetItem({slug, title, description, date, tags}: SheetItemProps) {
    return (
        <article className="flex flex-col gap-2 px-3 pt-4 pb-3">
            <div className="text-sm">
                <Link href={slug}>{title}</Link>
            </div>
        </article>
    );
}