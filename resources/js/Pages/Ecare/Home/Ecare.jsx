import ContentWrap from "@/Components/ContentWrap";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import EcareTables from "./Partials/EcareTables";

export default function Ecare({ auth, errors, ...props }) {
    const userLogin = auth.user;
    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Ecare" />

            <ContentWrap>
                <EcareTables data={props.data} userLogin={userLogin} />
            </ContentWrap>
        </Authenticated>
    );
}
