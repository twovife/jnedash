import ImageShow from "@/Components/ImageShow";
import Modal from "@/Components/Modal";
import Paginate from "@/Components/Paginate";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/inertia-react";
import dayjs from "dayjs";
import React, { useState } from "react";
import { BsFillCloudDownloadFill } from "react-icons/bs";

export default function OpenTables({ datas, onFilterChange, filterValue }) {
    const { total, from, to, next_page_url, prev_page_url } = datas;
    const [dataId, setDataId] = useState();
    const [showModalProccess, setShowModalProccess] = useState(false);
    const { put, processing, error, reset } = useForm();
    const [imgs, setImgs] = useState();
    const [showModalImg, setShowModalImg] = useState(false);

    const onClickProccess = (e) => {
        e.preventDefault();
        put(route("eclaim.processdata", dataId), {
            preserveScroll: true,
            onSuccess: (visit) => {
                closeModal();
            },
            onError: () => closeModal(),
            onFinish: () => reset(),
        });
    };

    const onHandlerModalClick = (e, id) => {
        setDataId(id);
        setShowModalProccess(true);
    };

    const closeModal = () => {
        setShowModalProccess(false);
        reset();
    };

    const onHandleImageClick = (e) => {
        setImgs(e.target.getAttribute("data-url"));
        setShowModalImg(true);
    };

    const onClosed = (e) => {
        setImgs("");
        setShowModalImg(false);
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
                            onChange={onFilterChange}
                            type="text"
                            id="table-search"
                            value={filterValue}
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
                                    SLA
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
                                <th
                                    scope="col"
                                    className="whitespace-nowrap text-center py-3 px-6"
                                >
                                    Action
                                </th>
                            </tr>
                        </thead>

                        {datas.data ? (
                            <tbody className="relative z-10">
                                {datas.data.map((claim) => (
                                    <tr key={claim.id}>
                                        <td className="py-3 px-6">
                                            {claim.ticket_id}
                                        </td>
                                        <td className="text-center py-3 px-6">
                                            {dayjs(claim.created_at).format(
                                                "DD-MM-YYYY"
                                            )}
                                        </td>
                                        <td className="py-3 px-6">
                                            {claim.cnote.connote}
                                        </td>
                                        <td className="text-center py-3 px-6">
                                            {claim.cnote.shipper.origin}
                                        </td>
                                        <td className="text-center py-3 px-6">
                                            {claim.cnote.receiver.destination}
                                        </td>
                                        <td className="whitespace-nowrap text-center py-3 px-6">
                                            {dayjs(claim.created_at)
                                                .add(6, "day")
                                                .format("DD-MM-YYYY")}
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
                                        <td className="text-center py-3 px-6">
                                            <PrimaryButton
                                                theme="warning"
                                                type={"button"}
                                                onClick={(e) =>
                                                    onHandlerModalClick(
                                                        e,
                                                        claim.id
                                                    )
                                                }
                                            >
                                                Process
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
                                        {loading
                                            ? "Loading . . ."
                                            : "Data Tidak Ditemukan"}
                                    </td>
                                </tr>
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
            <Paginate
                dataFrom={from}
                dataTo={to}
                dataTotal={total}
                linkPrev={prev_page_url}
                linkNext={next_page_url}
            />

            <ImageShow imgs={imgs} show={showModalImg} onClosed={onClosed} />

            <Modal
                show={showModalProccess}
                maxWidth={"md"}
                onClose={closeModal}
                closeable={processing ? false : true}
            >
                <form className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 text-center">
                        Apakah Anda ingin memproses Claim ini ?
                    </h2>
                    <div className="mt-4 flex justify-center items-center gap-4">
                        <PrimaryButton
                            type="button"
                            theme="success"
                            onClick={onClickProccess}
                            processing={processing}
                        >
                            Ya, Proses data claim ini !
                        </PrimaryButton>
                        <PrimaryButton
                            type="button"
                            theme="danger"
                            onClick={() => setShowModalProccess(false)}
                            processing={processing}
                        >
                            Tidak
                        </PrimaryButton>
                    </div>

                    <div className="mt-6"></div>
                </form>
            </Modal>
        </>
    );
}
