import ContentWrap from "@/Components/ContentWrap";
import LinkButton from "@/Components/LinkButton";
import Loading from "@/Components/Loading";
import Toasts from "@/Components/Toasts";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/inertia-react";
import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import MonitoringTables from "./Partials/MonitoringTables";

export default function Open({
    auth,
    errors,
    flash,
    claim,
    filterval,
    filterfrom,
    filterthru,
    ...props
}) {
    const [filter, setFilter] = useState(null);
    const [searchFilter, setSearchFilter] = useState(filterval || undefined);
    const [fromFilter, setFromFilter] = useState(filterfrom || undefined);
    const [thruFilter, setThruFilter] = useState(filterthru || undefined);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useState({
        search: filterval || "",
        datefrom: filterfrom || "",
        datethru: filterthru || "",
    });

    const onFilterChange = (e) => {
        Inertia.get(route("eclaim.monitoring"), searchParams, {
            preserveState: true,
            onStart: (visit) => {
                setLoading(true);
            },
            onFinish: (visit) => {
                setLoading(false);
            },
        });
    };

    const onDownloadFile = (e) => {
        window.open(
            route("eclaim.exportExcell", searchParams),
            "_blank",
            "noopener,noreferrer"
        );
    };

    const onFilterInputChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setSearchParams((values) => ({
            ...values,
            [key]: value,
        }));
    };

    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={
                <>
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">
                        E-Claim
                    </h2>
                    <div className="ml-auto flex gap-2">
                        <LinkButton
                            title={"Create"}
                            theme={"base"}
                            type="a"
                            href={route("eclaim.create")}
                            icon={<BiPlus />}
                        />
                    </div>
                </>
            }
        >
            <Head title="Claim" />
            <ContentWrap>
                <MonitoringTables
                    datas={claim}
                    onFilterChange={onFilterChange}
                    onFilterInputChange={onFilterInputChange}
                    onDownloadFile={onDownloadFile}
                    searchParams={searchParams}
                />
            </ContentWrap>
            <Loading show={loading} />
            <Toasts flash={flash} />
        </Authenticated>
    );
}
