import { Link } from "@inertiajs/inertia-react";
import React, { useState } from "react";
import { BiGridSmall, BiCaretRight } from "react-icons/bi";
import { AiFillAppstore } from "react-icons/ai";

export default function SideBarDropDown({
    title,
    active = false,
    lists,
    icon,
    colapse,
    dropdownId = 0,
    ...props
}) {
    return (
        <div className="relative">
            <div
                className={
                    active
                        ? `after:bg-gradient-to-r after:from-brand-500 after:to-brand-500/30 after:h-full after:w-1 after:absolute after:left-0 after:top-0 text-brand-500 font-semibold`
                        : null
                }
            >
                <button
                    type="button"
                    className={`w-full flex justify-start items-center px-6 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 relative`}
                >
                    <span sidebar-toggle-item="">{title ?? "none"}</span>
                    <div className="ml-auto flex gap-1">
                        <BiCaretRight
                            className={`ml-auto duration-200 ${
                                colapse == dropdownId ? `rotate-90` : ``
                            }`}
                        />
                        {icon ? icon : <AiFillAppstore />}
                    </div>
                </button>

                <ul
                    className={`${
                        colapse == dropdownId ? `block` : `hidden`
                    } space-y-2`}
                >
                    {lists ? (
                        lists.map((list) => {
                            return (
                                <li key={list.id}>
                                    <Link
                                        href={list.href}
                                        className={`first:mt-2 flex items-center w-full py-2 pl-10 ${
                                            list.active
                                                ? `text-brand-600 dark:text-brand-500 font-thin hover:bg-blue-50 hover:text-black dark:hover:bg-gray-700`
                                                : `text-gray-600 dark:text-gray-400 font-thin hover:bg-blue-50 hover:text-black dark:hover:bg-gray-700 dark:hover:text-white`
                                        }`}
                                    >
                                        {list.name}
                                    </Link>
                                </li>
                            );
                        })
                    ) : (
                        <li>none</li>
                    )}
                </ul>
            </div>
        </div>
    );
}
