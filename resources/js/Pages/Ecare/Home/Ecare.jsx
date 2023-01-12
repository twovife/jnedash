import ContentWrap from "@/Components/ContentWrap";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/inertia-react";
import React from "react";

export default function Ecare({ auth, errors }) {
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

            <ContentWrap>Selamat Datang E-Care</ContentWrap>
        </Authenticated>
    );
}
