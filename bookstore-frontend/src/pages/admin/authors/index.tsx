import AuthorsTable from "@/components/custom/admin/authors/AuthorsTable";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { NextPageWithLayout } from "@/pages/_app";
import { Author } from "@/types/common";
import { UserPlus } from "lucide-react";
import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";

const AdminAuthorManagement: NextPageWithLayout = () => {

    const [authors, setAuthors] = useState<Author[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    const fetchAuthorsData = async () => {
        try{
            const response = await fetch(`http://localhost:8000/api/authors`);
            if(!response.ok){
                throw new Error('Failed to fetch datas.');
            }
            const data = await response.json();
            setAuthors(data)
        } catch (error){
            setError(error instanceof Error ? error.message : "Unknown error")
        } finally {
            setLoading(false);
        }    
    }

    useEffect(() => {
        fetchAuthorsData();
    }, [])
        
    
    return (
        <div className="w-full mt-10">
            <div className="flex my-10">
                <h1 className="text-3xl font-bold mx-auto ">Authors List</h1>
            </div>
            
            <div className="flex justify-end my-10 lg:me-48">
                <Link href="/admin/authors/create">
                <Button>Create <UserPlus /></Button>
                </Link>
                
            </div>
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