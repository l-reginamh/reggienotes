import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CalloutProps {
    children?: ReactNode,
    icon?: string
    type?: "default" | "warning" | "danger";
}

export function Callout({
    children,
    icon,
    type = "default",
    ...props
}: CalloutProps) {
    return (
        <div
            className={cn(
                "my-3 items-start rounded-md border boder-l-4 px-5 py-2 w-full dark:max-w-none flex flex-row",
                {
                "border-red-900 bg-red-50 dark:prose": type === "danger",
                "border-yellow-900 bg-yellow-50 dark:prose": type === "warning",
                }
            )}
            {...props}
        >
            {icon && (<div className="mr-3"><p>{icon}</p></div>)}
            <div>{children}</div>
        </div>
    );
}