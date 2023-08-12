import ContentWrap from "@/Components/ContentWrap";
import InputArea from "@/Components/InputArea";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import dayjs from "dayjs";
import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";

const RequestAction = ({ auth, ...props }) => {
    const { request, followups, complaincase } = props;
    // console.log(request);
    const { data, setData, post, processing, errors } = useForm({
        branch: "Kediri",
        complainsource_id: 9,
        complain_case_id: "",
        sla: "",
        zona: "",
        case_priority: "",
        note: request.case_reason,
    });

    const followupbys = followups.map((item) => ({
        id: item.name,
        value: item.name,
        display: item.name,
    }));

    // function for case
    const [cases, setCases] = useState({
        nullvalue: true,
        values: "",
    });

    const [subCase, setSubCase] = useState({
        nullvalue: true,
        values: "",
    });

    const [categoryValue, setCategoryValue] = useState();

    const uniqCase = [...new Set(complaincase.map((item) => item.category))];

    const caseCategory = uniqCase.map((item) => ({
        id: item,
        value: item,
        display: item,
    }));

    const onCategoryChangeHandler = (e) => {
        setCategoryValue(e.target.value);
        const filter = complaincase.filter(
            (item) => item.category == e.target.value
        );
        const uniqs = [...new Set(filter.map((item) => item.case))];
        const mapsUniq = uniqs.map((item, key) => ({
            id: item,
            value: item,
            display: item,
        }));

        setCases({
            nullvalue: true,
            values: null,
        });
        setSubCase({
            nullvalue: true,
            values: null,
        });

        setTimeout(() => {
            if (mapsUniq.length > 0) {
                setCases({
                    nullvalue: true,
                    values: mapsUniq,
                });
            } else {
                setCases({
                    nullvalue: false,
                    values: null,
                });
            }
        }, 500);
    };

    const onCaseChangeHandler = (a, b) => {
        const filter = complaincase.filter(
            (item) => item.category == a && item.case === b
        );
        const mapsUniq = filter.map((item) => ({
            id: item.id,
            value: item.id,
            display: item.sub_case,
        }));

        setSubCase({
            nullvalue: true,
            values: null,
        });

        setTimeout(() => {
            if (mapsUniq.length > 0) {
                setSubCase({
                    nullvalue: true,
                    values: mapsUniq,
                });
            } else {
                setSubCase({
                    nullvalue: false,
                    values: null,
                });
            }
        }, 500);
    };

    const onSubCaseChangeHandler = (e) => {
        setValues(e);
        const filter = complaincase.filter((item) => item.id == e.target.value);
        setData((datas) => ({
            ...datas,
            sla: filter[0].sla,
            zona: filter[0].zona,
        }));
    };

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
        post(route("csoffice.complainrequest.generatestore", request.id));
    };

    return (
        <Authenticated
            auth={auth}
            header={
                <>
                    <h2 className="font-semibold text-lg text-gray-800 dark:text-white leading-tight">
                        Action Claim
                    </h2>
                    <Head title="Approve Claim" />
                </>
            }
        >
            <ContentWrap>
                <form onSubmit={submitForm}>
                    <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-8 lg:space-y-12 gap-3 py-4 px-4 lg:px-0">
                        <div className="col-span-6">
                            <h1 className="mb-2 text-lg">
                                Input Data Ticketing
                            </h1>

                            <div className="grid grid-cols-4 gap-x-4 mb-4">
                                <div className="mb-2">
                                    <InputLabel value={"Branch"} />
                                    <TextInput
                                        name="branch"
                                        disabled
                                        value={data.branch}
                                        className="block w-full mt-1"
                                    />
                                </div>
                                <div className="mb-2">
                                    <InputLabel value={"Source"} />
                                    <TextInput
                                        disabled
                                        name="complainsource_id"
                                        value="Sosmed - Landing Page"
                                        className="block w-full mt-1"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-x-4 mb-4">
                                <div className="mb-2">
                                    <InputLabel value={"Caller Status"} />
                                    <TextInput
                                        disabled
                                        value={request.callers.caller}
                                        className="block w-full mt-1"
                                    />
                                </div>
                                <div className="mb-2">
                                    <InputLabel value={"Caller Status"} />
                                    <TextInput
                                        disabled
                                        value={request.caller_sub_category}
                                        className="block w-full mt-1"
                                    />
                                </div>
                                <div className="mb-2">
                                    <InputLabel value={"Caller Status"} />
                                    <TextInput
                                        disabled
                                        value={request.caller_contact_name}
                                        className="block w-full mt-1"
                                    />
                                </div>
                                <div className="mb-2">
                                    <InputLabel value={"Caller Status"} />
                                    <TextInput
                                        disabled
                                        value={request.caller_contact_person}
                                        className="block w-full mt-1"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-8 gap-2 mb-4">
                                <div className="col-span-2">
                                    <InputLabel value={"Category"} />
                                    <SelectList
                                        className={"w-full mt-1"}
                                        nullvalue={true}
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
                                            onCaseChangeHandler(
                                                categoryValue,
                                                e.target.value
                                            )
                                        }
                                        nullvalue={cases.nullvalue}
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
                                        nullvalue={subCase.nullvalue}
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
                                        nullvalue={true}
                                        onChange={setValues}
                                        name={"case_priority"}
                                        value={data.case_priority}
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
                                    <InputLabel value={"Followup By"} />
                                    <SelectList
                                        className={"w-full mt-1"}
                                        options={followupbys}
                                        nullvalue={true}
                                        onChange={setValues}
                                        name={"followup_by"}
                                        value={data.followup_by}
                                    />
                                    <InputError
                                        message={errors.followup_by}
                                        className="mt-1"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-8 gap-2">
                                <div className="col-span-3">
                                    <InputLabel value={"Note"} />
                                    <InputArea
                                        name={"note"}
                                        id={"note"}
                                        onChange={setValues}
                                        value={data.note}
                                        className={"mt-1 block w-full"}
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
                                <Link
                                    className="bg-red-500 disabled:hover:bg-red-800 hover:bg-red-700 focus:bg-red-600 active:bg-red-900 focus:ring-red-500 disabled:cursor-not-allowed flex gap-2 items-center px-4 py-3 border border-transparent rounded-md font-semibold text-xs text-white tracking-widest focus:outline-none focus:ring-2 transition ease-in-out duration-150"
                                    as="button"
                                    method="post"
                                    href={route(
                                        "csoffice.complainrequest.generatestore",
                                        request.id
                                    )}
                                    data={{ action: "rejected" }}
                                >
                                    Reject
                                </Link>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div className="grid grid-cols-2 border-b">
                                <div className="py-2 px-3">Nomor AWB</div>
                                <div className="py-2 px-3">
                                    {request.cnote?.connote}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 border-b">
                                <div className="py-2 px-3">Input Date</div>
                                <div className="py-2 px-3">
                                    {dayjs(request.cnote?.connote_date).format(
                                        "DD/MM/YYYY"
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 border-b">
                                <div className="py-2 px-3">Origin</div>
                                <div className="py-2 px-3">
                                    {request.cnote?.origin}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 border-b">
                                <div className="py-2 px-3">Destination</div>
                                <div className="py-2 px-3">
                                    {request.cnote?.destination}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 border-b">
                                <div className="py-2 px-3">Cnee</div>
                                <div className="py-2 px-3">
                                    {request.cnote?.receiver_name}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 border-b">
                                <div className="py-2 px-3">Cnee Phone</div>
                                <div className="py-2 px-3">
                                    {request.cnote?.receiver_phone}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 border-b">
                                <div className="py-2 px-3">Cnee Addres</div>
                                <div className="py-2 px-3">
                                    {request.cnote?.receiver_city}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </ContentWrap>
        </Authenticated>
    );
};

export default RequestAction;
