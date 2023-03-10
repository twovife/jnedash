import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { VscClose } from "react-icons/vsc";
import { Link } from "@inertiajs/react";
import NavButon from "@/Components/NavButon";
import Sidebar from "./Partials/Sidebar";
import Navbar from "./Partials/Navbar";

export default function Authenticatexd({
    auth,
    header,
    flash,
    children,
    ...props
}) {
    const [hideLgSidebar, setHideLgSidebar] = useState(true);

    return (
        <div className="min-h-screen bg-blue-50 dark:bg-gray-900 relative font-sans">
            {/* <aside
                onClick={() => setHideLgSidebar(!hideLgSidebar)}
                className={`h-screen w-full lg:w-64 inset-0 z-10 bg-black/10 backdrop-blur-sm transition-all duration-500 fixed ${
                    hideLgSidebar
                        ? `translate-x-0 lg:-translate-x-full ease-out opacity-100 lg:opacity-50`
                        : `-translate-x-full lg:translate-x-0 ease-out opacity-50 lg:opacity-100`
                }`}
            >
                <div
                    className="bg-white h-screen dark:bg-gray-800 shadow w-64"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="overflow-y-auto">
                        <div className="p-4 flex items-center gap-2 justify-start">
                            <Link href="/">
                                <ApplicationLogo className="block h-9 w-auto fill-current text-brand-500" />
                            </Link>
                            <div className="text-2xl font-black text-brand-500">
                                E-Caredash
                            </div>

                            <NavButon
                                className={"ml-auto lg:hidden"}
                                onClick={() => setHideLgSidebar(!hideLgSidebar)}
                            >
                                <VscClose className="block h-5 w-auto fill-current" />
                            </NavButon>
                        </div>
                    </div>
                    <div className="mt-5">
                        <Sidebar />
                    </div>
                </div>
            </aside> */}
            <div
                className={`w-full min-h-screen duration-500 relative ${
                    hideLgSidebar ? `lg:pl-0` : `lg:pl-64`
                }`}
            >
                <Navbar
                    auth={auth}
                    hideSidebar={() => setHideLgSidebar(!hideLgSidebar)}
                />

                {header && (
                    <header className="flex items-center py-4 px-6">
                        {header}
                    </header>
                )}

                <div className="p-4 mt-4">{children}</div>
            </div>
        </div>
    );
}
