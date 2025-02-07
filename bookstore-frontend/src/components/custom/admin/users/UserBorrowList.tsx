
interface UserBorrowListProps {
    userId: number ;
}

const UserBorrowList: React.FC<UserBorrowListProps> = ({ userId }) => {
    return (
        <div className="w-full p-5">
            <h1 className="font-seminbold text-xl">Book borrowed history:</h1>
            <div className="w-full p-5 mt-2">




                <div className="grid grid-cols-10 items-center bg-stone-200 shadow-md rounded h-32 mx-auto mb-5">
                    <div className="flex justify-center col-span-3 border-e-2 items-center h-full border-black">
                        <p>12/12/2002</p>
                    </div>
                    <div className="flex justify-center col-span-2 items-center h-full">
                        <img src="/placeholders/book-placeholder.png" alt="" className="h-24 w-18" />
                    </div>
                    <div className="col-span-2">
                        <p>book name</p>
                    </div>
                    <div className="col-span-1 flex flex-col items-center">
                        <p>status: </p>
                        <p>Not returned</p>
                    </div>
                    <div className="col-span-2 flex flex-col items-center">
                        <p>return date:</p>
                        <p>2/10/1001</p>
                    </div>

                </div>






                







                

            </div>
        </div>
    )
}

export default UserBorrowList;


// borrow date, book image, book name, status, return date