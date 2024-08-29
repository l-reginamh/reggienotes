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
        <Link href={slug} className="flex w-full px-5 py-5">{title}</Link>
    );
}