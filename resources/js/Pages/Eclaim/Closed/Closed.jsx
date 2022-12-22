import ContentWrap from "@/Components/ContentWrap";
import Loading from "@/Components/Loading";
import Toasts from "@/Components/Toasts";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/inertia-react";
import React, { useEffect, useState } from "react";
import ClosedTables from "./Partials/ClosedTables";

export default function Closed({
    auth,
    errors,
    flash,
    claim,
    filterval,
    ...props
}) {
    console.log(claim);
    const [filter, setFilter] = useState(null);
    const [searchFilter, setSearchFilter] = useState(filterval || undefined);
    const [loading, setLoading] = useState(false);

    const onFilterChange = (e) => {
        setSearchFilter(e.target.value);
        clearTimeout(filter);
        const newFilter = setTimeout(() => {
            Inertia.get(
                route("eclaim.closed"),
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
                <ClosedTables
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
