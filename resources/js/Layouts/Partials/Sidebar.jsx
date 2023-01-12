import SidebarButton from "@/Components/SidebarButton";
import SideBarDropDown from "@/Components/SideBarDropDown";
import React from "react";
import { AiFillHome } from "react-icons/ai";

export default function Sidebar() {
    return (
        <ul className="space-y-2 text-gray-800 dark:text-white">
            <li>
                <SidebarButton
                    title={"Dashboard"}
                    href={route("dashboard")}
                    active={route().current("dashboard")}
                    icon={<AiFillHome />}
                />
            </li>
            <li>
                <SideBarDropDown
                    title={"Ticketing"}
                    active={route().current("eclaim.*")}
                    lists={[
                        {
                            id: 1,
                            href: route("ecare.create"),
                            name: "Create Ticket",
                            active: route().current("eclaim.open"),
                        },
                        {
                            id: 2,
                            href: route("eclaim.processed"),
                            name: "Processed Ticket",
                            active: route().current("eclaim.processed"),
                        },
                        {
                            id: 3,
                            href: route("eclaim.closed"),
                            name: "Monitoring Ticket",
                            active: route().current("eclaim.closed"),
                        },
                    ]}
                />
            </li>
            <li>
                <SideBarDropDown
                    title={"Claim"}
                    active={route().current("eclaim.*")}
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
