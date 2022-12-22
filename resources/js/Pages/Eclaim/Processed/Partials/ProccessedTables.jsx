import ImageShow from "@/Components/ImageShow";
import Paginate from "@/Components/Paginate";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import dayjs from "dayjs";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillCheckCircleFill, BsFillCloudDownloadFill } from "react-icons/bs";
import { NumericFormat } from "react-number-format";
import ApproveModal from "./ApproveModal";
import RejectedModal from "./RejectedModal";

export default function ProccessedTables({
    datas,
    onFilterChange,
    filterValue,
}) {
    const { total, from, to, next_page_url, prev_page_url } = datas;
    const [dataId, setDataId] = useState(0);
    const [imgs, setImgs] = useState();
    const [showModalImg, setShowModalImg] = useState(false);
    const [showApproveModal, setShowApproveModal] = useState(false);
    const [showRejecteModal, setShowRejecteModal] = useState(false);

    const onShowApproveHandler = (e, id) => {
        setDataId(id);
        setShowApproveModal(true);
    };
    const onShowRejeectHandler = (e, id) => {
        setDataId(id);
        setShowRejecteModal(true);
    };

    const onClosedModal = () => {
        setShowApproveModal(false);
        setShowRejecteModal(false);
    };

    const onHandleImageClick = (e) => {
        setImgs(e.target.getAttribute("data-url"));
        setShowModalImg(true);
    };

    const onClosedImg = (e) => {
        setImgs("");
        setShowModalImg(false);
    };
    console.log(dataId);
    return (
        <div className="shadow-md sm:rounded-lg">
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
            <div className="overflow-x-auto ">
                <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-700 dark:text-slate-400">
                        <tr className="text-center">
                            <th
                                scope="col"
                                className="py-3 px-6 whitespace-nowrap"
                            >
                                NOMOR TICKETING
                            </th>
                            <th
                                scope="col"
                                className="py-3 px-6 whitespace-nowrap"
                            >
                                TANGGAL CLAIM
                            </th>
                            <th
                                scope="col"
                                className="py-3 px-6 whitespace-nowrap"
                            >
                                Tanggal Proses
                            </th>
                            <th
                                scope="col"
                                className="py-3 px-6 whitespace-nowrap"
                            >
                                PIC Proses
                            </th>
                            <th
                                scope="col"
                                className="py-3 px-6 whitespace-nowrap"
                            >
                                NOMOR RESI
                            </th>
                            <th
                                scope="col"
                                className="py-3 px-6 whitespace-nowrap"
                            >
                                Origin
                            </th>
                            <th
                                scope="col"
                                className="py-3 px-6 whitespace-nowrap"
                            >
                                Destination
                            </th>
                            <th
                                scope="col"
                                className="py-3 px-6 whitespace-nowrap"
                            >
                                SLA
                            </th>
                            <th
                                scope="col"
                                className="py-3 px-6 whitespace-nowrap"
                            >
                                Claim Propose
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
                            <th scope="col" className="py-3 px-6">
                                Action
                            </th>
                        </tr>
                    </thead>

                    {datas.data ? (
                        <tbody>
                            {datas.data.map((claim, key) => (
                                <tr key={key}>
                                    <td className="py-3 px-6 text-center">
                                        {claim.ticket_id}
                                    </td>
                                    <td className="py-3 px-6 whitespace-nowrap text-center">
                                        {dayjs(claim.created_at).format(
                                            "DD-MM-YYYY"
                                        )}
                                    </td>
                                    <td className="py-3 px-6 whitespace-nowrap text-center">
                                        {dayjs(claim.processed_at).format(
                                            "DD-MM-YYYY"
                                        )}
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        {claim.processedby.username}
                                    </td>
                                    <td className="py-3 px-6">
                                        {claim.cnote.connote}
                                    </td>
                                    <td className="py-3 px-6">
                                        {claim.cnote.shipper.origin}
                                    </td>
                                    <td className="py-3 px-6">
                                        {claim.cnote.receiver.destination}
                                    </td>
                                    <td className="whitespace-nowrap py-3 px-6">
                                        {dayjs(claim.sla).format("DD-MM-YYYY")}
                                    </td>

                                    <td className="py-3 px-6 text-right">
                                        <NumericFormat
                                            value={claim.claim_propose}
                                            displayType={"text"}
                                            thousandSeparator={","}
                                            prefix={"Rp. "}
                                        />
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
                                                data-url={claim.transfer_nota}
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
                                    <td className="py-3 px-6 flex gap-1 justify-center">
                                        <PrimaryButton
                                            theme="success"
                                            type={"button"}
                                            onClick={(e) =>
                                                onShowApproveHandler(
                                                    e,
                                                    claim.id
                                                )
                                            }
                                        >
                                            <BsFillCheckCircleFill />
                                        </PrimaryButton>
                                        <PrimaryButton
                                            theme="danger"
                                            type={"button"}
                                            onClick={(e) =>
                                                onShowRejeectHandler(
                                                    e,
                                                    claim.id
                                                )
                                            }
                                        >
                                            <BsFillCheckCircleFill />
                                        </PrimaryButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    ) : (
                        <tbody>
                            <tr>
                                <td
                                    className="py-3 px-6 text-center"
                                    colSpan={7}
                                >
                                    Data Tidak Ditemukan
                                </td>
                            </tr>
                        </tbody>
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
            <ApproveModal
                closeModal={onClosedModal}
                showApprove={showApproveModal}
                id={dataId}
            />

            <RejectedModal
                closeModal={onClosedModal}
                showReject={showRejecteModal}
                id={dataId}
            />

            <ImageShow imgs={imgs} show={showModalImg} onClosed={onClosedImg} />
        </div>
    );
}
