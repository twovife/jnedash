import React from "react";

export default function ContentWrap({ className, children }) {
    return (
        <div
            className={`bg-white dark:bg-gray-800 mx-auto text-gray-600 dark:text-gray-300 shadow-md p-4 rounded ${className}`}
        >
            {children}
        </div>
    );
}
