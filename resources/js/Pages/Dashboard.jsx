import ContentWrap from "@/Components/ContentWrap";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/inertia-react";

export default function Dashboard(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            {/* <div className="bg-white p-4 rounded">a</div> */}
            <ContentWrap>asd</ContentWrap>
        </Authenticated>
    );
}
