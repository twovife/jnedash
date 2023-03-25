import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

const FollowUpModal = ({ show, onModalClosed, userLogin }) => {
    const { isShow, id } = show;
    const [details, setDetails] = useState({});
    const { data, setData, post, processing, errors, reset } = useForm({
        complain_id: "",
        comment: "",
    });

    async function fetchMyApi() {
        const { data } = await axios(route("api.ecare.getcomments", id)).then(
            (data) => data
        );
        setDetails(data);
    }

    useEffect(() => {
        if (isShow) {
            fetchMyApi();
        }
        setData("complain_id", id);
    }, [id]);

    const setValues = (event) => {
        setData(event.target.name, event.target.value);
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        console.log(data);
        post(route("ecare.commentstore"));
        fetchMyApi();
    };

    const modalClosed = (e) => {
        setDetails({});
        reset();
        onModalClosed();
    };

    const statusCase = [
        { id: 1, value: "open", display: "open" },
        { id: 2, value: "process", display: "process" },
        { id: 3, value: "close", display: "close" },
    ];

    return (
        <Modal
            show={isShow}
            maxWidth={"2xl"}
            onClose={modalClosed}
            className={`bg-transparent h-full`}
        >
            <div className="p-7 bg-white dark:bg-gray-800 h-full rounded-lg overflow-y-auto">
                <h1 className="text-xl mb-3">Follow Up Ticketing CS</h1>
                <form onSubmit={onSubmitForm}>
                    <div className="grid grid-cols-4 mt-2 gap-2">
                        <div className="col-span-3">
                            <InputLabel value={"Follow Up"} />
                            <TextInput
                                className={"block w-full mt-1"}
                                name={"comment"}
                                onChange={setValues}
                            />
                        </div>
                        <div className="col-span-1">
                            <InputLabel value={"Follow Up"} />
                            <SelectList
                                options={statusCase}
                                className={"block w-full mt-1"}
                                name={"status"}
                                nullValue={true}
                                onChange={setValues}
                                required
                            />
                        </div>
                    </div>
                    <div className="w-full mt-2">
                        <PrimaryButton
                            type="submit"
                            className="ml-auto"
                            title={"Submit"}
                        />
                    </div>
                </form>
                <div className="mt-5">
                    <h1 className="text-lg">Detail Follow-Up</h1>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th
                                    scope="col"
                                    className="whitespace-nowrap text-center py-3 px-6"
                                >
                                    Tanggal
                                </th>
                                <th
                                    scope="col"
                                    className="whitespace-nowrap text-center py-3 px-6"
                                >
                                    Follow Up
                                </th>
                                <th
                                    scope="col"
                                    className="whitespace-nowrap text-center py-3 px-6"
                                >
                                    Follow Up By
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {details.length ? (
                                details.map((item) => (
                                    <tr key={item.id}>
                                        <td className="text-center">
                                            {dayjs(item.created_at).format(
                                                "DD-MM-YYYY"
                                            )}
                                        </td>
                                        <td className="text-center">
                                            {item.comment}
                                        </td>
                                        <td className="text-center">
                                            {item.user_comment}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="text-center" colSpan={3}>
                                        Belum ada data follow up
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Modal>
    );
};

export default FollowUpModal;
