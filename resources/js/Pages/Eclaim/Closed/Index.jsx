import ContentWrap from "@/Components/ContentWrap";
import LinkButton from "@/Components/LinkButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/inertia-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { GrAdd } from "react-icons/gr";
import Tables from "./Partials/Tables";

export default function Index({ auth, errors, flash, ...props }) {
    const [claim, setClaim] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(
                route("api.eclaim.index", { closed_at: "1" })
            );
            setClaim(data);
        };
        fetchData().catch(console.error);
    }, []);

    return (
        <Authenticated
            auth={auth}
            errors={errors}
            flash={flash}
            header={
                <>
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">
                        E-Claim
                    </h2>
                    <div className="ml-auto flex gap-2">
                        <LinkButton
                            title={"Create"}
                            theme={"base"}
                            type="a"
                            href={route("eclaim.create")}
                            icon={<GrAdd />}
                        />
                    </div>
                </>
            }
        >
            <Head title="Claim" />
            <ContentWrap>
                <Tables data={claim} />
            </ContentWrap>
        </Authenticated>
    );
}
