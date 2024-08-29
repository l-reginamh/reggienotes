import { cheatsheets } from "#site/content";
import { SheetItem } from "@/components/cheatsheetItem";
import { sortPosts } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cheatsheets",
    description: "Cheatsheets provided by Regina."
}

export default async function CheatsheetsPage() {
    const sortedSheets = sortPosts(cheatsheets.filter((sheet) => sheet.published))
    const displaySheets = sortedSheets;
    return (
        <div className="container max-w-screen-xl py-6 lg:py-10">
            <div className="flex flex-col items-start gap-4 my-3 md:flex-row md:justify-between">
                <div className="flex-1 space-y-4">
                    <h1 className="inline-block font-black text-4xl lg:text-5xl">Cheatsheets</h1>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-3 mt-8">
                <div className="col-span-12 col-start-1">
                    {displaySheets?.length > 0 ? (
                        <ul className="grid sm:grid-cols-3 gap-4">
                            {displaySheets.map((sheet, index) => {
                                const {slug, date, title, description, tags} = sheet
                                return (
                                    <li key={slug} className={`w-full rounded-md bg-white shadow-md hover:shadow-xl dark:text-background `}>
                                        <SheetItem
                                            slug={slug}
                                            title={title}
                                            description={description}
                                            date={date}
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
                </div>
            </div>
        </div>
    );
}