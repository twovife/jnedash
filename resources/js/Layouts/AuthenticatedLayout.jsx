import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { VscClose } from "react-icons/vsc";
import { Link } from "@inertiajs/react";
import NavButon from "@/Components/NavButon";
import Sidebar from "./Partials/Sidebar";
import Navbar from "./Partials/Navbar";
import Loading from "@/Components/Loading";

export default function Authenticated({
    auth,
    header,
    flash,
    children,
    loading = false,
    ...props
}) {
    const [hideLgSidebar, setHideLgSidebar] = useState(true);

    return (
        <div className="bg-blue-50 dark:bg-gray-900 relative font-sans">
            <Loading show={loading} />
            <div
                onClick={() => setHideLgSidebar(!hideLgSidebar)}
                className={`absolute top-0 z-50 w-full h-screen duration-300 transition-all ${
                    hideLgSidebar
                        ? `-translate-x-full  bg-white/0`
                        : `translate-x-0 dark:bg-black/20 bg-white/20`
                }`}
            >
                <div
                    className="bg-white h-screen overflow-y-auto dark:bg-gray-800 shadow shadow-gray-400/50 w-60 flex flex-col justify-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Sidebar />
                </div>
            </div>
            <div className={`w-full min-h-screen duration-500 relative`}>
                <Navbar
                    auth={auth}
                    hideSidebar={() => setHideLgSidebar(!hideLgSidebar)}
                />

                {header && (
                    <header className="flex items-center mt-4 px-6">
                        {header}
                    </header>
                )}

                <div className="p-4">{children}</div>
            </div>
        </div>
    );
}
