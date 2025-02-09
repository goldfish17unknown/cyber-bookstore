import BooksTable from "@/components/custom/admin/books/BooksTable";
import CommonPagination from "@/components/custom/admin/CommonPagination";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { NextPageWithLayout } from "@/pages/_app";
import { Book } from "@/types/common";
import { BookPlus } from "lucide-react";
import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";


const AdminBookManagement: NextPageWithLayout = () => { 
    const [books, setBooks] = useState<Book[]>([]);
    const [ search, setSearch] = useState<string>("");
    
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [ totalPages, setTotalPages ] = useState<number>(1);



    useEffect(() => {
        setCurrentPage(1);
    }, [search]);
    
    useEffect(() => {
        fetchBooks();
    }, [search, currentPage]);

    const fetchBooks = async () => {
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books?search=${search}&page=${currentPage}`);
            if (!response.ok){
                throw new Error("Failed to fetch datas.")
            }
            const data =  await response.json();
            const books = data.data
            console.log(books)
            setBooks(data.data)
            setTotalPages(data.last_page);
        } catch(error){
            console.log(error instanceof Error ? error.message : "Unknown error")
        } 
    } 

    return (
        <div className="w-full mt-10 mb-10">
            <div className="flex my-10">
                <h1 className="text-3xl font-bold mx-auto">Books List</h1>
            </div>

            <div className="flex justify-end my-10 lg:me-48">
                <Link href="/admin/books/create">
                    <Button>Create <BookPlus /></Button>
                </Link>
                    
            </div>
            
            <BooksTable books={books} />
            <CommonPagination
                currentPage={currentPage}
                onPageChange={setCurrentPage} totalPages={totalPages} />
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