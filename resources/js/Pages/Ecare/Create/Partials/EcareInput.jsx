import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import dayjs from "dayjs";
import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";

const EcareInput = (props) => {
    const { data, setData, post, processing, errors } = useForm({
        branch: props.auth.user.zone,
        complainsource_id: "",
        comp_status: "",
        comp_identiti: "",
        comp_name: "",
        comp_phone: "",
        complain_case_id: "",
        sla: "",
        zona: "",
        case_priority: "",
        claim_propose: "",
        note: "",
        resi: props.resi ? props.resi.connote : null,
    });
    const [callerType, setCallerType] = useState({
        nullValue: true,
        values: "",
    });
    const sources = props.sources.map((item) => ({
        id: item.id,
        value: item.id,
        display:
            item.source == item.sub_source
                ? item.source
                : `${item.source} - ${item.sub_source}`,
    }));

    let callers = props.callers.map((item) => ({
        id: item.id,
        value: item.id,
        display: item.caller,
    }));

    if (!props.resi) {
        callers = callers.filter(
            (item) => item.value !== 2 && item.value !== 3
        );
    }

    const sendingOffice = props.sendingOffice.map((item) => ({
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
        if (e.target.value == 1) {
            setCallerType({
                nullValue: true,
                values: [
                    { id: "customer", value: "customer", display: "Customer" },
                ],
            });
        } else if (e.target.value == 2) {
            setCallerType({
                nullValue: true,
                values: [{ id: "cnee", value: "cnee", display: "Cnee" }],
            });
        } else if (e.target.value == 3) {
            setCallerType({
                nullValue: true,
                values: [
                    { id: "shipper", value: "shipper", display: "Shipper" },
                ],
            });
        } else if (e.target.value == 4) {
            setCallerType({
                nullValue: true,
                values: [
                    { id: "internal", value: "internal", display: "internal" },
                ],
            });
        } else if (e.target.value == 5) {
            setCallerType({
                nullValue: true,
                values: sendingOffice,
            });
        }
        setData((datas) => ({
            ...datas,
            comp_name:
                e.target.value == 2
                    ? props.receiver.receiver_name
                    : e.target.value == 3
                    ? props.shipper.shipper_name
                    : "",
            comp_phone:
                e.target.value == 2
                    ? props.receiver.phone
                    : e.target.value == 3
                    ? props.shipper.phone
                    : "",
            comp_status: e.target.value,
        }));
    };

    //case javascript
    const [cases, setCases] = useState({
        nullValue: true,
        values: "",
    });

    const [subCase, setSubCase] = useState({
        nullValue: true,
        values: "",
    });

    const [categoryValue, setCategoryValue] = useState();

    const uniqCase = [
        ...new Set(props.complainCase.map((item) => item.category)),
    ];

    const caseCategory = uniqCase.map((item) => ({
        id: item,
        value: item,
        display: item,
    }));

    const onCategoryChangeHandler = (e) => {
        setCategoryValue(e.target.value);
        const filter = props.complainCase.filter(
            (item) => item.category == e.target.value
        );
        const uniqs = [...new Set(filter.map((item) => item.case))];
        const mapsUniq = uniqs.map((item, key) => ({
            id: item,
            value: item,
            display: item,
        }));

        setCases({
            nullValue: true,
            values: null,
        });
        setSubCase({
            nullValue: true,
            values: null,
        });

        setTimeout(() => {
            if (mapsUniq.length > 0) {
                setCases({
                    nullValue: true,
                    values: mapsUniq,
                });
            } else {
                setCases({
                    nullValue: false,
                    values: null,
                });
            }
        }, 500);
    };
    const onCaseChangeHandler = (a, b) => {
        const filter = props.complainCase.filter(
            (item) => item.category == a && item.case === b
        );
        const mapsUniq = filter.map((item) => ({
            id: item.id,
            value: item.id,
            display: item.sub_case,
        }));

        setSubCase({
            nullValue: true,
            values: null,
        });

        setTimeout(() => {
            if (mapsUniq.length > 0) {
                setSubCase({
                    nullValue: true,
                    values: mapsUniq,
                });
            } else {
                setSubCase({
                    nullValue: false,
                    values: null,
                });
            }
        }, 500);
    };

    const onSubCaseChangeHandler = (e) => {
        setValues(e);
        const filter = props.complainCase.filter(
            (item) => item.id == e.target.value
        );
        setData((datas) => ({
            ...datas,
            sla: filter[0].sla,
            zona: filter[0].zona,
        }));
    };

    // setValues
    const setValues = (event) => {
        setData(event.target.name, event.target.value);
    };

    const onHandleCurencyChange = (value, name) => {
        setData(name, value);
    };

    const priorityList = [
        { id: 1, value: "critical", display: "critical" },
        { id: 2, value: "hight", display: "high" },
        { id: 3, value: "medium", display: "medium" },
        { id: 4, value: "low", display: "low" },
    ];
    const submitForm = (e) => {
        e.preventDefault();
        post(route("ecare.store"));
        console.log(data);
    };

    return (
        <form onSubmit={submitForm} className="space-y-2 w-full">
            <div className="grid grid-cols-8">
                <div className="col-span-2">
                    <InputLabel value={"Branch"} />
                    <TextInput
                        disabled
                        className={"mt-1 block w-full"}
                        value={
                            data.branch == 1
                                ? "KEDIRI"
                                : data.branch == 2
                                ? "Tulung Agung"
                                : "Trenggalek"
                        }
                    />
                </div>
            </div>
            <div className="grid grid-cols-8">
                <div className="col-span-2">
                    <InputLabel value={"Source"} />
                    <SelectList
                        onChange={setValues}
                        name={"complainsource_id"}
                        id={"complainsource_id"}
                        nullValue={true}
                        className={"w-full mt-1"}
                        options={sources}
                    />
                    <InputError
                        message={errors.complainsource_id}
                        className="mt-1"
                    />
                </div>
            </div>
            <div className="grid grid-cols-8 gap-2">
                <div className="col-span-2">
                    <InputLabel value={"Caller Status"} />
                    <SelectList
                        className={"w-full mt-1"}
                        name={"comp_status"}
                        id={"comp_status"}
                        options={callers}
                        onChange={onChangeCallerHandler}
                        nullValue={true}
                    />
                    <InputError message={errors.comp_status} className="mt-1" />
                </div>
                <div className="col-span-2">
                    <InputLabel value={"Caller Type"} />
                    <SelectList
                        name={"comp_identiti"}
                        id={"comp_identiti"}
                        onChange={setValues}
                        className={"w-full mt-1"}
                        options={callerType.values}
                        nullValue={callerType.nullValue}
                    />
                    <InputError
                        message={errors.comp_identiti}
                        className="mt-1"
                    />
                </div>
                <div className="col-span-2">
                    <InputLabel value={"Caller Name"} optional={true} />
                    <TextInput
                        className={"w-full mt-1"}
                        onChange={setValues}
                        name={"comp_name"}
                        id={"comp_name"}
                        value={data.comp_name}
                    />
                    <InputError message={errors.comp_name} className="mt-1" />
                </div>
                <div className="col-span-2">
                    <InputLabel value={"Caller Phone"} optional={true} />
                    <TextInput
                        className={"w-full mt-1"}
                        onChange={setValues}
                        name={"comp_phone"}
                        id={"comp_phone"}
                        placeholder={"81200000000"}
                        value={data.comp_phone}
                    />
                    <InputError message={errors.comp_phone} className="mt-1" />
                </div>
            </div>
            <div className="grid grid-cols-8 gap-2">
                <div className="col-span-2">
                    <InputLabel value={"Category"} />
                    <SelectList
                        className={"w-full mt-1"}
                        nullValue={true}
                        options={caseCategory}
                        onChange={onCategoryChangeHandler}
                    />
                </div>
                <div className="col-span-2">
                    <InputLabel value={"Case"} />
                    <SelectList
                        className={"w-full mt-1"}
                        options={cases.values}
                        onChange={(e) =>
                            onCaseChangeHandler(categoryValue, e.target.value)
                        }
                        nullValue={cases.nullValue}
                    />
                </div>
                <div className="col-span-2">
                    <InputLabel value={"Sub Case"} />
                    <SelectList
                        name={"complain_case_id"}
                        id={"complain_case_id"}
                        onChange={onSubCaseChangeHandler}
                        className={"w-full mt-1"}
                        options={subCase.values}
                        nullValue={subCase.nullValue}
                    />
                    <InputError
                        message={errors.complain_case_id}
                        className="mt-1"
                    />
                </div>
                <div className="col-span-1">
                    <InputLabel value={"SLA"} />
                    <TextInput
                        className={"mt-1 block w-full"}
                        disabled
                        value={data.sla}
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
            <div className="grid grid-cols-8 gap-2">
                <div className="col-span-2">
                    <InputLabel value={"Case Priority"} />
                    <SelectList
                        className={"w-full mt-1"}
                        options={priorityList}
                        nullValue={true}
                        onChange={setValues}
                        name={"case_priority"}
                        id={"case_priority"}
                    />
                    <InputError
                        message={errors.case_priority}
                        className="mt-1"
                    />
                </div>
                <div className="col-span-1">
                    <InputLabel value={"Due Date"} />
                    <TextInput
                        className={"mt-1 block w-full"}
                        disabled
                        value={dayjs()
                            .add(data.sla, "day")
                            .format("DD/MM/YYYY")}
                    />
                </div>
                <div className="col-span-2">
                    <InputLabel value={"Claim Propose"} optional={true} />

                    <CurrencyInput
                        name={"claim_propose"}
                        id={"claim_propose"}
                        className={`border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm mt-1 block w-full`}
                        allowDecimals={false}
                        prefix="Rp. "
                        min={0}
                        onValueChange={onHandleCurencyChange}
                        placeholder={"Inputkan angka tanpa sparator"}
                    />
                    <InputError
                        message={errors.claim_propose}
                        className="mt-1"
                    />
                </div>
                <div className="col-span-2">
                    <InputLabel value={"Claim Approve"} optional={true} />
                    <CurrencyInput
                        name={"claim_approve"}
                        id={"claim_approve"}
                        className={`border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm mt-1 block w-full`}
                        allowDecimals={false}
                        prefix="Rp. "
                        min={0}
                        onValueChange={onHandleCurencyChange}
                        placeholder={"Inputkan angka tanpa sparator"}
                    />
                    <InputError
                        message={errors.claim_approve}
                        className="mt-1"
                    />
                </div>
            </div>
            <div className="grid grid-cols-8 gap-2">
                <div className="col-span-3">
                    <InputLabel value={"Note"} />
                    <TextInput
                        name={"note"}
                        id={"note"}
                        onChange={setValues}
                        className={"mt-1 block w-full"}
                    />
                </div>
            </div>
            <div className="w-full text-right">
                <PrimaryButton
                    className="ml-auto"
                    type={"submit"}
                    title={"submit"}
                />
            </div>
        </form>
    );
};

export default EcareInput;
