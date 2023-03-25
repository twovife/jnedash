import dayjs, { Dayjs } from "dayjs";
import { MdEditNote } from "react-icons/md";
import React, { useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import FollowUpModal from "./FollowUpModal";

const EcareTables = ({ data, userLogin }) => {
    console.log(data);
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

    return (
        <div className="relative shadow-md sm:rounded-lg">
            <div className="pb-4 bg-white dark:bg-gray-900 p-3">
                <label htmlFor="table-search" className="sr-only">
                    Search
                </label>
                <div className="relative mt-1">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg
                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            ></path>
                        </svg>
                    </div>
                    <input
                        // onChange={onFilterChange}
                        type="text"
                        id="table-search"
                        // value={filterValue}
                        className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search for items"
                    />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th
                                scope="col"
                                className="whitespace-nowrap text-center py-3 px-6"
                            >
                                Nomor Ticketing
                            </th>
                            <th
                                scope="col"
                                className="whitespace-nowrap text-center py-3 px-6"
                            >
                                Branch
                            </th>
                            <th
                                scope="col"
                                className="whitespace-nowrap text-center py-3 px-6"
                            >
                                Source
                            </th>
                            <th
                                scope="col"
                                className="whitespace-nowrap text-center py-3 px-6"
                            >
                                Sub Source
                            </th>
                            <th
                                scope="col"
                                className="whitespace-nowrap text-center py-3 px-6"
                            >
                                Creator
                            </th>
                            <th
                                scope="col"
                                className="whitespace-nowrap text-center py-3 px-6"
                            >
                                Create On
                            </th>
                            <th
                                scope="col"
                                className="whitespace-nowrap text-center py-3 px-6"
                            >
                                Caller
                            </th>
                            <th
                                scope="col"
                                className="whitespace-nowrap text-center py-3 px-6"
                            >
                                Caller Source
                            </th>
                            <th
                                scope="col"
                                className="whitespace-nowrap text-center py-3 px-6"
                            >
                                Complainment
                            </th>
                            <th
                                scope="col"
                                className="whitespace-nowrap text-center py-3 px-6"
                            >
                                Resi
                            </th>
                            <th
                                scope="col"
                                className="whitespace-nowrap text-center py-3 px-6"
                            >
                                Shipment Date
                            </th>
                            <th
                                scope="col"
                                className="whitespace-nowrap text-center py-3 px-6"
                            >
                                Shipper Name
                            </th>
                            <th
                                scope="col"
                                className="whitespace-nowrap text-center py-3 px-6"
                            >
                                Shipper Addr
                            </th>
                            <th
                                scope="col"
                                className="whitespace-nowrap text-center py-3 px-6"
                            >
                                Shipper Phone
                            </th>
                            <th
                                scope="col"
                                className="whitespace-nowrap text-center py-3 px-6"
                            >
                                Cnee Name
                            </th>
                            <th
                                scope="col"
                                className="whitespace-nowrap text-center py-3 px-6"
                            >
                                Cnee Addr
                            </th>
                            <th
                                scope="col"
                                className="whitespace-nowrap text-center py-3 px-6"
                            >
                                Cnee Phone
                            </th>
                            <th
                                scope="col"
                                className="whitespace-nowrap text-center py-3 px-6"
                            >
                                Service
                            </th>
                            <th
                                scope="col"
                                className="whitespace-nowrap text-center py-3 px-6"
                            >
                                Category
                            </th>
                            <th
                                scope="col"
                                className="whitespace-nowrap text-center py-3 px-6"
                            >
                                Case Type
                            </th>
                            <th
                                scope="col"
                                className="whitespace-nowrap text-center py-3 px-6"
                            >
                                Sub Case Type
                            </th>
                            <th
                                scope="col"
                                className="whitespace-nowrap text-center py-3 px-6"
                            >
                                Priority
                            </th>
                            <th
                                scope="col"
                                className="whitespace-nowrap text-center py-3 px-6"
                            >
                                Zona
                            </th>
                            <th
                                scope="col"
                                className="whitespace-nowrap text-center py-3 px-6"
                            >
                                SLA
                            </th>
                            <th
                                scope="col"
                                className="whitespace-nowrap text-center py-3 px-6"
                            >
                                Status SLA
                            </th>
                            <th
                                scope="col"
                                className="whitespace-nowrap text-center py-3 px-6"
                            >
                                Note
                            </th>
                            <th
                                scope="col"
                                className="whitespace-nowrap text-center py-3 px-6"
                            >
                                Follow up
                            </th>
                            <th
                                scope="col"
                                className="whitespace-nowrap text-center py-3 px-6"
                            >
                                Last Follow Up
                            </th>
                            <th
                                scope="col"
                                className="whitespace-nowrap text-center py-3 px-6"
                            >
                                Ticket Status
                            </th>

                            <th
                                scope="col"
                                className="whitespace-nowrap text-center py-3 px-6"
                            >
                                Closed By
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((elm) => (
                            <tr key={elm.id}>
                                <td className="py-3 px-6 text-center">
                                    {elm.no_ticket}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {elm.branch == 1
                                        ? "KDR"
                                        : elm.branch == 2
                                        ? "TLG"
                                        : "TRG"}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {elm.source.source}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {elm.source.sub_source}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {elm.usercreate.username}
                                </td>
                                <td className="py-3 px-6 text-center whitespace-nowrap">
                                    {dayjs(elm.created_at).format("DD-MM-YYYY")}
                                </td>
                                <td className="py-3 px-6 text-center whitespace-nowrap">
                                    {elm.complainment.callers.caller}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {elm.complainment.comp_identiti}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {elm.complainment.comp_name}&nbsp;(
                                    {elm.complainment.comp_phone})
                                </td>

                                <td className="py-3 px-6 text-center whitespace-nowrap">
                                    {elm.cnote ? elm.cnote.connote : ""}
                                </td>
                                <td className="py-3 px-6 text-center whitespace-nowrap">
                                    {elm.cnote
                                        ? dayjs(elm.cnote.connote_date).format(
                                              "DD-MM-YYYY"
                                          )
                                        : ""}
                                </td>
                                <td className="py-3 px-6 text-center whitespace-nowrap">
                                    {elm.cnote
                                        ? elm.cnote.shipper.shipper_name
                                        : ""}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {elm.cnote ? elm.cnote.shipper.city : ""}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {elm.cnote ? elm.cnote.shipper.phone : ""}
                                </td>
                                <td className="py-3 px-6 text-center whitespace-nowrap">
                                    {elm.cnote
                                        ? elm.cnote.receiver.receiver_name
                                        : ""}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {elm.cnote ? elm.cnote.receiver.city : ""}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {elm.cnote ? elm.cnote.receiver.phone : ""}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {elm.cnote ? elm.cnote.services_code : ""}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {elm.ticketcase.category}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {elm.ticketcase.case}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {elm.ticketcase.sub_case}
                                </td>
                                <td className="py-3 px-6 text-center uppercase">
                                    {elm.case_priority}
                                </td>
                                <td className="py-3 px-6 text-center uppercase">
                                    {elm.zona}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {elm.sla}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {elm.sla_status ?? "Unstatus"}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {elm.note}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <button
                                        onClick={() =>
                                            showFollowUpModal(elm.id)
                                        }
                                        className="px-1.5 py-1.5 border border-black/60 dark:border-white/20 hover:bg-black/10 rounded-lg"
                                    >
                                        <MdEditNote />
                                    </button>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {elm.comment
                                        ? `( ${dayjs(
                                              elm.comment.created_at
                                          ).format("DD-MM-YY")} ) ${
                                              elm.comment.comment
                                          } - ${elm.comment.user_comment}`
                                        : ""}
                                </td>
                                <td className="py-3 px-6 text-center uppercase">
                                    {elm.status}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {elm.user_closed
                                        ? elm.userclosed.username
                                        : ""}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <FollowUpModal
                show={modalShow}
                onModalClosed={hideFollowUpModal}
                userLogin={userLogin}
            />
        </div>
    );
};

export default EcareTables;
