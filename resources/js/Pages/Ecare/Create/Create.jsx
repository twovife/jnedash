import ContentWrap from "@/Components/ContentWrap";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import TicketCheckAwb from "./Partials/TicketCheckAwb";

export default function Create({ auth, errors, complaincase }) {
    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">
                    Ticketing Customer Service
                </h2>
            }
        >
            <Head title="Ecare" />
            <ContentWrap>
                <div className="max-w-xl mx-auto">
                    {/* <TicketCheckAwb complaincase={complaincase} /> */}
                </div>
            </ContentWrap>
        </Authenticated>
    );
}
