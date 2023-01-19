import ContentWrap from "@/Components/ContentWrap";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import Tracer from "./Partials/Tracer";

const TraceConnote = ({ auth, errors }) => {
    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">
                    Cari Connote
                </h2>
            }
        >
            <Head title="Ecare" />
            <ContentWrap>
                <Tracer />
            </ContentWrap>
        </Authenticated>
    );
};

export default TraceConnote;
