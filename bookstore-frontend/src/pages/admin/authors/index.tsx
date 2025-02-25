import AuthorsTable from "@/components/custom/admin/authors/AuthorsTable";
import CommonPagination from "@/components/custom/admin/CommonPagination";
import CommonSearchInput from "@/components/custom/admin/CommonSearchInput";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { NextPageWithLayout } from "@/pages/_app";
import useAuthorStore from "@/store/AuthorStore";
import { Search, UserPlus } from "lucide-react";
import Link from "next/link";
import { ReactElement, useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";


const AdminAuthorManagement: NextPageWithLayout = () => {

    const { authors, lastPage, currentPage, setCurrentPage, fetchAuthors } = useAuthorStore()
    const [ search, setSearch] = useState<string>("")

     
    useEffect(() => {
        fetchAuthors(search)
    }, [currentPage])

    const handleSearch = () => {
        setCurrentPage(1)
        fetchAuthors(search);
    }


    return (
        <div className="w-full mt-10">
            <div className="flex my-10">
                <h1 className="text-3xl font-bold mx-auto ">Authors List</h1>
            </div>
            
            <div className="flex flex-col-reverse lg:flex-row justify-between my-10 lg:me-48 gap-4 mx-auto md:w-2/3 sm:w-full">
                <div className="w-full flex md:w-2/5">
                  <CommonSearchInput searchValue={search} setSearchValue={setSearch} placeholder="Search authors by name..." />
                  <Button variant={"yellow"} onClick={handleSearch}><Search /></Button>
                </div>

                <Link href="/admin/authors/create">
                <Button>Create <UserPlus /></Button>
                </Link>

            </div>
            <AuthorsTable authors={authors} />
            <CommonPagination 
            currentPage={currentPage}
            totalPages={lastPage}
            onPageChange={setCurrentPage}/>
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