import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectList from "@/Components/SelectList";
import TextInput from "@/Components/TextInput";
import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";

const TicketCheckAwb = ({ auth, error, ...props }) => {
    const [csCategory, setCsCategory] = useState();
    const [csCases, setCsCases] = useState([]);
    const [csSubCases, setCsSubCases] = useState([]);

    const uniqCat = () => {
        let value = [{ id: "", value: "", display: "Select Category" }];
        const uniq = [...new Set(complaincase.map((item) => item.category))];
        uniq.map((item) => {
            value.push({
                id: item,
                value: item,
                display: item,
            });
        });
        return value;
    };

    const onCategoryChangeHandler = (e) => {
        setCsCategory(e.target.value);
        const filter = complaincase.filter(
            (item) => item.category == e.target.value
        );
        const caseUniq = [...new Set(filter.map((item) => item.case))];
        const caseMap = caseUniq.map((item, key) => {
            return {
                id: item,
                value: item,
                display: item,
                // selected: key == 0 ? true : false,
            };
        });
        if (caseMap.length > 0) {
            document.getElementById("case").disabled = false;
            document.getElementById("subcase").disabled = false;
            onCaseChangeHandler(e.target.value, caseMap[0].value);
        } else {
            document.getElementById("case").disabled = true;
            document.getElementById("subcase").disabled = true;
            setCsSubCases([]);
        }

        setCsCases([
            {
                id: "",
                value: "",
                display: "Wait",
            },
        ]);

        setTimeout(() => {
            setCsCases(caseMap);
        }, 300);
    };

    const onCaseChangeHandler = (category, value) => {
        const filter = complaincase.filter(
            (item) => item.category == category && item.case === value
        );
        const subCaseUniq = [...new Set(filter.map((item) => item.sub_case))];
        const subCaseMap = subCaseUniq.map((item) => {
            return {
                id: item,
                value: item,
                display: item,
            };
        });

        if (subCaseMap.length > 0) {
            document.getElementById("subcase").disabled = false;
        } else {
            document.getElementById("subcase").disabled = true;
        }

        setCsSubCases([
            {
                id: "",
                value: "",
                display: "Wait",
            },
        ]);

        setTimeout(() => {
            setCsSubCases(subCaseMap);
        }, 500);
    };

    const onSubmitForm = () => {};

    return (
        <form onSubmit={onSubmitForm}>
            <div>
                <InputLabel value={"Masukkan AWB"} />
                <TextInput
                    type="text"
                    name="cnote"
                    className="mt-1 w-full"
                    isFocused={true}
                    required
                />
            </div>
            <div className="flex mt-3 gap-3">
                <div className="flex-1">
                    <SelectList
                        options={uniqCat()}
                        onChange={onCategoryChangeHandler}
                        className={"w-full"}
                    />
                </div>
                <div className="flex-1">
                    <SelectList
                        id="case"
                        disabled
                        onChange={(e) =>
                            onCaseChangeHandler(csCategory, e.target.value)
                        }
                        options={csCases}
                        className={"w-full"}
                    />
                </div>
                <div className="flex-1">
                    <SelectList
                        disabled
                        id="subcase"
                        options={csSubCases}
                        className={"w-full"}
                    />
                </div>
            </div>
            <div>
                <PrimaryButton
                    title={"Submit"}
                    theme={"success"}
                    className={"mt-3 ml-auto"}
                />
            </div>
        </form>
    );
};

export default TicketCheckAwb;
