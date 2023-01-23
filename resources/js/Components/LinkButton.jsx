import React from "react";
import { Link } from "@inertiajs/react";

export default function LinkButton({
    title,
    href,
    type = "submit",
    className = "",
    processing,
    children,
    disabled,
    icon,
    theme = "primary",
    ...props
}) {
    let themeclass = "";

    if (theme == "primary") {
        themeclass =
            `bg-blue-500 disabled:hover:bg-blue-800 hover:bg-blue-700 focus:bg-blue-600 active:bg-blue-900 focus:ring-blue-500 ` +
            className;
    } else if (theme == "secondary") {
        themeclass =
            `bg-gray-500 disabled:hover:bg-gray-800 hover:bg-gray-700 focus:bg-gray-600 active:bg-gray-900 focus:ring-gray-500 ` +
            className;
    } else if (theme == "success") {
        themeclass =
            `bg-green-500 disabled:hover:bg-green-800 hover:bg-green-700 focus:bg-green-600 active:bg-green-900 focus:ring-green-500 ` +
            className;
    } else if (theme == "danger") {
        themeclass =
            `bg-red-500 disabled:hover:bg-red-800 hover:bg-red-700 focus:bg-red-600 active:bg-red-900 focus:ring-red-500 ` +
            className;
    } else if (theme == "warning") {
        themeclass =
            `bg-yellow-500 disabled:hover:bg-yellow-800 hover:bg-yellow-700 focus:bg-yellow-600 active:bg-yellow-900 focus:ring-yellow-500 ` +
            className;
    } else if (theme == "base") {
        themeclass =
            `bg-brand-500 disabled:hover:bg-brand-500 hover:bg-brand-600 focus:bg-brand-600 active:bg-brand-700 focus:ring-brand-500 ` +
            className;
    } else {
        themeclass =
            `bg-white disabled:hover:bg-white border-gray-500 hover:bg-white focus:bg-white active:bg-white focus:ring-gray-500 ` +
            className;
    }

    return (
        <Link
            href={href}
            as={type}
            {...props}
            className={
                `disabled:cursor-not-allowed flex gap-2 items-center px-4 py-2 border border-transparent rounded-md font-semibold text-xs text-white tracking-widest focus:outline-none focus:ring-2 ${
                    processing && "opacity-25"
                } transition ease-in-out duration-150 ` + themeclass
            }
            disabled={processing || disabled}
        >
            {icon}
            <span>{children || title}</span>
        </Link>
    );
}
