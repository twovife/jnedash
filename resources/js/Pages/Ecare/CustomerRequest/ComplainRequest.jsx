import ContentWrap from "@/Components/ContentWrap";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import ComplainRequestTables from "./Partials/ComplainRequestTables";
import Pagination from "@/Components/Paginate";

const ComplainRequest = ({ auth, errors, requests, filters, ...props }) => {
    const { data } = requests;
    const addFilter = (e) => {
        console.log(e);
    };
    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">
                    Request Ticketing Customer Service
                </h2>
            }
        >
            <Head title="Ecare" />
            <ContentWrap>
                <ComplainRequestTables
                    datas={data}
                    addFilter={addFilter}
                    filters={filters}
                />
                <Pagination
                    first_page_url={requests.first_page_url}
                    last_page_url={requests.last_page_url}
                    last_page={requests.last_page}
                    current_page={requests.current_page}
                    links={requests.links}
                />
            </ContentWrap>
        </Authenticated>
    );
};

export default ComplainRequest;
