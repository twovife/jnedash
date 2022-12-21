import { Link } from "@inertiajs/inertia-react";
import React from "react";
import { AiFillAppstore } from "react-icons/ai";

export default function SidebarButton({
    active = false,
    children,
    icon,
    href,
    title,
}) {
    return (
        <Link
            href={href}
            className={`w-full flex justify-start items-center px-6 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 relative ${
                active &&
                `after:bg-gradient-to-r after:from-brand-500 after:to-brand-500/30 after:h-full after:w-1 after:absolute after:left-0 text-brand-500 font-semibold `
            }`}
        >
            {title ?? children}
            <div className="ml-auto">{icon ? icon : <AiFillAppstore />}</div>
        </Link>
    );
}
