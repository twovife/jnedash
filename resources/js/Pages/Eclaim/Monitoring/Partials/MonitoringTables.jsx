import ImageShow from "@/Components/ImageShow";
import InputLabel from "@/Components/InputLabel";
import Paginate from "@/Components/Paginate";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import dayjs from "dayjs";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiDownload, BiSearch } from "react-icons/bi";
import { NumericFormat } from "react-number-format";

export default function MonitoringTables({
    datas,
    onFilterChange,
    onFilterInputChange,
    onDownloadFile,
    searchParams,
}) {
    const { total, from, to, next_page_url, prev_page_url } = datas;
    const [imgs, setImgs] = useState();
    const [showModalImg, setShowModalImg] = useState(false);

    const onHandleImageClick = (e) => {
        setImgs(e.target.getAttribute("data-url"));
        setShowModalImg(true);
    };

    const onClosed = (e) => {
        setImgs("");
        setShowModalImg(false);
    };

    return (
        <div className="relative shadow-md sm:rounded-lg">
            <div className="flex  items-center w-full pb-4 bg-white dark:bg-gray-900 p-3 gap-4">
                <div>
                    <label htmlFor="table-search" className="sr-only">
                        Search
                    </label>
                    <div className="relative">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <AiOutlineSearch />
                        </div>
                        <TextInput
                            onChange={(e) => onFilterInputChange(e)}
                            name="search"
                            type="text"
                            id="table-search"
                            value={searchParams.search}
                            className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search for data"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                    <InputLabel value={"date from"} />
                    <input
                        onChange={(e) => onFilterInputChange(e)}
                        type={"date"}
                        name="datefrom"
                        value={searchParams.datefrom}
                        id="datefrom"
                        className="block p-2 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <InputLabel value={"date thru"} />
                    <input
                        onChange={(e) => onFilterInputChange(e)}
                        name="datethru"
                        id="datethru"
                        value={searchParams.datethru}
                        type={"date"}
                        className="block p-2 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                <div>
                    <PrimaryButton
                        onClick={onFilterChange}
                        type={"button"}
                        icon={<BiSearch />}
                        title={"Search"}
                    />
                </div>
                <div>
                    <PrimaryButton
                        onClick={onDownloadFile}
                        type={"button"}
                        icon={<BiDownload />}
                        title={"Download"}
                    />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-100">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th
                                scope="col"
                                className="text-center py-3 px-6 whitespace-nowrap"
                            >
                                Tanggal Ticketing
                            </th>
                            <th
                                scope="col"
                                className="text-center py-3 px-6 whitespace-nowrap"
                            >
                                Nomor Ticket
                            </th>
                            <th
                                scope="col"
                                className="text-center py-3 px-6 whitespace-nowrap"
                            >
                                Nomor Resi
                            </th>
                            <th
                                scope="col"
                                className="text-center py-3 px-6 whitespace-nowrap"
                            >
                                Origin
                            </th>
                            <th
                                scope="col"
                                className="text-center py-3 px-6 whitespace-nowrap"
                            >
                                Destination
                            </th>
                            <th
                                scope="col"
                                className="text-center py-3 px-6 whitespace-nowrap"
                            >
                                Service
                            </th>
                            <th
                                scope="col"
                                className="text-center py-3 px-6 whitespace-nowrap"
                            >
                                Shipper
                            </th>
                            <th
                                scope="col"
                                className="text-center py-3 px-6 whitespace-nowrap"
                            >
                                Shipper Telp
                            </th>
                            <th
                                scope="col"
                                className="text-center py-3 px-6 whitespace-nowrap"
                            >
                                Cnee
                            </th>
                            <th
                                scope="col"
                                className="text-center py-3 px-6 whitespace-nowrap"
                            >
                                Cnee Telp
                            </th>
                            <th
                                scope="col"
                                className="text-center py-3 px-6 whitespace-nowrap"
                            >
                                Pelapor
                            </th>
                            <th
                                scope="col"
                                className="text-center py-3 px-6 whitespace-nowrap"
                            >
                                Pelapor Telp
                            </th>
                            <th
                                scope="col"
                                className="text-center py-3 px-6 whitespace-nowrap"
                            >
                                Pelapor Email
                            </th>
                            <th
                                scope="col"
                                className="text-center py-3 px-6 whitespace-nowrap"
                            >
                                Case
                            </th>
                            <th
                                scope="col"
                                className="text-center py-3 px-6 whitespace-nowrap"
                            >
                                Good Description
                            </th>
                            <th
                                scope="col"
                                className="text-center py-3 px-6 whitespace-nowrap"
                            >
                                Nilai Barang
                            </th>
                            <th
                                scope="col"
                                className="text-center py-3 px-6 whitespace-nowrap"
                            >
                                Packing Kayu
                            </th>
                            <th
                                scope="col"
                                className="text-center py-3 px-6 whitespace-nowrap"
                            >
                                PIC Packing
                            </th>
                            <th
                                scope="col"
                                className="text-center py-3 px-6 whitespace-nowrap"
                            >
                                Penawaran Packing
                            </th>
                            <th
                                scope="col"
                                className="text-center py-3 px-6 whitespace-nowrap"
                            >
                                Asuransi
                            </th>
                            <th
                                scope="col"
                                className="text-center py-3 px-6 whitespace-nowrap"
                            >
                                Penawaran Asuransi
                            </th>
                            <th
                                scope="col"
                                className="text-center py-3 px-6 whitespace-nowrap"
                            >
                                Claim Propose
                            </th>
                            <th
                                scope="col"
                                className="text-center py-3 px-6 whitespace-nowrap"
                            >
                                Claim Approve
                            </th>
                            <th
                                scope="col"
                                className="text-center py-3 px-6 whitespace-nowrap"
                            >
                                Penyelesaian
                            </th>
                            <th
                                scope="col"
                                className="text-center py-3 px-6 whitespace-nowrap"
                            >
                                Pembebanan
                            </th>
                            <th
                                scope="col"
                                className="text-center py-3 px-6 whitespace-nowrap"
                            >
                                SLA
                            </th>
                            <th
                                scope="col"
                                className="text-center py-3 px-6 whitespace-nowrap"
                            >
                                Status SLA
                            </th>
                            <th
                                scope="col"
                                className="text-center py-3 px-6 whitespace-nowrap"
                            >
                                Status Claim
                            </th>
                            <th
                                scope="col"
                                className="text-center py-3 px-6 whitespace-nowrap"
                            >
                                Tanggal Processed
                            </th>
                            <th
                                scope="col"
                                className="text-center py-3 px-6 whitespace-nowrap"
                            >
                                PIC Processed
                            </th>
                            <th
                                scope="col"
                                className="text-center py-3 px-6 whitespace-nowrap"
                            >
                                Tanggal Closed
                            </th>
                            <th
                                scope="col"
                                className="text-center py-3 px-6 whitespace-nowrap"
                            >
                                PIC Closed
                            </th>
                            <th
                                scope="col"
                                className="text-center py-3 px-6 whitespace-nowrap"
                            >
                                Dokumen
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {datas.data
                            ? datas.data.map((claim) => (
                                  <tr
                                      key={claim.id}
                                      className="border-b border-gray-200 dark:border-gray-700"
                                  >
                                      <td className="py-4 px-6 odd:bg-gray-100 dark:odd:bg-gray-600 even:bg-gray-50 dark:even:bg-gray-500">
                                          {dayjs(claim.created_at).format(
                                              "DD/MM/YYYY"
                                          )}
                                      </td>
                                      <td className="py-4 px-6 odd:bg-gray-100 dark:odd:bg-gray-600 even:bg-gray-50 dark:even:bg-gray-500">
                                          {claim.ticket_id}
                                      </td>
                                      <td className="py-4 px-6 odd:bg-gray-100 dark:odd:bg-gray-600 even:bg-gray-50 dark:even:bg-gray-500">
                                          {claim.cnote.connote}
                                      </td>
                                      <td className="py-4 px-6 odd:bg-gray-100 dark:odd:bg-gray-600 even:bg-gray-50 dark:even:bg-gray-500">
                                          {claim.cnote.shipper.origin}
                                      </td>
                                      <td className="py-4 px-6 odd:bg-gray-100 dark:odd:bg-gray-600 even:bg-gray-50 dark:even:bg-gray-500">
                                          {claim.cnote.receiver.destination}
                                      </td>
                                      <td className="py-4 px-6 odd:bg-gray-100 dark:odd:bg-gray-600 even:bg-gray-50 dark:even:bg-gray-500">
                                          {claim.cnote.services_code}
                                      </td>
                                      <td className="py-4 px-6 odd:bg-gray-100 dark:odd:bg-gray-600 even:bg-gray-50 dark:even:bg-gray-500">
                                          {claim.cnote.shipper.shipper_name}
                                      </td>
                                      <td className="py-4 px-6 odd:bg-gray-100 dark:odd:bg-gray-600 even:bg-gray-50 dark:even:bg-gray-500">
                                          {claim.cnote.shipper.phone}
                                      </td>
                                      <td className="py-4 px-6 odd:bg-gray-100 dark:odd:bg-gray-600 even:bg-gray-50 dark:even:bg-gray-500">
                                          {claim.cnote.receiver.receiver_name}
                                      </td>
                                      <td className="py-4 px-6 odd:bg-gray-100 dark:odd:bg-gray-600 even:bg-gray-50 dark:even:bg-gray-500">
                                          {claim.cnote.receiver.phone}
                                      </td>
                                      <td className="py-4 px-6 odd:bg-gray-100 dark:odd:bg-gray-600 even:bg-gray-50 dark:even:bg-gray-500 whitespace-nowrap">
                                          {claim.complainant}
                                      </td>
                                      <td className="py-4 px-6 odd:bg-gray-100 dark:odd:bg-gray-600 even:bg-gray-50 dark:even:bg-gray-500">
                                          {claim.complainant_number}
                                      </td>
                                      <td className="py-4 px-6 odd:bg-gray-100 dark:odd:bg-gray-600 even:bg-gray-50 dark:even:bg-gray-500">
                                          {claim.complainant_email}
                                      </td>
                                      <td className="py-4 px-6 odd:bg-gray-100 dark:odd:bg-gray-600 even:bg-gray-50 dark:even:bg-gray-500">
                                          {claim.case}
                                      </td>
                                      <td className="py-4 px-6 odd:bg-gray-100 dark:odd:bg-gray-600 even:bg-gray-50 dark:even:bg-gray-500">
                                          {claim.cnote.goods_description}
                                      </td>
                                      <td className="py-4 px-6 odd:bg-gray-100 dark:odd:bg-gray-600 even:bg-gray-50 dark:even:bg-gray-500 text-right whitespace-nowrap">
                                          <NumericFormat
                                              value={claim.cnote.amount}
                                              displayType={"text"}
                                              thousandSeparator={","}
                                              prefix={"Rp. "}
                                          />
                                      </td>
                                      <td className="py-4 px-6 odd:bg-gray-100 dark:odd:bg-gray-600 even:bg-gray-50 dark:even:bg-gray-500">
                                          {claim.packing}
                                      </td>
                                      <td className="py-4 px-6 odd:bg-gray-100 dark:odd:bg-gray-600 even:bg-gray-50 dark:even:bg-gray-500">
                                          {claim.packer}
                                      </td>
                                      <td className="py-4 px-6 odd:bg-gray-100 dark:odd:bg-gray-600 even:bg-gray-50 dark:even:bg-gray-500">
                                          {claim.penawaran_packing}
                                      </td>
                                      <td className="py-4 px-6 odd:bg-gray-100 dark:odd:bg-gray-600 even:bg-gray-50 dark:even:bg-gray-500">
                                          {claim.asuransi}
                                      </td>
                                      <td className="py-4 px-6 odd:bg-gray-100 dark:odd:bg-gray-600 even:bg-gray-50 dark:even:bg-gray-500">
                                          {claim.penawaran_asuransi}
                                      </td>
                                      <td className="py-4 px-6 odd:bg-gray-100 dark:odd:bg-gray-600 even:bg-gray-50 dark:even:bg-gray-500 text-right whitespace-nowrap">
                                          <NumericFormat
                                              value={claim.claim_propose}
                                              displayType={"text"}
                                              thousandSeparator={","}
                                              prefix={"Rp. "}
                                          />
                                      </td>
                                      <td className="py-4 px-6 odd:bg-gray-100 dark:odd:bg-gray-600 even:bg-gray-50 dark:even:bg-gray-500 text-right whitespace-nowrap">
                                          <NumericFormat
                                              value={claim.claim_approved}
                                              displayType={"text"}
                                              thousandSeparator={","}
                                              prefix={"Rp. "}
                                          />
                                      </td>
                                      <td className="py-4 px-6 odd:bg-gray-100 dark:odd:bg-gray-600 even:bg-gray-50 dark:even:bg-gray-500">
                                          {claim.penyelesaian}
                                      </td>
                                      <td className="py-4 px-6 odd:bg-gray-100 dark:odd:bg-gray-600 even:bg-gray-50 dark:even:bg-gray-500">
                                          {claim.pembebanan}
                                      </td>
                                      <td className="py-4 px-6 odd:bg-gray-100 dark:odd:bg-gray-600 even:bg-gray-50 dark:even:bg-gray-500">
                                          {claim.sla}
                                      </td>
                                      <td className="py-4 px-6 odd:bg-gray-100 dark:odd:bg-gray-600 even:bg-gray-50 dark:even:bg-gray-500">
                                          {claim.status_sla ?? "sla"}
                                      </td>
                                      <td className="py-4 px-6 odd:bg-gray-100 dark:odd:bg-gray-600 even:bg-gray-50 dark:even:bg-gray-500">
                                          {claim.status}
                                      </td>
                                      <td className="py-4 px-6 odd:bg-gray-100 dark:odd:bg-gray-600 even:bg-gray-50 dark:even:bg-gray-500">
                                          {claim.processed_at
                                              ? dayjs(
                                                    claim.processed_at
                                                ).format("DD/MM/YYYY")
                                              : ""}
                                      </td>
                                      <td className="py-4 px-6 odd:bg-gray-100 dark:odd:bg-gray-600 even:bg-gray-50 dark:even:bg-gray-500">
                                          {claim.processedby
                                              ? claim.processedby.username
                                              : ""}
                                      </td>
                                      <td className="py-4 px-6 odd:bg-gray-100 dark:odd:bg-gray-600 even:bg-gray-50 dark:even:bg-gray-500 ">
                                          {claim.closed_at
                                              ? dayjs(claim.closed_at).format(
                                                    "DD/MM/YYYY"
                                                )
                                              : ""}
                                      </td>
                                      <td className="py-4 px-6 odd:bg-gray-100 dark:odd:bg-gray-600 even:bg-gray-50 dark:even:bg-gray-500">
                                          {claim.closedby
                                              ? claim.closedby.username
                                              : ""}
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
                                  </tr>
                              ))
                            : ""}
                    </tbody>
                </table>
            </div>
            <Paginate
                dataFrom={from}
                dataTo={to}
                dataTotal={total}
                linkPrev={prev_page_url}
                linkNext={next_page_url}
            />
            <ImageShow imgs={imgs} show={showModalImg} onClosed={onClosed} />
        </div>
    );
}
