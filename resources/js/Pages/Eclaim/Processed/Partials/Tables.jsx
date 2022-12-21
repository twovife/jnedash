import ImageShow from "@/Components/ImageShow";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import dayjs from "dayjs";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillCheckCircleFill, BsFillCloudDownloadFill } from "react-icons/bs";
import ApproveModal from "./ApproveModal";
import RejectedModal from "./RejectedModal";
import { NumericFormat } from "react-number-format";

export default function Tables({ data, loading, loadMore, endOfData }) {
    const claim = data;
    const [q, setQ] = useState("");
    const [dataId, setDataId] = useState(0);
    const [showApproveModal, setShowApproveModal] = useState(false);
    const [showRejecteModal, setShowRejecteModal] = useState(false);
    const [imgUrl, setImgUrl] = useState();
    const [imageShow, setImageShow] = useState(false);

    function search(rows) {
        return rows.filter(
            (row) =>
                row.ticket_id.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
                row.cnote.connote.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
                row.cnote.shipper.origin
                    .toLowerCase()
                    .indexOf(q.toLowerCase()) > -1 ||
                row.cnote.receiver.destination
                    .toLowerCase()
                    .indexOf(q.toLowerCase()) > -1
        );
    }

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

    const spliceData = (id) => {
        onClosedModal();
        claim.splice(
            claim.findIndex((object) => {
                return object.id == id;
            }),
            1
        );
    };

    const onHandleImageClick = (e) => {
        setImgUrl(e.target.getAttribute("data-url"));
        setImageShow(true);
    };

    const onClosedImg = (e) => {
        setImgUrl("");
        setImageShow(false);
    };
    return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <div className="pb-4 bg-white dark:bg-slate-900 flex flex-col lg:flex-row justify-start items-center">
                <div className="relative mt-1 w-full lg:w-auto">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <AiOutlineSearch />
                    </div>
                    <TextInput
                        onChange={(e) => setQ(e.target.value)}
                        value={q}
                        type="text"
                        name="cnote"
                        className="mt-1 w-full lg:w-80 pl-10"
                        required
                    />
                </div>
            </div>
            <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
                <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-700 dark:text-slate-400">
                    <tr className="text-center">
                        <th scope="col" className="py-3 px-6 whitespace-nowrap">
                            NOMOR TICKETING
                        </th>
                        <th scope="col" className="py-3 px-6 whitespace-nowrap">
                            TANGGAL CLAIM
                        </th>
                        <th scope="col" className="py-3 px-6 whitespace-nowrap">
                            Tanggal Proses
                        </th>
                        <th scope="col" className="py-3 px-6 whitespace-nowrap">
                            PIC Proses
                        </th>
                        <th scope="col" className="py-3 px-6 whitespace-nowrap">
                            NOMOR RESI
                        </th>
                        <th scope="col" className="py-3 px-6 whitespace-nowrap">
                            Origin
                        </th>
                        <th scope="col" className="py-3 px-6 whitespace-nowrap">
                            Destination
                        </th>
                        <th scope="col" className="py-3 px-6 whitespace-nowrap">
                            SLA
                        </th>
                        <th scope="col" className="py-3 px-6 whitespace-nowrap">
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

                {claim ? (
                    <tbody>
                        {search(claim).map((data, key) => (
                            <tr key={key}>
                                <td className="py-3 px-6 text-center">
                                    {data.ticket_id}
                                </td>
                                <td className="py-3 px-6 whitespace-nowrap text-center">
                                    {dayjs(data.created_at).format(
                                        "DD-MM-YYYY"
                                    )}
                                </td>
                                <td className="py-3 px-6 whitespace-nowrap text-center">
                                    {dayjs(data.processed_at).format(
                                        "DD-MM-YYYY"
                                    )}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {data.processedby.username}
                                </td>
                                <td className="py-3 px-6">
                                    {data.cnote.connote}
                                </td>
                                <td className="py-3 px-6">
                                    {data.cnote.shipper.origin}
                                </td>
                                <td className="py-3 px-6">
                                    {data.cnote.receiver.destination}
                                </td>
                                <td className="whitespace-nowrap py-3 px-6">
                                    {dayjs(data.created_at)
                                        .add(6, "day")
                                        .format("DD-MM-YYYY")}
                                </td>

                                <td className="py-3 px-6 text-right">
                                    <NumericFormat
                                        value={data.claim_propose}
                                        displayType={"text"}
                                        thousandSeparator={","}
                                        prefix={"Rp. "}
                                    />
                                </td>
                                <td className="py-3 px-6">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            data-url={data.complainant_idcard}
                                            onClick={onHandleImageClick}
                                            className="px-2 py-1.5 bg-brand-500 rounded-lg text-white hover:bg-brand-600 focus:bg-brand-700 focus:ring-2 focus:ring-brand-600 text-xs"
                                        >
                                            KTP
                                        </button>
                                        <button
                                            data-url={data.complainant_bank}
                                            onClick={onHandleImageClick}
                                            className="px-2 py-1.5 bg-brand-500 rounded-lg text-white hover:bg-brand-600 focus:bg-brand-700 focus:ring-2 focus:ring-brand-600 text-xs"
                                        >
                                            Rekening
                                        </button>
                                        <button
                                            data-url={data.complainant_nota}
                                            onClick={onHandleImageClick}
                                            className="px-2 py-1.5 bg-brand-500 rounded-lg text-white hover:bg-brand-600 focus:bg-brand-700 focus:ring-2 focus:ring-brand-600 text-xs"
                                        >
                                            Nota
                                        </button>
                                        <button
                                            data-url={data.transfer_nota}
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
                                                data.ticket_id
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
                                            onShowApproveHandler(e, data.id)
                                        }
                                    >
                                        <BsFillCheckCircleFill />
                                    </PrimaryButton>
                                    <PrimaryButton
                                        theme="danger"
                                        type={"button"}
                                        onClick={(e) =>
                                            onShowRejeectHandler(e, data.id)
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
                            <td className="py-3 px-6 text-center" colSpan={7}>
                                {loading
                                    ? "Loading . . ."
                                    : "Data Tidak Ditemukan"}
                            </td>
                        </tr>
                    </tbody>
                )}
            </table>
            <ApproveModal
                closeModal={onClosedModal}
                showApprove={showApproveModal}
                id={dataId}
                spliceData={spliceData}
            />

            <RejectedModal
                closeModal={onClosedModal}
                showReject={showRejecteModal}
                id={dataId}
                spliceData={spliceData}
            />

            <ImageShow
                imgUrl={imgUrl}
                show={imageShow}
                onClosed={onClosedImg}
            />
        </div>
    );
}
// showApprove,
// maxWidth = "md",
// closeModal,
// processing,
