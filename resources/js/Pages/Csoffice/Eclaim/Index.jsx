import ContentWrap from "@/Components/ContentWrap";
import MyTables from "@/Components/Tables/MyTables";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import LinkButton from "@/Components/LinkButton";
import ImageShow from "@/Components/ImageShow";
import { BsFillCloudDownloadFill } from "react-icons/bs";
import dayjs from "dayjs";
import { NumericFormat } from "react-number-format";
import ApproveModal from "./ApproveModal";
import RejectedModal from "./RejectedModal";
import Detail from "./Detail";
import PrimaryButton from "@/Components/PrimaryButton";
import useFilteredComplains from "@/Hooks/useFilteredComplains";
import Pagination from "@/Components/Pagination";

const Index = ({ auth, ...props }) => {
    const itemsPerPage = 20;
    const {
        filters,
        setFilters,
        currentPage,
        setCurrentPage,
        displayData,
        totalPages,
        handlePageChange,
    } = useFilteredComplains({}, itemsPerPage);

    const [imgs, setImgs] = useState();
    const [showModalImg, setShowModalImg] = useState(false);

    const onHandleImageClick = (e) => {
        setImgs(e.target.getAttribute("data-url"));
        setShowModalImg(true);
    };

    useEffect(() => {
        const storedFilter = JSON.parse(localStorage.getItem("claimFilter"));
        if (storedFilter && Object.keys(storedFilter).length > 0) {
            setFilters(storedFilter);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("claimFilter", JSON.stringify(filters));
    }, [filters]);

    const onClosed = (e) => {
        setImgs("");
        setShowModalImg(false);
    };

    const header = [
        {
            title: "Nomor Tiket",
            column: "ticket_id",
            sortable: false,
        },
        {
            title: "Tanggal Claim",
            formater: "date",
            column: "created_at",
            sortable: false,
        },
        {
            title: "Nomor Resi",
            column: "connote",
            sortable: false,
        },
        {
            title: "Origin",
            column: "origin",
            sortable: false,
        },
        {
            title: "Destination",
            column: "destination",
            sortable: false,
        },
        {
            title: "Claim Propose",
            column: "claim_propose",
            formater: "currency",
            sortable: false,
        },
        {
            title: "Claim Approve",
            column: "claim_approved",
            formater: "currency",
            sortable: false,
        },
        {
            title: "SLA",
            column: "sla",
            formater: "date",
            sortable: false,
        },
        {
            title: "Status SLA",
            column: "status_sla",
            sortable: false,
        },
        {
            title: "Processed At",
            column: "processed_at",
            formater: "date",
            sortable: false,
        },
        {
            title: "Processed by",
            column: "processed_by",
            sortable: false,
        },
        {
            title: "Closed At",
            column: "closed_at",
            formater: "date",
            sortable: false,
        },
        {
            title: "Closed by",
            column: "closed_by",
            sortable: false,
        },
        {
            title: "Status",
            column: "status",
            sortable: false,
        },
        {
            title: "Lampiran",
            column: "lampiran",
            sortable: false,
        },
        {
            title: "Document",
            column: "document",
            sortable: false,
        },
        {
            title: "Actions",
            column: "actions",
            sortable: false,
        },
    ];

    const handleFilters = (data) => {
        setFilters({
            ...filters,
            ...data,
        });
    };

    const decrementFiter = (data) => {
        setFilters(data);
    };

    const processData = (e) => {
        const buttons = e.target;
        buttons.disabled = true;
        buttons.innerHTML = "Wait";
        const id = e.target.getAttribute("data-id");
        try {
            router.visit(
                route("csoffice.claim.proccessdata", id),
                { method: "put", data: { _method: "put" } },

                {
                    onSuccess: () => {
                        buttons.innerHTML = "Proccess";
                    },
                    preserveScroll: false,
                }
            );
        } catch (error) {
            console.log(error);
            buttons.innerHTML = "eror lo";
            setTimeout(() => {
                buttons.innerHTML = "Proccess";
                buttons.disabled = false;
            }, 500);
        }

        //
    };

    const tbodyGenerate = () => {
        if (displayData.length === 0) {
            return (
                <>
                    <tbody>
                        <tr>
                            <td colSpan="2">Data Not Found</td>
                        </tr>
                    </tbody>
                </>
            );
        }
        return (
            <tbody>
                {displayData.map((item, index) => (
                    <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-xs"
                    >
                        <th className="px-6 py-1">
                            <div className="flex justify-around items-center gap-3">
                                {(currentPage - 1) * itemsPerPage + index + 1}
                                <AiFillEdit
                                    className="text-blue-500 hover:cursor-pointer"
                                    onClick={() => showDetailHandler(item.id)}
                                    // data-id={item.id}
                                />
                            </div>
                        </th>
                        {header.map((header, index) => {
                            if (header.column == "lampiran") {
                                return (
                                    <td className="px-6 py-1" key={index}>
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                data-url={
                                                    item.complainant_idcard
                                                }
                                                onClick={onHandleImageClick}
                                                className="px-2 py-2 bg-brand-500 rounded-lg text-white hover:bg-brand-600 focus:bg-brand-700 focus:ring-2 focus:ring-brand-600 text-xs"
                                            >
                                                KTP
                                            </button>
                                            <button
                                                data-url={item.complainant_bank}
                                                onClick={onHandleImageClick}
                                                className="px-2 py-2 bg-brand-500 rounded-lg text-white hover:bg-brand-600 focus:bg-brand-700 focus:ring-2 focus:ring-brand-600 text-xs"
                                            >
                                                Rekening
                                            </button>
                                            <button
                                                data-url={item.complainant_nota}
                                                onClick={onHandleImageClick}
                                                className="px-2 py-2 bg-brand-500 rounded-lg text-white hover:bg-brand-600 focus:bg-brand-700 focus:ring-2 focus:ring-brand-600 text-xs"
                                            >
                                                Nota
                                            </button>
                                            <button
                                                data-url={item.transfer_nota}
                                                onClick={onHandleImageClick}
                                                className="px-2 py-2 bg-brand-500 rounded-lg text-white hover:bg-brand-600 focus:bg-brand-700 focus:ring-2 focus:ring-brand-600 text-xs"
                                            >
                                                Transfer
                                            </button>
                                        </div>
                                    </td>
                                );
                            }
                            if (header.column == "actions") {
                                return (
                                    <td className="px-6 py-1" key={index}>
                                        <div className="flex items-center justify-end gap-2">
                                            {!item.processed_by && (
                                                <button
                                                    data-id={item.id}
                                                    onClick={processData}
                                                    className="px-2 py-2 bg-yellow-500 rounded-lg text-white hover:bg-yellow-600 focus:bg-yellow-700 focus:ring-2 focus:ring-yellow-600 text-xs disabled:cursor-not-allowed"
                                                >
                                                    Proccess
                                                </button>
                                            )}

                                            {!item.closed_at &&
                                                item.processed_by && (
                                                    <button
                                                        data-id={item.id}
                                                        onClick={
                                                            onShowApproveHandler
                                                        }
                                                        className="px-2 py-2 bg-green-500 rounded-lg text-white hover:bg-green-600 focus:bg-green-700 focus:ring-2 focus:ring-green-600 text-xs"
                                                    >
                                                        Closed
                                                    </button>
                                                )}
                                            {!item.closed_at && (
                                                <button
                                                    data-id={item.id}
                                                    onClick={
                                                        onShowRejectHandler
                                                    }
                                                    className="px-2 py-2 bg-red-500 rounded-lg text-white hover:bg-red-600 focus:bg-red-700 focus:ring-2 focus:ring-red-600 text-xs"
                                                >
                                                    Rejected
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                );
                            }
                            if (header.column == "document") {
                                return (
                                    <td className="px-6 py-1" key={index}>
                                        <div className="flex justify-center">
                                            <a
                                                className="p-2 border-gray-500 border rounded-lg hover:bg-gray-500 hover:text-white shadow focus:ring focus:ring-gray-400 focus:bg-gray-600 focus:text-white"
                                                target={"_blank"}
                                                href={route(
                                                    "eclaim.exportpdf",
                                                    item.ticket_id
                                                )}
                                            >
                                                <BsFillCloudDownloadFill />
                                            </a>
                                        </div>
                                    </td>
                                );
                            }
                            if (header.formater == "date") {
                                return (
                                    <td className="px-6 py-1" key={index}>
                                        {item[header.column]
                                            ? dayjs(item[header.column]).format(
                                                  "DD/MM/YYYY"
                                              )
                                            : ""}
                                    </td>
                                );
                            }
                            if (header.formater == "currency") {
                                return (
                                    <td className="px-6 py-1" key={index}>
                                        <NumericFormat
                                            value={item[header.column]}
                                            displayType={"text"}
                                            thousandSeparator={","}
                                            prefix={"Rp. "}
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
        );
    };

    const [showApproveModal, setShowApproveModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [showDetail, setShowDetail] = useState(false);

    const onShowApproveHandler = (e) => {
        setShowApproveModal({
            show: true,
            id: e.target.getAttribute("data-id"),
        });
    };

    const onShowRejectHandler = (e) => {
        setShowRejectModal({
            show: true,
            id: e.target.getAttribute("data-id"),
        });
    };

    const onClosedApproveModal = () => {
        setShowApproveModal(false);
    };

    const onClosedRejectModal = () => {
        setShowRejectModal(false);
    };

    const showDetailHandler = (params) => {
        setShowDetail({
            id: params,
            show: true,
        });
    };

    const closedDetailModal = () => {
        setShowDetail(false);
    };

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
                        <a
                            className={`transition ease-in-out duration-150 bg-blue-500 disabled:hover:bg-blue-800 hover:bg-blue-700 focus:bg-blue-600 active:bg-blue-900 focus:ring-blue-500 disabled:cursor-not-allowed flex gap-2 items-center px-4 py-2 border border-transparent rounded-md font-semibold text-xs text-white tracking-widest focus:outline-none focus:ring-2 hover:cursor-pointer`}
                            as="button"
                            target="_blank"
                            href={route("claim.customer")}
                        >
                            Create
                        </a>
                    </div>
                </>
            }
        >
            <ContentWrap>
                <ImageShow
                    imgs={imgs}
                    show={showModalImg}
                    onClosed={onClosed}
                />
                <ApproveModal
                    params={showApproveModal}
                    closeModal={onClosedApproveModal}
                />

                <RejectedModal
                    params={showRejectModal}
                    closeModal={onClosedRejectModal}
                />
                <Detail params={showDetail} closedModal={closedDetailModal} />
                <MyTables
                    header={header}
                    datefilter={"created_at"}
                    editable={true}
                    data={tbodyGenerate()}
                    filters={filters}
                    sendFilter={handleFilters}
                    decrementFiter={decrementFiter}
                />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </ContentWrap>
        </Authenticated>
    );
};

export default Index;
