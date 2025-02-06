import BooksTable from "@/components/custom/admin/books/BooksTable";
import CommonPagination from "@/components/custom/admin/CommonPagination";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { NextPageWithLayout } from "@/pages/_app";
import { Book } from "@/types/common";
import { SmilePlus } from "lucide-react";
import { ReactElement, useEffect, useState } from "react";



const AdminBookManagement: NextPageWithLayout = () => { 
    const [books, setBooks] = useState<Book[]>([]);




    return (
        <div className="w-full mt-10">
            <div className="flex my-10">
                <h1 className="text-3xl font-bold mx-auto">Books List</h1>
            </div>

            <div className="flex justify-end my-10 lg:me-48">
                <Button>Create <SmilePlus /></Button>    
            </div>
            
            <BooksTable books={books} />
            {/* <CommonPagination
                currentPage={currentPage}
                onPageChange={setCurrentPage} totalPages={lastPage} /> */}
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