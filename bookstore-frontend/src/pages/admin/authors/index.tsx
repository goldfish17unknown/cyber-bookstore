import AuthorsTable from "@/components/custom/admin/authors/AuthorsTable";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { ReactElement } from "react";

export const AdminAuthorManagement: NextPageWithLayout = () => {

    const authors = [
        {
            id: 1,
            name: "string",
            bio: "string",
            created_at: "string",
            updated_at: "string",
        },
        {
            id: 2,
            name: "string",
            bio: "string",
            created_at: "string",
            updated_at: "string",
        },
        
    ]
        
    
    return (
        <div className="flex justify-center">
            <AuthorsTable authors={authors} />
        </div>
    )

}

AdminAuthorManagement.getLayout = function getLayout(page: ReactElement){
    return (
            <AdminLayout>
                {page}
            </AdminLayout>
        )
}


export default AdminAuthorManagement;