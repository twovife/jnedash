import React from "react";

export default function NavButon({ className, children, ...props }) {
    return (
        <button
            {...props}
            className={`p-2 hover:bg-white dark:hover:bg-gray-800 shadow text-gray-600 dark:text-gray-300 rounded-lg ${className}`}
        >
            {children}
        </button>
    );
}
