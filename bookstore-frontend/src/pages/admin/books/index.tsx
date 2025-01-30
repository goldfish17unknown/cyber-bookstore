import { AdminLayout } from "@/components/layouts/AdminLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { ReactElement } from "react";



const AdminBookManagement: NextPageWithLayout = () => {
    return (
        <div>
            Hello fdsd fdsafdsa fda fdas fdsa fds  fd fdsa fdsa 
        </div>
    )
} 

AdminBookManagement.getLayout = function getLayout(page: ReactElement) {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}

export default AdminBookManagement;