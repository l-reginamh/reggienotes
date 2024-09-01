import { cheatsheets, posts } from "#site/content";
import { Tag } from "@/components/tag";
import { getAllPostTags, sortTagsByCount } from "@/lib/utils";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Tags",
    description: "Topics for .reggienotes"
}

export default async function TagsPage() {
    const tags = getAllPostTags(posts);
    const sortedTags = sortTagsByCount(tags);
  
    return (
      <div className="container max-w-screen-xl py-6 lg:py-10">
        <div className="flex flex-col items-start gap-4 mt-3 mb-8 md:flex-row md:justify-between md:gap-8">
          <div className="flex-1 space-y-4">
            <h1 className="inline-block font-black text-4xl lg:text-5xl">Tags</h1>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <hr className="mt-8 border-border border-b border-foreground" />
          {sortedTags?.map((tag) => (
            <Tag tag={tag} count={tags[tag]} key={tag} />
          ))}
        </div>
      </div>
    );
  }