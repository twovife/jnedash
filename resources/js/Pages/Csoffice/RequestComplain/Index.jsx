import ContentWrap from "@/Components/ContentWrap";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React from "react";
import MyTables from "@/Components/Tables/MyTables";
import { AiFillEdit } from "react-icons/ai";

const Index = ({ auth, ...props }) => {
    const header = [
        {
            title: "Tanggal Reqeust",
            column: "created_at",
            sortable: true,
        },
        {
            title: "Nomor Request",
            column: "no_request",
            sortable: true,
        },
        {
            title: "Callers",
            column: "caller_category",
            sortable: false,
        },
        {
            title: "Caller Name",
            column: "caller_contact_name",
            sortable: true,
        },
        {
            title: "Caller CP",
            column: "caller_contact_person",
            sortable: true,
        },
        {
            title: "Status",
            column: "request_status",
            sortable: true,
        },
    ];
    return (
        <Authenticated
            auth={auth}
            header={
                <>
                    <h2 className="font-semibold text-lg text-gray-800 dark:text-white leading-tight">
                        E-Claim
                    </h2>
                    <Head title="Claim" />
                </>
            }
        >
            <ContentWrap>
                <MyTables
                    header={header}
                    link={props.requests.link}
                    editable={true}
                >
                    <tbody>
                        {props.requests.data.map((item, index) => (
                            <tr
                                key={index}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                                <th className="px-6 py-1">
                                    <div className="flex justify-around items-center">
                                        {index + 1}
                                        <Link
                                            href={route(
                                                "csoffice.complainrequest.generate",
                                                item.id
                                            )}
                                        >
                                            <AiFillEdit className="text-blue-500 hover:cursor-pointer" />
                                        </Link>
                                    </div>
                                </th>
                                {header.map((header, index) => (
                                    <td className="px-6 py-1" key={index}>
                                        {item[header.column]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </MyTables>
            </ContentWrap>
        </Authenticated>
    );
};

export default Index;
