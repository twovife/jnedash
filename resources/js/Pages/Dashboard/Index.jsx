import ContentWrap from "@/Components/ContentWrap";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth, ...props }) {
    return (
        <Authenticated
            auth={auth}
            header={
                <>
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">
                        Dashboard
                    </h2>
                </>
            }
        >
            <Head title="Claim" />
            <ContentWrap>Welcome to Customer Care Application</ContentWrap>
        </Authenticated>
    );
}
