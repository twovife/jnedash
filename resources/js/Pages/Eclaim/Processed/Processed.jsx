import ContentWrap from "@/Components/ContentWrap";
import LinkButton from "@/Components/LinkButton";
import Loading from "@/Components/Loading";
import Toasts from "@/Components/Toasts";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/inertia-react";
import React, { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import ProccessedTables from "./Partials/ProccessedTables";

export default function Processed({
    auth,
    errors,
    flash,
    claim,
    filterval,
    ...props
}) {
    const [filter, setFilter] = useState(null);
    const [searchFilter, setSearchFilter] = useState(filterval || undefined);
    const [loading, setLoading] = useState(false);

    const onFilterChange = (e) => {
        setSearchFilter(e.target.value);
        clearTimeout(filter);
        const newFilter = setTimeout(() => {
            Inertia.get(
                route("eclaim.processed"),
                { search: e.target.value },
                {
                    preserveState: true,
                    onStart: (visit) => {
                        setLoading(true);
                    },
                    onFinish: (visit) => {
                        setLoading(false);
                    },
                }
            );
        }, 500);

        setFilter(newFilter);
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
                </>
            }
        >
            <Head title="Claim" />
            <ContentWrap>
                <ProccessedTables
                    datas={claim}
                    onFilterChange={onFilterChange}
                    filterValue={searchFilter}
                />
            </ContentWrap>
            <Loading show={loading} />
            <Toasts flash={flash} />
        </Authenticated>
    );
}
