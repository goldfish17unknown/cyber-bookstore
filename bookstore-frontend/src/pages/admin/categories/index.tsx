import CategoriesTable from "@/components/custom/admin/categories/CategoriesTable"
import { AdminLayout } from "@/components/layouts/AdminLayout"
import { Button } from "@/components/ui/button"
import { NextPageWithLayout } from "@/pages/_app"
import { Plus } from "lucide-react"
import Link from "next/link"
import { ReactElement } from "react"


const AdminCategoriesManagement: NextPageWithLayout = () => {
    return (
        <div className="w-full mt-10">
            <div className="flex my-10">
                <h1 className="text-3xl font-bold mx-auto ">Categories List</h1>
            </div>

            <div className="flex justify-end my-10 lg:me-48">
                <Link href="/admin/categories/create">
                <Button>Create <Plus /></Button>
                </Link>
            </div>
            <CategoriesTable categories={[]}/>
            
        </div>
    )
}




AdminCategoriesManagement.getLayout = function getLayout(page: ReactElement){
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}


export default AdminCategoriesManagement