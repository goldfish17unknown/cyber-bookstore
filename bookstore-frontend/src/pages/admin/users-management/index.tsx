
import CommonPagination from "@/components/custom/admin/CommonPagination";
import CommonSearchInput from "@/components/custom/admin/CommonSearchInput";
import UserCreateModal from "@/components/custom/admin/users/UserCreateModal";
import UsersTable from "@/components/custom/admin/users/UsersTable";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { User } from "@/types/common";
import { ReactElement, useEffect, useState } from "react";


const AdminUserManagement: NextPageWithLayout = () => {
    const [ users, setUsers ] = useState<User[]>([]);


    const [userName, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const [ createDialogOpen, setCreateDialogOpen ] = useState<boolean>(false);

    const [ search, setSearch] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [ totalPages, setTotalPages ] = useState<number>(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [search]);
    
    useEffect(() => {
        fetchUserData();
    }, [search, currentPage]);


    const fetchUserData = async () => {
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users?search=${search}&page=${currentPage}`);
            if (!response.ok){
                throw new Error("Failed to fetch datas.")
            }
            const data = await response.json();
            setUsers(data.data);
            setTotalPages(data.last_page);

        } catch (error){
            console.log(error instanceof Error ? error.message : "Unknown error")
        }
    }
    

    const handleCreate = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: userName,
                    email: email
                })
            })
            if(!response.ok){
                throw new Error("Failed to create user");
            }
            const data = await response.json();
            setCreateDialogOpen(false)
            setUserName("")
            setEmail("")
            fetchUserData()
            

        } catch (error){
            console.log(error instanceof Error ? error.message : "Unknown error")
        }

    }

    const handleEdit = async ( id: number, newName: string, newEmail: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: newName,
                    email: newEmail
                })
            })
            if(!response.ok){
                throw new Error("Failed to edit user.");
            }
            fetchUserData()
        } catch (error){
            console.log(error instanceof Error ? error.message : "Unknown error")
        }
    }

    const handleDelete = async (id: number) => {
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
                method: 'DELETE'
            })
            if(!response.ok){
                throw new Error('Failed to delete user.');
            }
            fetchUserData()
            
        } catch (error){
            console.log(error instanceof Error ? error.message : "Unknown error")
        }
    }

    return (
        <div className="w-full mt-10">
            <div className="flex my-10">
                <h1 className="text-3xl font-bold mx-auto">User List</h1>
            </div>

            <div className="flex flex-col-reverse lg:flex-row justify-between my-10 lg:me-48 gap-4 mx-auto md:w-2/3 sm:w-full">

                <div className="w-full lg:w-3/6">
                  <CommonSearchInput searchValue={search} setSearchValue={setSearch} placeholder="Search user by name or email..." />
                </div>

                <div className="self-end">
                  <UserCreateModal 
                  createFunction={handleCreate} 
                  userName={userName} setUserName={setUserName} 
                  email={email} setEmail={setEmail} 
                  dialogOpen={createDialogOpen} setDialogOpen={setCreateDialogOpen} />
                </div>
            </div>
            <UsersTable users={users} deleteFunction={handleDelete} editFunction={handleEdit} />
            <CommonPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}/>

        </div>
    )
}


AdminUserManagement.getLayout = function getLayout(page: ReactElement){
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}

export default AdminUserManagement;