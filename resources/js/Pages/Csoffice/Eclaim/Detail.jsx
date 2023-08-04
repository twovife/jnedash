import MiniLoading from "@/Components/MiniLoading";
import Modal from "@/Components/Modal";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";

export default function Detail({ params, closedModal }) {
    const { id, show } = params;
    const [value, setValue] = useState(1);
    const [detail, setDetail] = useState();

    async function fetchMyApi() {
        let { data } = await axios(route("csoffice.claim.show", id)).then(
            (data) => data
        );
        setDetail(data);
    }

    useEffect(() => {
        if (show) {
            fetchMyApi();
        }
    }, [id]);

    const onModalClosed = () => {
        setDetail();
        closedModal();
    };
    return (
        <Modal
            show={show}
            maxWidth={"4xl"}
            onClose={onModalClosed}
            className={`bg-transparent h-full`}
        >
            <div className="p-7 bg-white dark:bg-gray-800 h-full rounded-lg overflow-y-auto">
                {detail ? (
                    <>
                        <div className="relative shadow-md rounded">
                            <p className="text-gray-700 dark:text-gray-400 py-3 font-semibold">
                                Pelapor
                            </p>
                            <div className="overflow-x-auto">
                                <table className="w-full text-xs text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
                                        <tr className="bg-gray-200">
                                            <th
                                                scope="col"
                                                className="py-3 px-6 whitespace-nowrap"
                                            >
                                                Ticket ID
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6 whitespace-nowrap"
                                            >
                                                Case
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6 whitespace-nowrap"
                                            >
                                                Pelapor
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6 whitespace-nowrap"
                                            >
                                                Alamat Pelapor
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6 whitespace-nowrap"
                                            >
                                                Email Pelapor
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6 whitespace-nowrap"
                                            >
                                                Telp Pelapor
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6 whitespace-nowrap"
                                            >
                                                Ktp Pelapor
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6 whitespace-nowrap"
                                            >
                                                Rekening Pelapor
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6 whitespace-nowrap"
                                            >
                                                Bank - Cabang Pelapor
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6 whitespace-nowrap"
                                            >
                                                Nama Rekening Pelapor
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                            <td className="odd:bg-gray-100 py-4 px-6">
                                                {detail.ticket_id}
                                            </td>
                                            <td className="odd:bg-gray-100 py-4 px-6">
                                                {detail.case}
                                            </td>
                                            <td className="odd:bg-gray-100 py-4 px-6 whitespace-nowrap">
                                                {detail.complainant}
                                            </td>
                                            <td className="odd:bg-gray-100 py-4 px-6">
                                                {detail.complainant_addr}
                                            </td>
                                            <td className="odd:bg-gray-100 py-4 px-6">
                                                {detail.complainant_email}
                                            </td>
                                            <td className="odd:bg-gray-100 py-4 px-6">
                                                {detail.complainant_number}
                                            </td>
                                            <td className="odd:bg-gray-100 py-4 px-6">
                                                {
                                                    detail.complainant_idcard_number
                                                }
                                            </td>
                                            <td className="odd:bg-gray-100 py-4 px-6">
                                                {detail.complainant_bank_number}
                                            </td>
                                            <td className="odd:bg-gray-100 py-4 px-6">
                                                {detail.complainant_bank_name}
                                                &nbsp;-&nbsp;
                                                {detail.complainant_bank_branch}
                                            </td>
                                            <td className="odd:bg-gray-100 py-4 px-6">
                                                {
                                                    detail.complainant_bank_username
                                                }
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="relative shadow-md rounded mt-3">
                            <p className="text-gray-700 dark:text-gray-400 py-3 font-semibold">
                                Detail Kiriman
                            </p>
                            <div className="overflow-x-auto">
                                <table className="w-full text-xs text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
                                        <tr className="bg-gray-200">
                                            <th
                                                scope="col"
                                                className="py-3 px-6 whitespace-nowrap"
                                            >
                                                Nomor Resi
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6 whitespace-nowrap"
                                            >
                                                Tanggal Resi
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
                                                Nama Shipper
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6 whitespace-nowrap"
                                            >
                                                Alamat Shipper
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6 whitespace-nowrap"
                                            >
                                                Telp Shipper
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6 whitespace-nowrap"
                                            >
                                                Nama Consignee
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6 whitespace-nowrap"
                                            >
                                                Alamat Consignee
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6 whitespace-nowrap"
                                            >
                                                Telp Consignee
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6 whitespace-nowrap"
                                            >
                                                ID Customer
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6 whitespace-nowrap"
                                            >
                                                Nama Customer
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6 whitespace-nowrap"
                                            >
                                                Detail Barang
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                            <td className="odd:bg-gray-100 py-4 px-6">
                                                {detail.cnote.connote}
                                            </td>
                                            <td className="odd:bg-gray-100 py-4 px-6">
                                                {dayjs(
                                                    detail.cnote.connote_date
                                                ).format("DD/MM/YYYY")}
                                            </td>
                                            <td className="odd:bg-gray-100 py-4 px-6">
                                                {detail.cnote.origin}
                                            </td>
                                            <td className="odd:bg-gray-100 py-4 px-6">
                                                {detail.cnote.destination}
                                            </td>
                                            <td className="odd:bg-gray-100 py-4 px-6">
                                                {detail.cnote.shipper_name}
                                            </td>
                                            <td className="odd:bg-gray-100 py-4 px-6">
                                                {detail.cnote.shipper_city}
                                            </td>
                                            <td className="odd:bg-gray-100 py-4 px-6">
                                                {detail.cnote.shipper_phone}
                                            </td>
                                            <td className="odd:bg-gray-100 py-4 px-6">
                                                {detail.cnote.receiver_name}
                                            </td>
                                            <td className="odd:bg-gray-100 py-4 px-6">
                                                {detail.cnote.receiver_city}
                                            </td>
                                            <td className="odd:bg-gray-100 py-4 px-6">
                                                {detail.cnote.receiver_phone}
                                            </td>
                                            <td className="odd:bg-gray-100 py-4 px-6">
                                                {detail.cnote.customer}
                                            </td>
                                            <td className="odd:bg-gray-100 py-4 px-6">
                                                {detail.cnote.customer_name}
                                            </td>
                                            <td className="odd:bg-gray-100 py-4 px-6">
                                                {detail.cnote.goods_description}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="overflow-x-auto mt-3">
                                <table className="w-full text-xs text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
                                        <tr className="bg-gray-200">
                                            <th
                                                scope="col"
                                                className="py-3 px-6 whitespace-nowrap"
                                            >
                                                Servis
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6 whitespace-nowrap"
                                            >
                                                Tipe Pembayaran
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6 whitespace-nowrap"
                                            >
                                                Qty
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6 whitespace-nowrap"
                                            >
                                                Berat
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6 whitespace-nowrap"
                                            >
                                                Harga Barang
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6 whitespace-nowrap"
                                            >
                                                Paking Kayu
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6 whitespace-nowrap"
                                            >
                                                Pihak Packing
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6 whitespace-nowrap"
                                            >
                                                Penawaran Packing
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6 whitespace-nowrap"
                                            >
                                                Asuransi
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6 whitespace-nowrap"
                                            >
                                                Penawaran Asuransi
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6 whitespace-nowrap"
                                            >
                                                Total Asuransi
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6 whitespace-nowrap"
                                            >
                                                Claim Propose
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6 whitespace-nowrap"
                                            >
                                                Claim Approve
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                            <td className="odd:bg-gray-100 py-4 px-6">
                                                {detail.cnote.services_code}
                                            </td>
                                            <td className="odd:bg-gray-100 py-4 px-6">
                                                {detail.cnote.payment_type}
                                            </td>
                                            <td className="odd:bg-gray-100 py-4 px-6">
                                                {detail.cnote.qty}
                                            </td>
                                            <td className="odd:bg-gray-100 py-4 px-6">
                                                {detail.cnote.weight}
                                            </td>
                                            <td className="odd:bg-gray-100 py-4 px-6">
                                                <NumericFormat
                                                    value={detail.cnote.amount}
                                                    displayType={"text"}
                                                    thousandSeparator={","}
                                                    prefix={"Rp. "}
                                                />
                                            </td>
                                            <td className="odd:bg-gray-100 py-4 px-6 uppercase">
                                                {detail.packing}
                                            </td>
                                            <td className="odd:bg-gray-100 py-4 px-6 uppercase">
                                                {detail.packer}
                                            </td>
                                            <td className="odd:bg-gray-100 py-4 px-6 uppercase">
                                                {detail.penawaran_packing}
                                            </td>
                                            <td className="odd:bg-gray-100 py-4 px-6 uppercase">
                                                {detail.asuransi}
                                            </td>
                                            <td className="odd:bg-gray-100 py-4 px-6 uppercase">
                                                {detail.penawaran_asuransi}
                                            </td>
                                            <td className="odd:bg-gray-100 py-4 px-6">
                                                <NumericFormat
                                                    value={
                                                        detail.cnote
                                                            .insurance_value
                                                    }
                                                    displayType={"text"}
                                                    thousandSeparator={","}
                                                    prefix={"Rp. "}
                                                />
                                            </td>
                                            <td className="odd:bg-gray-100 py-4 px-6">
                                                <NumericFormat
                                                    value={detail.claim_propose}
                                                    displayType={"text"}
                                                    thousandSeparator={","}
                                                    prefix={"Rp. "}
                                                />
                                            </td>
                                            <td className="odd:bg-gray-100 py-4 px-6">
                                                <NumericFormat
                                                    value={
                                                        detail.claim_approved
                                                    }
                                                    displayType={"text"}
                                                    thousandSeparator={","}
                                                    prefix={"Rp. "}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="relative shadow-md rounded mt-3">
                            <p className="text-gray-700 dark:text-gray-400 py-3 font-semibold">
                                Claim Process
                            </p>
                            <div className="overflow-x-auto">
                                <table className="w-full text-xs text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
                                        <tr className="bg-gray-200">
                                            <th
                                                scope="col"
                                                className="py-3 px-6 whitespace-nowrap"
                                            >
                                                Status Claim
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6 whitespace-nowrap"
                                            >
                                                Processed At
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6 whitespace-nowrap"
                                            >
                                                Closed At
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
                                                Status SLA
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6 whitespace-nowrap"
                                            >
                                                PIC Process
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6 whitespace-nowrap"
                                            >
                                                PIC Closed
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6 whitespace-nowrap"
                                            >
                                                Catatan
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6 whitespace-nowrap"
                                            >
                                                Penyelesaian
                                            </th>
                                            <th
                                                scope="col"
                                                className="py-3 px-6 whitespace-nowrap"
                                            >
                                                Pembebanan
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                            <td className="odd:bg-gray-100 py-4 px-6">
                                                {detail.status}
                                            </td>
                                            <td className="odd:bg-gray-100 py-4 px-6">
                                                {detail.processed_at
                                                    ? dayjs(
                                                          detail.processed_at
                                                      ).format("DD/MM/YYYY")
                                                    : ""}
                                            </td>
                                            <td className="odd:bg-gray-100 py-4 px-6 whitespace-nowrap">
                                                {detail.closed_at
                                                    ? dayjs(
                                                          detail.closed_at
                                                      ).format("DD/MM/YYYY")
                                                    : ""}
                                            </td>
                                            <td className="odd:bg-gray-100 py-4 px-6">
                                                {detail.sla
                                                    ? dayjs(detail.sla).format(
                                                          "DD/MM/YYYY"
                                                      )
                                                    : ""}
                                            </td>
                                            <td className="odd:bg-gray-100 py-4 px-6">
                                                {detail.status_sla}
                                            </td>
                                            <td className="odd:bg-gray-100 py-4 px-6">
                                                {detail.processedby.username}
                                            </td>
                                            <td className="odd:bg-gray-100 py-4 px-6">
                                                {detail.closedby.username}
                                            </td>
                                            <td className="odd:bg-gray-100 py-4 px-6">
                                                {detail.reason}
                                            </td>
                                            <td className="odd:bg-gray-100 py-4 px-6">
                                                {detail.penyelesaian}
                                            </td>
                                            <td className="odd:bg-gray-100 py-4 px-6">
                                                {detail.pembebanan}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="relative h-full">
                        <MiniLoading show={true} />
                    </div>
                )}
            </div>
        </Modal>
    );
}
