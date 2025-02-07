import dayMonthYear from "@/lib/dayTime";
import { BorrowedBook } from "@/types/common";
import { useEffect, useState } from "react";

interface UserBorrowListProps {
    userId: number ;
}

const UserBorrowList: React.FC<UserBorrowListProps> = ({ userId }) => {
    const [borrowList, setBorrowList] = useState<BorrowedBook[]>([])

    useEffect(() => {
        if(userId){
            fetchBorrowList();
        }
    }, [userId])

    const fetchBorrowList = async () => {
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/borrowhistory/${userId}`);
            if(!response.ok){
                throw new Error("Failed to fetch datas.")
            }
            const data = await response.json();
            setBorrowList(data)
            console.log(data)
        } catch (error){
            console.log(error instanceof Error ? error.message : "Unknown error")
        }
    }
    return (
        <div className="w-full p-5">
            <h1 className="font-seminbold text-xl">Book borrowed history:</h1>
            <div className="w-full p-5 mt-2">
                {borrowList.map((borrow) => (
                    <div key={borrow.id} className="grid grid-cols-10 items-center bg-stone-200 shadow-md rounded h-32 mx-auto mb-5">
                    <div className="flex justify-center col-span-3 border-e-2 items-center h-full border-black">
                        <p>{borrow.borrowed_at}</p>
                    </div>
                    <div className="flex justify-center col-span-2 items-center h-full">
                        <img src={borrow.book.image ? `http://localhost:8000/${borrow.book.image}` : "/placeholders/book-placeholder.png"} alt="" className="w-16 h-24" />
                    </div>
                    <div className="col-span-2">
                        <p>{borrow.book.title}</p>
                    </div>
                    <div className="col-span-1 flex flex-col items-center">
                        <p>status: </p>
                        <p>{borrow.status}</p>
                    </div>
                    <div className="col-span-2 flex flex-col items-center">
                        <p>return date:</p>
                        <p>{borrow.returned_at ? dayMonthYear(borrow.returned_at) : "-"}</p>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}

export default UserBorrowList;


// borrow date, book image, book name, status, return date