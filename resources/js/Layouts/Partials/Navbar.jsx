import React, { useEffect, useState } from "react";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSun, FaMoon, FaUser } from "react-icons/fa";
import NavButon from "@/Components/NavButon";

export default function Navbar({ auth, hideSidebar }) {
    const [dropDown, setDropDown] = useState(false);
    const [theme, setTheme] = useState();

    useEffect(() => {
        if (
            localStorage.getItem("color-theme") === "dark" ||
            (!("color-theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }, []);

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("color-theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("color-theme", "light");
        }
    }, [theme]);

    const handleThemeSwithc = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };
    return (
        <nav className="flex p-2 px-4 items-center  bg-white dark:bg-gray-800 shadow sticky top-0 w-full z-[100]">
            <h1 className="mr-3 font-semibold text-xl text-black dark:text-white">
                E - Care
            </h1>
            <NavButon onClick={hideSidebar}>
                <GiHamburgerMenu className="block h-5 w-auto fill-current" />
            </NavButon>

            <div className="ml-auto flex gap-2">
                <NavButon onClick={handleThemeSwithc} type="button">
                    {theme === "dark" ? (
                        <FaSun className="block h-5 w-auto fill-current text-amber-500" />
                    ) : (
                        <FaMoon className="block h-5 w-auto fill-current text-brand-500" />
                    )}
                </NavButon>

                <div className="relative">
                    <NavButon
                        type="button"
                        onClick={() => setDropDown(!dropDown)}
                    >
                        <FaUser className="block h-5 w-auto fill-current" />
                    </NavButon>

                    <div
                        className={`${
                            dropDown ? "absolute" : "hidden"
                        } right-0 z-10 w-72 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-800 dark:divide-gray-700`}
                    >
                        <div className="p-4">
                            <div className="font-medium text-base text-gray-800">
                                {auth.user.username}
                            </div>
                            <div className="font-medium text-sm text-gray-500">
                                {auth.user.name}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <ResponsiveNavLink href={route("profile.edit")}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
