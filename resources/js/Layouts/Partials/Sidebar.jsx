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
                            href: route("csoffice.complainrequest.index"),
                            name: "Request CS",
                            active: route().current(
                                "csoffice.complainrequest.*"
                            ),
                        },
                        {
                            id: 2,
                            href: route("csoffice.complain.index"),
                            name: "Report Ticketing",
                            active: route().current("csoffice.complain.*"),
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
                            href: route("csoffice.complainrequest.index"),
                            name: "Pengajuan Claim",
                            active: route().current(
                                "csoffice.complainrequest.*"
                            ),
                        },
                        {
                            id: 2,
                            href: route("csoffice.claim.index"),
                            name: "Report Claim",
                            active: route().current("csoffice.claim.index"),
                        },
                        {
                            id: 3,
                            href: route("csoffice.claim.monitoring"),
                            name: "Report Monitoring Claim",
                            active: route().current(
                                "csoffice.claim.monitoring"
                            ),
                        },
                    ]}
                />
            </li>
        </ul>
    );
}
