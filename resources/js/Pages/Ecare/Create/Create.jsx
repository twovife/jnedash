import ContentWrap from "@/Components/ContentWrap";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Accordion } from "flowbite-react";
import React from "react";
import EcareInput from "./Partials/EcareInput";
import TicketCheckAwb from "./Partials/TicketCheckAwb";

export default function Create({ auth, errors, ...props }) {
    const {
        sources,
        callers,
        sendoffice,
        complaincase,
        resi,
        receiver,
        shipper,
    } = props;
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
                <div className="max-w-7xl mx-auto">
                    <div>
                        <p className="font-semibold text-xl mb-2">
                            Input Data Ticketing
                        </p>
                    </div>
                    <div className="flex flex-col-reverse lg:flex-row">
                        <div className="flex-[3]">
                            <EcareInput
                                sources={sources}
                                callers={callers}
                                sendingOffice={sendoffice}
                                complainCase={complaincase}
                                auth={auth}
                                eror={errors}
                                resi={resi}
                                receiver={receiver}
                                shipper={shipper}
                            />
                        </div>
                        <Accordion
                            className="mb-3 flex-1 border-b-0"
                            flush={true}
                            alwaysOpen={true}
                        >
                            <Accordion.Panel>
                                <Accordion.Title>
                                    <p className="text-lg font-semibold">
                                        Detail Resi
                                    </p>
                                </Accordion.Title>
                                <Accordion.Content></Accordion.Content>
                            </Accordion.Panel>
                        </Accordion>
                    </div>
                </div>
            </ContentWrap>
        </Authenticated>
    );
}
