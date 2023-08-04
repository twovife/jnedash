import ImageShow from "@/Components/ImageShow";
import Paginate from "@/Components/Paginate";
import TextInput from "@/Components/TextInput";
import dayjs from "dayjs";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillCloudDownloadFill } from "react-icons/bs";
import { NumericFormat } from "react-number-format";
import Detail from "../../../Csoffice/Eclaim/Detail";

export default function ClosedTables({ datas, onFilterChange, filterValue }) {
    const { total, from, to, next_page_url, prev_page_url } = datas;
    const [imgs, setImgs] = useState();
    const [showModalImg, setShowModalImg] = useState(false);
    const [showDetail, setShowDetail] = useState({ id: "", show: false });

    const onHandleImageClick = (e) => {
        setImgs(e.target.getAttribute("data-url"));
        setShowModalImg(true);
    };

    const onClosed = (e) => {
        setImgs("");
        setShowModalImg(false);
    };

    const showDetailHandler = (id) => {
        setShowDetail({
            id: id,
            show: true,
        });
    };

    const closedDetailModal = () => {
        setShowDetail({
            id: "",
            show: false,
        });
    };

    return (
        <>
            <div className="relative shadow-md sm:rounded-lg">
                <div className="pb-4 bg-white dark:bg-gray-900 p-3">
                    <label htmlFor="table-search" className="sr-only">
                        Search
                    </label>
                    <div className="relative mt-1">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <AiOutlineSearch />
                        </div>
                        <TextInput
                            onChange={onFilterChange}
                            type="text"
                            id="table-search"
                            value={filterValue}
                            className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search for data"
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
                                    Tanggal Claim
                                </th>
                                <th
                                    scope="col"
                                    className="whitespace-nowrap text-center py-3 px-6"
                                >
                                    Nomor Resi
                                </th>
                                <th
                                    scope="col"
                                    className="whitespace-nowrap text-center py-3 px-6"
                                >
                                    Origin
                                </th>
                                <th
                                    scope="col"
                                    className="whitespace-nowrap text-center py-3 px-6"
                                >
                                    Destination
                                </th>
                                <th
                                    scope="col"
                                    className="whitespace-nowrap text-center py-3 px-6"
                                >
                                    Claim Propose
                                </th>
                                <th
                                    scope="col"
                                    className="whitespace-nowrap text-center py-3 px-6"
                                >
                                    Claim Approve
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
                                    SLA
                                </th>
                                <th
                                    scope="col"
                                    className="whitespace-nowrap text-center py-3 px-6"
                                >
                                    Processed At
                                </th>
                                <th
                                    scope="col"
                                    className="whitespace-nowrap text-center py-3 px-6"
                                >
                                    Closed At
                                </th>
                                <th
                                    scope="col"
                                    className="whitespace-nowrap text-center py-3 px-6"
                                >
                                    Status
                                </th>
                                <th
                                    scope="col"
                                    className="whitespace-nowrap text-center py-3 px-6"
                                >
                                    Lampiran
                                </th>
                                <th
                                    scope="col"
                                    className="whitespace-nowrap text-center py-3 px-6"
                                >
                                    Document
                                </th>
                            </tr>
                        </thead>

                        {datas.data ? (
                            <tbody className="relative z-10">
                                {datas.data.map((claim) => (
                                    <tr key={claim.id}>
                                        <td className="py-3 px-6">
                                            <button
                                                className="text-brand-500 hover:text-brand-700 focus:text-brand-700"
                                                onClick={() =>
                                                    showDetailHandler(claim.id)
                                                }
                                            >
                                                {claim.ticket_id}
                                            </button>
                                        </td>
                                        <td className="text-center py-3 px-6">
                                            {dayjs(claim.created_at).format(
                                                "DD-MM-YYYY"
                                            )}
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            {claim.cnote.connote}
                                        </td>
                                        <td className="text-center py-3 px-6">
                                            {claim.cnote.shipper.origin}
                                        </td>
                                        <td className="text-center py-3 px-6">
                                            {claim.cnote.receiver.destination}
                                        </td>
                                        <td className="text-center py-3 px-6">
                                            <NumericFormat
                                                value={claim.claim_propose}
                                                displayType={"text"}
                                                thousandSeparator={","}
                                                prefix={"Rp. "}
                                            />
                                        </td>
                                        <td className="text-center py-3 px-6">
                                            <NumericFormat
                                                value={claim.claim_approved}
                                                displayType={"text"}
                                                thousandSeparator={","}
                                                prefix={"Rp. "}
                                            />
                                        </td>
                                        <td className="whitespace-nowrap text-center py-3 px-6 uppercase">
                                            {claim.status_sla}
                                        </td>
                                        <td className="whitespace-nowrap text-center py-3 px-6">
                                            {dayjs(claim.sla).format(
                                                "DD-MM-YYYY"
                                            )}
                                        </td>
                                        <td className="whitespace-nowrap text-center py-3 px-6">
                                            {dayjs(claim.processed_at).format(
                                                "DD-MM-YYYY"
                                            )}
                                        </td>
                                        <td className="whitespace-nowrap text-center py-3 px-6">
                                            {dayjs(claim.closed_at).format(
                                                "DD-MM-YYYY"
                                            )}
                                        </td>
                                        <td className="whitespace-nowrap text-center py-3 px-6 uppercase">
                                            {claim.status}
                                        </td>

                                        <td className="py-3 px-6">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    data-url={
                                                        claim.complainant_idcard
                                                    }
                                                    onClick={onHandleImageClick}
                                                    className="px-2 py-1.5 bg-brand-500 rounded-lg text-white hover:bg-brand-600 focus:bg-brand-700 focus:ring-2 focus:ring-brand-600 text-xs"
                                                >
                                                    KTP
                                                </button>
                                                <button
                                                    data-url={
                                                        claim.complainant_bank
                                                    }
                                                    onClick={onHandleImageClick}
                                                    className="px-2 py-1.5 bg-brand-500 rounded-lg text-white hover:bg-brand-600 focus:bg-brand-700 focus:ring-2 focus:ring-brand-600 text-xs"
                                                >
                                                    Rekening
                                                </button>
                                                <button
                                                    data-url={
                                                        claim.complainant_nota
                                                    }
                                                    onClick={onHandleImageClick}
                                                    className="px-2 py-1.5 bg-brand-500 rounded-lg text-white hover:bg-brand-600 focus:bg-brand-700 focus:ring-2 focus:ring-brand-600 text-xs"
                                                >
                                                    Nota
                                                </button>
                                                <button
                                                    data-url={
                                                        claim.transfer_nota
                                                    }
                                                    onClick={onHandleImageClick}
                                                    className="px-2 py-1.5 bg-brand-500 rounded-lg text-white hover:bg-brand-600 focus:bg-brand-700 focus:ring-2 focus:ring-brand-600 text-xs"
                                                >
                                                    Transfer
                                                </button>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6">
                                            <div className="flex justify-center">
                                                <a
                                                    className="p-2 border-gray-500 border rounded-lg hover:bg-gray-500 hover:text-white shadow focus:ring focus:ring-gray-400 focus:bg-gray-600 focus:text-white"
                                                    target={"_blank"}
                                                    href={route(
                                                        "eclaim.exportpdf",
                                                        claim.ticket_id
                                                    )}
                                                >
                                                    <BsFillCloudDownloadFill />
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        ) : (
                            ""
                        )}
                    </table>
                </div>
                <Paginate
                    dataFrom={from}
                    dataTo={to}
                    dataTotal={total}
                    linkPrev={prev_page_url}
                    linkNext={next_page_url}
                />
            </div>
            <ImageShow imgs={imgs} show={showModalImg} onClosed={onClosed} />
            <Detail modalShow={showDetail} closedModal={closedDetailModal} />
        </>
    );
}
