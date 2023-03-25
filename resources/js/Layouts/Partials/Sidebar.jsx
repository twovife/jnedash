import SidebarButton from "@/Components/SidebarButton";
import SideBarDropDown from "@/Components/SideBarDropDown";
import React, { useState } from "react";
import { AiFillHome } from "react-icons/ai";

export default function Sidebar() {
    const [colapse, setColapse] = useState();
    const awesome = () => {
        alert("asdasd");
    };
    return (
        <ul className="space-y-2 text-gray-800 dark:text-white w-full">
            <li onClick={() => setColapse(1)}>
                <SidebarButton
                    title={"Dashboard"}
                    href={route("dashboard")}
                    active={route().current("dashboard")}
                    icon={<AiFillHome />}
                />
            </li>
            <li onClick={() => setColapse(2)}>
                <SideBarDropDown
                    title={"Ticketing"}
                    active={route().current("eclaim.*")}
                    colapse={colapse}
                    dropdownId={2}
                    lists={[
                        {
                            id: 1,
                            href: route("ecare.trace.index"),
                            name: "Ticketing CS",
                            active: route().current("ecare.trace.index"),
                        },
                        {
                            id: 2,
                            href: route("ecare.index"),
                            name: "Report Ticketing",
                            active: route().current("ecare.index"),
                        },
                    ]}
                />
            </li>
            <li onClick={() => setColapse(3)}>
                <SideBarDropDown
                    title={"Claim"}
                    active={route().current("eclaim.*")}
                    colapse={colapse}
                    dropdownId={3}
                    lists={[
                        {
                            id: 1,
                            href: route("eclaim.open"),
                            name: "Open Claim",
                            active: route().current("eclaim.open"),
                        },
                        {
                            id: 2,
                            href: route("eclaim.processed"),
                            name: "On Process Claim",
                            active: route().current("eclaim.processed"),
                        },
                        {
                            id: 3,
                            href: route("eclaim.closed"),
                            name: "Closed Claim",
                            active: route().current("eclaim.closed"),
                        },
                        {
                            id: 4,
                            href: route("eclaim.monitoring"),
                            name: "Monitoring Claim",
                            active: route().current("eclaim.monitoring"),
                        },
                    ]}
                />
            </li>
        </ul>
    );
}
