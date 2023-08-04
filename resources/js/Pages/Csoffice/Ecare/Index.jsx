import ContentWrap from "@/Components/ContentWrap";
import MyTables from "@/Components/Tables/MyTables";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import ModalFollow from "./ModalFollow";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import LinkButton from "@/Components/LinkButton";

const Index = ({ auth, ...props }) => {
    const [modalShow, setModalShow] = useState({
        isShow: false,
        id: null,
        data: null,
    });
    const showFollowUpModal = (id) => {
        setModalShow({
            isShow: true,
            id: id,
            data: null,
        });
    };

    const hideFollowUpModal = () => {
        setModalShow({
            isShow: false,
            id: null,
        });
    };

    const header = [
        {
            title: "Nomor Tiket",
            column: "no_ticket",
            sortable: true,
        },
        {
            title: "Cabang",
            column: "branch",
            sortable: true,
        },
        {
            title: "Source",
            column: "source",
            sortable: false,
        },
        {
            title: "Creator",
            column: "user_create",
            sortable: true,
        },
        {
            title: "Create on",
            column: "created_at",
            sortable: true,
            filterable: false,
        },
        {
            title: "Status Caller",
            column: "caller_category",
            sortable: false,
        },
        {
            title: " ",
            column: "caller_sub_category",
            sortable: false,
        },
        {
            title: "Caller Name",
            column: "caller_contact_name",
            sortable: false,
        },
        {
            title: "Caller Phone",
            column: "caller_contact_person",
            sortable: false,
        },
        {
            title: "Nomor Resi",
            column: "connote",
            sortable: false,
        },
        {
            title: "Shipment Date",
            column: "connote_date",
            sortable: false,
            filterable: false,
        },
        {
            title: "Shipper Name",
            column: "shipper_name",
            sortable: false,
            filterable: false,
        },
        {
            title: "Shipper Phone",
            column: "shipper_phone",
            sortable: false,
            filterable: false,
        },
        {
            title: "Receiver Name",
            column: "receiver_name",
            sortable: false,
            filterable: false,
        },
        {
            title: "Receiver Addr",
            column: "receiver_address",
            sortable: false,
            filterable: false,
        },
        {
            title: "Receiver Phone",
            column: "receiver_phone",
            sortable: false,
            filterable: false,
        },
        {
            title: "Services",
            column: "services_code",
            sortable: false,
            filterable: false,
        },
        {
            title: "Category",
            column: "category",
            sortable: false,
            filterable: false,
        },
        {
            title: "Case Type",
            column: "case",
            sortable: false,
            filterable: false,
        },
        {
            title: "Sub Case Type",
            column: "sub_case",
            sortable: false,
            filterable: false,
        },
        {
            title: "Case Priority",
            column: "case_priority",
            sortable: false,
            filterable: false,
        },
        {
            title: "Origin",
            column: "origin",
            sortable: false,
            filterable: false,
        },
        {
            title: "Destination",
            column: "destination",
            sortable: false,
            filterable: false,
        },
        {
            title: "Keterangan",
            column: "note",
            sortable: false,
        },
        {
            title: "Followup By",
            column: "followup_by",
            sortable: true,
        },
        {
            title: "followup",
            column: "followup",
            sortable: false,
            filterable: false,
        },
        {
            title: "Due Date",
            column: "due_date",
            sortable: true,
            filterable: false,
        },
        {
            title: "Status SLA",
            column: "sla_status",
            sortable: true,
            filterable: false,
        },
        {
            title: "Status",
            column: "status",
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
                    <div className="ml-auto">
                        <LinkButton
                            as="a"
                            title={"Create"}
                            href={route("csoffice.complain.create")}
                        />
                    </div>
                </>
            }
        >
            <ModalFollow show={modalShow} onModalClosed={hideFollowUpModal} />
            <ContentWrap>
                <MyTables
                    header={header}
                    link={props.complains.link}
                    datefilter={"created_at"}
                    editable={true}
                >
                    <tbody>
                        {props.complains.data.map((item, index) => (
                            <tr
                                key={index}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                                <th className="px-6 py-1">
                                    <div className="flex justify-around items-center gap-3">
                                        {index + 1}
                                        <Link
                                            href={route(
                                                "csoffice.complain.edit",
                                                item.id
                                            )}
                                        >
                                            <AiFillEdit className="text-blue-500 hover:cursor-pointer" />
                                        </Link>
                                    </div>
                                </th>
                                {header.map((header, index) => {
                                    if (
                                        header.column == "receiver_address" ||
                                        header.column == "note"
                                    ) {
                                        return (
                                            <td
                                                className="px-6 py-1"
                                                key={index}
                                            >
                                                <div className="w-64 white whitespace-pre-wrap">
                                                    {item[header.column]}
                                                </div>
                                            </td>
                                        );
                                    }
                                    if (header.column == "followup") {
                                        return (
                                            <td
                                                className="px-6 py-1"
                                                key={index}
                                            >
                                                <AiFillEdit
                                                    className="text-blue-500 hover:cursor-pointer"
                                                    onClick={() =>
                                                        showFollowUpModal(
                                                            item.id
                                                        )
                                                    }
                                                />
                                            </td>
                                        );
                                    }
                                    return (
                                        <td
                                            className="px-6 py-1 min-w-[10rem]"
                                            key={index}
                                        >
                                            {item[header.column]}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </MyTables>
            </ContentWrap>
        </Authenticated>
    );
};

export default Index;
