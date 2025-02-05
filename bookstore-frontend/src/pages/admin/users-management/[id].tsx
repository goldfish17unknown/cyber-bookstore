import { AdminLayout } from "@/components/layouts/AdminLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { ReactElement } from "react";



const UserDetailPage: NextPageWithLayout = () => {
    return (
        <div>
            <h1>This is detail page</h1>
        </div>
    )
}

UserDetailPage.getLayout = function getLayout(page: ReactElement){
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}

export default UserDetailPage;