import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/inertia-react";
import dayjs from "dayjs";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

export default function Tables({ data }) {
    const claim = data;
    const [q, setQ] = useState("");
    const [dataId, setDataId] = useState();
    const [proccessData, setProccessData] = useState(false);

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

    return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <div className="pb-4 bg-white dark:bg-gray-800 flex flex-col lg:flex-row justify-start items-center">
                <div className="relative mt-1 w-full lg:w-auto">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <AiOutlineSearch />
                    </div>
                    <TextInput
                        onChange={(e) => setQ(e.target.value)}
                        value={q}
                        type="text"
                        name="cnote"
                        className="mt-1 w-full lg:w-80 pl-10 text-gray-600"
                        required
                    />
                </div>
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            ID Ticketing
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Created
                        </th>
                        <th scope="col" className="py-3 px-6">
                            AWB / Resi
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Origin
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Destination
                        </th>
                        <th scope="col" className="py-3 px-6">
                            SLA
                        </th>
                    </tr>
                </thead>

                {claim ? (
                    <tbody>
                        {search(claim).map((data, key) => (
                            <tr key={key}>
                                <td className="py-3 px-6">{data.ticket_id}</td>
                                <td className="py-3 px-6">
                                    {dayjs(data.created_at).format(
                                        "DD-MM-YYYY"
                                    )}
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
                                <td className="py-3 px-6">
                                    {dayjs(data.created_at)
                                        .add(6, "day")
                                        .format("DD-MM-YYYY")}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                ) : (
                    <tbody>
                        <tr>
                            <td className="py-3 px-6" colSpan={7}>
                                Data tidak ditemukan
                            </td>
                        </tr>
                    </tbody>
                )}
            </table>
        </div>
    );
}
