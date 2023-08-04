import ContentWrap from "@/Components/ContentWrap";
import InputArea from "@/Components/InputArea";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import LinkButton from "@/Components/LinkButton";
import Loading from "@/Components/Loading";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { AiFillDelete } from "react-icons/ai";

const EditComplain = ({ auth, complain, ...props }) => {
    // console.log();

    const { sources, complaincase } = props;
    const [loading, setLoading] = useState(false);

    const { data, setData, put, processing, errors } = useForm({
        branch: complain.branch,
        complainsource_id: complain.complainsource_id,
        caller_category: complain.caller_category ?? "",
        caller_sub_category: complain.caller_sub_category ?? "",
        caller_contact_name: complain.caller_contact_name ?? "",
        caller_contact_person: complain.caller_contact_person ?? "",
        resi: complain.cnote.connote,
        complain_case_id: complain.complain_case_id ?? "",
        zona: complain.zona,
        sla: complain.sla,
        due_date: dayjs(complain.due_date).format("DD/MM/YYYY"),
        case_priority: complain.case_priority,
        followup_by: complain.followup_by,
        note: complain.note,
    });

    const selectedComplain = complaincase.find(
        (item) => item.id == complain.complain_case_id
    );
    // console.log(selectedComplain);

    const resiInputRef = useRef();
    const handleReadOnly = (params) => {
        resiInputRef.current.readOnly = params;
    };

    const [zone, setZone] = useState("A");
    const [resiErrorStatus, setResiErrorStatus] = useState(false);
    const [dataResi, setDataResi] = useState("");

    const optsources = sources.map((item) => ({
        id: item.id,
        value: item.id,
        display:
            item.source == item.sub_source
                ? item.source
                : `${item.source} - ${item.sub_source}`,
    }));

    const getZone = async (e) => {
        setLoading(true);
        try {
            const halo = await axios.post(
                route("apiservices.traceconnote.detail-hybrid"),
                {
                    resi: data.resi,
                }
            );
            resetCategory();

            setZone(halo.data.zona);
            setDataResi(halo.data);
            setResiErrorStatus(false);
            handleReadOnly(true);
        } catch {
            setData("resi", "");
            setZone("A");
            setDataResi("");
            document.getElementById("resi").focus();
            setResiErrorStatus(true);
            console.error("eror lo");
        }

        setLoading(false);
    };

    let callers = props.callers.map((item) => ({
        id: item.id,
        value: item.id,
        display: item.caller,
    }));

    const sendingOffice = props.sendingoffices.map((item) => ({
        id: item.id,
        value: item.nomor_debitur,
        display:
            item.area == 1
                ? `KDR - ${item.nama_agen}`
                : item.area == 2
                ? `TLG - ${item.nama_agen}`
                : `TRG - ${item.nama_agen}`,
    }));

    const onChangeCallerHandler = (e) => {
        const valtarget = e.target.value;
        if (valtarget == 1) {
            const combineData = {
                ...data,
                caller_category: valtarget,
                caller_sub_category: "customer",
                caller_contact_name: "",
                caller_contact_person: "",
            };
            setData(combineData);
        }
        if (valtarget == 2) {
            const combineData = {
                ...data,
                caller_category: valtarget,
                caller_sub_category: "consignee",
                caller_contact_name: dataResi.receiver_name ?? "",
                caller_contact_person: dataResi.receiver_phone ?? "",
            };
            setData(combineData);
        }
        if (valtarget == 3) {
            const combineData = {
                ...data,
                caller_category: valtarget,
                caller_sub_category: "shipper",
                caller_contact_name: dataResi.shipper_name ?? "",
                caller_contact_person: dataResi.shipper_phone ?? "",
            };
            setData(combineData);
        }
        if (valtarget == 4) {
            const combineData = {
                ...data,
                caller_category: valtarget,
                caller_sub_category: "internal jne",
                caller_contact_name: "",
                caller_contact_person: "",
            };
            setData(combineData);
        }
        if (valtarget == 5) {
            const combineData = {
                ...data,
                caller_category: valtarget,
                caller_sub_category: "",
                caller_contact_name: "",
                caller_contact_person: "",
            };
            setData(combineData);
        }
        if (valtarget == 6) {
            const combineData = {
                ...data,
                caller_category: valtarget,
                caller_sub_category: "corporate",
                caller_contact_name: "",
                caller_contact_person: "",
            };
            setData(combineData);
        }
        if (!valtarget) {
            const combineData = {
                ...data,
                caller_category: "",
                caller_sub_category: "",
                caller_contact_name: "",
                caller_contact_person: "",
            };
            setData(combineData);
        }
    };

    const subCallerElement = () => {
        if (data.caller_category == 1) {
            return (
                <div className="mb-2">
                    <InputLabel value={"-"} />
                    <TextInput
                        className="block w-full mt-1"
                        value="Customer"
                        disabled
                    />
                </div>
            );
        }
        if (data.caller_category == 2) {
            return (
                <div className="mb-2">
                    <InputLabel value={"-"} />
                    <TextInput
                        className="block w-full mt-1"
                        value="Consignee"
                        disabled
                    />
                </div>
            );
        }
        if (data.caller_category == 3) {
            return (
                <div className="mb-2">
                    <InputLabel value={"-"} />
                    <TextInput
                        className="block w-full mt-1"
                        value="Shipper"
                        disabled
                    />
                </div>
            );
        }
        if (data.caller_category == 4) {
            return (
                <div className="mb-2">
                    <InputLabel value={"-"} />
                    <TextInput
                        className="block w-full mt-1"
                        value="Internal JNE"
                        disabled
                    />
                </div>
            );
        }
        if (data.caller_category == 5) {
            return (
                <div className="mb-2">
                    <InputLabel value={"-"} />
                    <SelectList
                        required
                        className="block w-full mt-1"
                        options={sendingOffice}
                        nullvalue={true}
                        name={"caller_sub_category"}
                        onChange={setValues}
                        value={data.caller_sub_category}
                    />
                </div>
            );
        }
        if (data.caller_category == 6) {
            return (
                <div className="mb-2">
                    <InputLabel value={"-"} />
                    <TextInput
                        className="block w-full mt-1"
                        value="Corporate"
                        disabled
                    />
                </div>
            );
        }
        if (!data.caller_category) {
            return null;
        }
    };

    // cases fungtion
    const [valCategory, setValCategory] = useState(
        selectedComplain ? selectedComplain.category : ""
    );
    const [valCase, setValCase] = useState(
        selectedComplain ? selectedComplain.case : ""
    );

    const categoryList = () => {
        const filter = props.complaincase.filter((item) => item.zona == zone);
        const uniq = [...new Set(filter.map((item) => item.category))];
        const optionVal = uniq.map((item) => ({
            id: item,
            value: item,
            display: item,
        }));
        return (
            <div className="col-span-2">
                <InputLabel value={"Category"} />
                <SelectList
                    className={"w-full mt-1"}
                    nullvalue={true}
                    required
                    value={valCategory}
                    onChange={onCategoryChangeHandler}
                    options={optionVal}
                />
            </div>
        );
    };

    const onCategoryChangeHandler = (e) => {
        setValCategory(e.target.value);
    };

    const caseList = () => {
        const filter = props.complaincase.filter(
            (item) => item.zona == zone && item.category == valCategory
        );
        const uniq = [...new Set(filter.map((item) => item.case))];
        const optionVal = uniq.map((item) => ({
            id: item,
            value: item,
            display: item,
        }));
        return (
            <div className="col-span-2">
                <InputLabel optional={true} value={"Case"} />
                <SelectList
                    className={"w-full mt-1"}
                    nullvalue={true}
                    required
                    onChange={onCaseChangeHandler}
                    value={valCase}
                    options={optionVal}
                />
            </div>
        );
    };

    const onCaseChangeHandler = (e) => {
        setValCase(e.target.value);
    };

    const subCaseList = () => {
        const filter = props.complaincase.filter(
            (item) =>
                item.zona == zone &&
                item.category == valCategory &&
                item.case == valCase
        );
        const optionVal = filter.map((item) => ({
            id: item.id,
            value: item.id,
            display: `${item.sub_case}`,
        }));
        return (
            <div className="col-span-2">
                <InputLabel optional={true} value={"Sub Case"} />
                <SelectList
                    className={"w-full mt-1"}
                    nullvalue={true}
                    required
                    value={data.complain_case_id}
                    onChange={onSubCaseChangeHandler}
                    options={optionVal}
                />
            </div>
        );
    };

    const onSubCaseChangeHandler = (e) => {
        const filter = props.complaincase.filter(
            (item) => item.id == e.target.value
        );

        console.log(filter);
        const combineData = {
            ...data,
            complain_case_id: filter[0].id,
            zona: filter[0].zona,
            sla: filter[0].sla,
            due_date:
                filter[0].sla == 0
                    ? dayjs().format("DD/MM/YYYY")
                    : dayjs().add(filter[0].sla, "day").format("DD/MM/YYYY"),
        };

        setData(combineData);
    };

    const resetCategory = () => {
        setValCategory("");
        setValCase("");
        const combineData = {
            ...data,
            complain_case_id: "",
            zona: "",
            sla: "",
            due_date: "",
        };

        setData(combineData);
    };

    const setValues = (event) => {
        setData(event.target.name, event.target.value);
    };

    // const onHandleCurencyChange = (value, name) => {
    //     setData(name, value);
    // };

    const priorityList = [
        { id: 1, value: "critical", display: "critical" },
        { id: 2, value: "hight", display: "high" },
        { id: 3, value: "medium", display: "medium" },
        { id: 4, value: "low", display: "low" },
    ];

    const followupbys = props.followups.map((item) => ({
        id: item.name,
        value: item.name,
        display: item.name,
    }));

    const submitForm = (e) => {
        e.preventDefault();
        put(route("csoffice.complain.update", complain.id));
        // console.log(data);
    };

    // console.log(data);

    return (
        <Authenticated
            auth={auth}
            header={
                <>
                    <h2 className="font-semibold text-lg text-gray-800 dark:text-white leading-tight">
                        Action Claim
                    </h2>
                    <Head title="Approve Claim" />
                    <div className="ml-auto flex items-center justify-center">
                        <LinkButton
                            href={route(
                                "csoffice.complain.destroy",
                                complain.id
                            )}
                            title={"Delete"}
                            theme="danger"
                            icon={<AiFillDelete />}
                        />
                    </div>
                </>
            }
        >
            <Loading show={loading} />
            <ContentWrap>
                <form onSubmit={submitForm}>
                    <div className="max-w-7xl mx-auto py-4 px-4 lg:px-0">
                        <h1 className="mb-2 text-lg">Input Data Ticketing</h1>
                        <div className="grid grid-cols-4 gap-x-4 mb-4">
                            <div className="mb-2">
                                <InputLabel value={"Branch"} />
                                <TextInput
                                    name="branch"
                                    disabled
                                    className="block w-full mt-1"
                                    value={data.branch}
                                />
                            </div>
                            <div className="mb-2">
                                <InputLabel value={"Source"} />
                                <SelectList
                                    required
                                    name={"complainsource_id"}
                                    id={"complainsource_id"}
                                    nullvalue={true}
                                    value={data.complainsource_id}
                                    className={"w-full mt-1"}
                                    options={optsources}
                                    onChange={setValues}
                                />
                                <InputError
                                    message={errors.complainsource_id}
                                    className="mt-1"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <h1 className="text-lg font-semibold text-gray-400 italic mb-3">
                                Isikan Jika Mempunyai Resi
                            </h1>
                            <div className="flex items-center justify-start gap-4">
                                <TextInput
                                    onChange={setValues}
                                    name={"resi"}
                                    id={"resi"}
                                    ref={resiInputRef}
                                    readOnly
                                    value={data.resi}
                                />
                            </div>
                            {resiErrorStatus && (
                                <InputError
                                    message={
                                        "Resi Salah, Periksa Resi Anda Lagi"
                                    }
                                    className="mt-1"
                                />
                            )}
                        </div>

                        <div className="grid grid-cols-4 gap-x-4 mb-4">
                            <div className="mb-2">
                                <InputLabel value={"Caller"} />
                                <SelectList
                                    className="block w-full mt-1"
                                    name={"caller_category"}
                                    options={callers}
                                    required
                                    onChange={onChangeCallerHandler}
                                    nullvalue={true}
                                    value={data.caller_category}
                                />
                                <InputError
                                    message={errors.caller_category}
                                    className="mt-1"
                                />
                            </div>
                            {subCallerElement()}
                            <div className="mb-2">
                                <InputLabel
                                    optional={true}
                                    value={"Caller Name"}
                                />
                                <TextInput
                                    name="caller_contact_name"
                                    onChange={setValues}
                                    value={data.caller_contact_name}
                                    className="block w-full mt-1"
                                />
                            </div>
                            <div className="mb-2">
                                <InputLabel
                                    optional={true}
                                    value={"Caller CP"}
                                />
                                <TextInput
                                    name="caller_contact_person"
                                    onChange={setValues}
                                    value={data.caller_contact_person}
                                    className="block w-full mt-1"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-8 gap-2 mb-4">
                            {categoryList()}
                            {valCategory && caseList()}
                            {valCase && subCaseList()}

                            <div className="col-span-1">
                                <InputLabel value={"SLA"} />
                                <TextInput
                                    className={"mt-1 block w-full"}
                                    value={data.sla}
                                    disabled
                                />
                            </div>
                            <div className="col-span-1">
                                <InputLabel value={"Zone"} />
                                <TextInput
                                    className={"mt-1 block w-full"}
                                    disabled
                                    value={data.zona}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-8 gap-2 mb-4">
                            <div className="col-span-2">
                                <InputLabel value={"Case Priority"} />
                                <SelectList
                                    className={"w-full mt-1"}
                                    name={"case_priority"}
                                    options={priorityList}
                                    nullvalue={true}
                                    value={data.case_priority}
                                    onChange={setValues}
                                    required
                                />
                            </div>
                            <div className="col-span-1">
                                <InputLabel value={"Due Date"} />
                                <TextInput
                                    className={"mt-1 block w-full"}
                                    value={data.due_date}
                                    disabled
                                />
                            </div>
                            <div className="col-span-2">
                                <InputLabel value={"Followup By"} />
                                <SelectList
                                    className={"w-full mt-1"}
                                    name={"followup_by"}
                                    options={followupbys}
                                    value={data.followup_by}
                                    onChange={setValues}
                                    nullvalue={true}
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-8 gap-2">
                            <div className="col-span-3">
                                <InputLabel value={"Note"} optional={true} />
                                <InputArea
                                    name={"note"}
                                    value={data.note}
                                    id={"note"}
                                    className={"mt-1 block w-full"}
                                    onChange={setValues}
                                />
                            </div>
                        </div>
                        <div className="w-full text-right flex gap-3">
                            <PrimaryButton
                                disabled={processing}
                                className="ml-auto"
                                type={"submit"}
                                title={"submit"}
                            />
                        </div>
                    </div>
                </form>
            </ContentWrap>
        </Authenticated>
    );
};

export default EditComplain;
