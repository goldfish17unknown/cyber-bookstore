import { Button } from "@/components/ui/button";
import useBookStore from "@/store/BookStore";
import { Book } from "@/types/common";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


const bookPage = () => {
    const [ currentBook, setCurrentBook ] = useState<Book | null>(null)
    const { getBook } = useBookStore()
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id){
            fetchBookData()
        }
    }, [id])

    useEffect(() => {
        console.log(currentBook)
    }, [currentBook])


    const fetchBookData = async () => {
        if(typeof id === "string"){
            setCurrentBook(await getBook(id))
        }
    }
    
    if(currentBook) {
        return (
            <div className="flex justify-center w-full ">
                <div className="w-1/2 mt-5">
                    <div className="ms-0 mb-10">
                        <Button variant={"blackLink"} className="text-xl mt-6 mb-3" onClick={() => router.back()}>← Back</Button>
                    </div>
                    <div className="ms-20">
                        <div className="flex">
                            <img src={currentBook.image ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${currentBook.image}` : "/placeholders/book-placeholder.png"} 
                            className="h-80 w-56 shadow-md"/>
                            <div className="ms-20">
                                <h1 className="font-bold text-6xl">{currentBook.title}</h1>
                                <div className="flex">
                                    <p className="me-3">isbn: </p>
                                    <p>#{currentBook.isbn}</p>
                                </div>
                                <span className={`flex-shrink-0 rounded-lg p-1 py-0 text-white ${currentBook.borrowStatus === "Available" ? "bg-green-600" : "bg-red-500"}`}>{currentBook.borrowStatus}</span>
                                <div className="mt-12">
                                    
                                    <div className="flex">
                                        <p className="me-3 font-semibold">author: </p>
                                        <div className="flex">
                                            <img src={currentBook.author?.image ? `http://localhost:8000/${currentBook.author?.image}` : "/placeholders/user-placeholder.png"} alt="author-image" 
                                             className="w-6 h-6 rounded-full object-cover me-2"/>
                                            <p>{currentBook.author?.name}</p>
                                        </div>
                                    </div>

                                    <div className="flex">
                                        <p className="me-3 font-semibold">category: </p>
                                        <p>{currentBook.category ? currentBook.category.name : " - "}</p>
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div>
                            <h1 className="text-4xl font-semibold mt-5">Description:</h1>
                            <p className="mt-4">{currentBook.description}</p>

                        </div>
                        

                    </div>
                    

                </div>
                
            </div>
        )
    }

    return (
        <div className="flex justify-center items-center h-svh">
            <img src="/home/loader.gif" />
        </div>
    )
}

export default bookPage;