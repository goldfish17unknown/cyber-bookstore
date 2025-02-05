import BooksTable from "@/components/custom/admin/books/BooksTable";
import CommonPagination from "@/components/custom/admin/CommonPagination";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { NextPageWithLayout } from "@/pages/_app";
import { Book } from "@/types/common";
import { Link, SmilePlus, UserPlus } from "lucide-react";
import { ReactElement, useEffect, useState } from "react";



const AdminBookManagement: NextPageWithLayout = () => { 
    const [books, setBooks] = useState<Book[]>([]);

    const[currentPage, setCurrentPage] = useState<number>(1);

    const[lastPage, setLastPage] = useState<number>(2);


    const fetchBooksData = async(PageNumber: Number) => {
       try{
            const response = await fetch(`localhost:8000/api/books/admin/withStatus?page=${PageNumber}`);
            if(!response.ok){
                throw new Error('Failed to fetch datas.');
            }
            const data = await response.json();
            setBooks(data.data)
            setCurrentPage(data.current_page)
        } catch (error) {
            console.error(error);
        } finally {
           
        }
    }

    useEffect(() => {
        fetchBooksData(1);
    }, []);

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