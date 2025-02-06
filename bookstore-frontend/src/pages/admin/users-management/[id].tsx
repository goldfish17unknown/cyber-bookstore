import UserBorrowList from "@/components/custom/admin/users/UserBorrowList";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Label } from "@/components/ui/label";
import dayMonthYear from "@/lib/dayTime";
import { NextPageWithLayout } from "@/pages/_app";
import { User } from "@/types/common";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";


const UserDetailPage: NextPageWithLayout = () => {
    const [ user, setUser ] = useState<User | null>(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if(id){
            fetchUser();
        }
        
    }, [id])
    

    const fetchUser = async () => {
        try{
            console.log(id)
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`)
            if(!response.ok){
                throw new Error('Failed to fetch author data.');
            }
            const data = await response.json();
            console.log(data)
            setUser(data);
            console.log(user)
        } catch (error){
            console.log(error);
        }
    } 

    
    return (
        <div>
            <section className="p-5 h-auto border-b-2 border-gray-200">
                <h1 className="md:text-4xl text-3xl font-bold my-4">{ user?.name }</h1>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="font-semibold">user ID.no:</p>
                        <p>{ user?.id }</p>
                    </div>
                    <div>
                        <p className="font-semibold">user email:</p>
                        <p>{ user?.email }</p>
                    </div>
                    <div>
                        <p className="font-semibold">user join date:</p>
                        <p>{ dayMonthYear(user?.created_at) }</p>
                    </div>
                </div>
            </section>
            <section>
                {/* TODO:: to fix later */}
                <UserBorrowList  userId={user?.id ?? 0} />
            </section>
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