import React from "react";
import SweetAlert from "./SweetAlert";
import { usePage } from "@inertiajs/react";

export default function ContentWrap({ className, children }) {
    const { errors, flash } = usePage().props;

    return (
        <div
            className={`bg-white dark:bg-gray-800 mx-auto text-gray-600 dark:text-gray-300 shadow-md p-4 rounded ${className}`}
        >
            {children}
            {Object.keys(errors).length > 0 && <SweetAlert type="error" />}
            {flash.message && (
                <SweetAlert type="success" message={flash.message} />
            )}
        </div>
    );
}
