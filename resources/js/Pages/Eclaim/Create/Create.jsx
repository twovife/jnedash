import ContentWrap from "@/Components/ContentWrap";
import LinkButton from "@/Components/LinkButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/inertia-react";
import React from "react";
import { BiArrowBack } from "react-icons/bi";
import CheckAwb from "./Partials/CheckAwb";

export default function Create({ auth, errors, ...props }) {
    console.log(errors);
    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={
                <>
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">
                        E-Claim
                    </h2>
                    <div className="ml-auto flex gap-2">
                        <LinkButton
                            title={"Kembali"}
                            type="a"
                            href={route("eclaim.open")}
                            icon={<BiArrowBack />}
                        />
                    </div>
                </>
            }
        >
            <Head title="Claim" />
            <ContentWrap className={`max-w-3xl`}>
                <CheckAwb />
            </ContentWrap>
        </Authenticated>
    );
}
