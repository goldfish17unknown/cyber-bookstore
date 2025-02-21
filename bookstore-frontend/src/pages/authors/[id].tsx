import CommonSearchInput from "@/components/custom/admin/CommonSearchInput";
import SelectCategory from "@/components/custom/SelectCategory";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useAuthorStore from "@/store/AuthorStore";
import useBookStore from "@/store/BookStore";
import { Author, Book } from "@/types/common";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface BookSkeletonProps {
    count: number;
}


const AuthorsPage = () => {
    const { fetchSingleAuthor } = useAuthorStore()
    const [ currentAuthor, setCurrentAuthor ] = useState<Author | null>(null);

    const [showFullBio, setShowFullBio] = useState<boolean>(false);

    const router = useRouter();
    const { id } = router.query;

    const [category, setCategory ] = useState<string>("")
    const [search, setSearch ] = useState<string>("")
    const [bookLoading, setBookLoading ] = useState<boolean>(true);
    const [ moreBookLoading, setMoreBookLoading ] = useState<boolean>(false);
    const loadingRef = useRef<boolean>(false);
    const [ books, setBooks] = useState<Book[]>([])

    const observerRef = useRef<HTMLDivElement | null>(null);
    
    const { currentPage, setCurrentPage, hasMorePages, loadBooks} = useBookStore();


    useEffect(() => {
        if (id){
            fetchAuthorData()   
        }  
    }, [id]);

    useEffect(() => {
        if(currentAuthor){
            setBooks([])
            setCurrentPage(1)
            setSearch("")
            fetchAuthorBook(17, "");
        }
    }, [currentAuthor, category]);

    useEffect(() => {
        if (!observerRef.current) return;

        if(moreBookLoading) return;
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMorePages) {
                fetchMoreBooks();
            }
        }, { rootMargin: "300px" } );

        observer.observe(observerRef.current);
        return () => observer.disconnect();
    }, [books, hasMorePages]);


    const fetchAuthorData = async () => {
        if(typeof id === "string"){
            setCurrentAuthor(await fetchSingleAuthor(id));
        }
    }

    


    const fetchAuthorBook = async (bookNumber: number, searchKey: string) => {
        setBookLoading(true);
        if (typeof id === "string") {
            const data = await loadBooks(searchKey, category, id, bookNumber);
            setBooks((prev) => [...prev, ...data]);
        }
        setBookLoading(false);
    };

    const fetchMoreBooks = useCallback(async() => {
        setCurrentPage(currentPage + 1);
        if (loadingRef.current) return;
        if (!moreBookLoading && hasMorePages) {
            loadingRef.current = true;
            setMoreBookLoading(true)
            if (typeof id === "string") {
                const data = await loadBooks(search, category, id, 17);
                setBooks((prev) => [...prev, ...data]);
            }
            setMoreBookLoading(false)
            loadingRef.current = false;
        }
    }, [id, search, category, hasMorePages, loadBooks]);;

    const handleSearch = () => {
        setBooks([])
        setCurrentPage(1)
        fetchAuthorBook(17, search);

    }

    const toggleText = () => {
        setShowFullBio(!showFullBio);
    }
    
    if(currentAuthor) {
        return (
            <div className="md:mx-32">
                <Link href="/..">
                    <Button variant={"blackLink"} className="text-xl mt-6 mb-3" >← Back</Button>
                </Link>

                <section className="p-5 grid grid-cols-7 border-b-2 border-gray-200">
                    <div className="md:col-span-2 col-span-7">  
                        <img src={currentAuthor?.image ? `http://localhost:8000/${currentAuthor.image}` : "/placeholders/user-placeholder.png"} alt="author-image"
                        className="rounded-full w-64 h-64" />
                    </div>
                    <div className="md:col-span-4 col-span-7  ms-4">
                    <div>
                        <h1 className="md:text-4xl text-3xl font-bold my-4">{ currentAuthor.name }</h1>
                        <p>
                            { showFullBio ? currentAuthor.bio : currentAuthor.bio.slice(0, 500) }
                            {currentAuthor.bio && currentAuthor.bio.length > 300 && (
                                <span onClick={toggleText} className="text-gray-600 hover:cursor-pointer">
                                {showFullBio ? " Show less..." : " Show more..."}
                            </span>
                            )}
                        </p>
                    </div>
                </div>
                </section>


                <section className="mb-10">
                    <div className="md:flex md:justify-between lg:mx-10 mt-5">
                        <h1 className="text-4xl font-bold">Books written by  <span className="text-yellow-400 italic">{currentAuthor.name}</span></h1>
                        <div className="flex w-5/12">
                            <div className="w-3/5 me-2 flex">
                                <CommonSearchInput searchValue={search} setSearchValue={setSearch} placeholder={"search by book's name..."} />
                                <Button variant={"yellow"} onClick={handleSearch}><Search /></Button>
                            </div>
                            <div className="w-2/5">
                                <SelectCategory categoryValue={category} setCategoryValue={setCategory} />
                            </div>
                        </div>    
                    </div>
                    <div className="grid grid-cols-5 gap-4 mt-10 justify-items-center">
                        {
                            bookLoading ? (
                                <BookSkeleton count={8} />
                            ) : books.length === 0 ? (
                                <p className="flex col-span-8 items-center justify-center text-center text-gray-500 h-32">No data</p>
                              ) :  books.map((book) => (
                                <div key={book.id} >
                                <Link href={`/books/${book.id}`} className="flex flex-col w-48 mb-3">
                                    <img src={book.image ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${book.image}` : "/placeholders/book-placeholder.png"} 
                                    className="w-full h-72 rounded-md shadow-lg"/>
                                    <div className="w-full  mt-2">
                                        <div className="flex">
                                            <span className={`flex-shrink-0 rounded-lg p-1 py-0 text-white ${book.borrowStatus === "Available" ? "bg-green-600" : "bg-red-500"}`}>{book.borrowStatus}</span>
                                            <p className="truncate ms-1">#{book.isbn}</p>

                                        </div>
                                        
                                        <p className="truncate w-full font-semibold text-xl">{book.title}</p>
                                    </div>
                                </Link>
                                    
                                </div>
                            ))
                        }
                        {moreBookLoading && <BookSkeleton count={4} />}
                    </div>
                    {
                        !bookLoading && (<div ref={observerRef} className="h-10"></div>)
                    }
                    
                </section>


            </div>
        )
    } 

    return (
        <div className="flex justify-center items-center h-svh">
            <img src="/home/loader.gif" className="" />
        </div>
        
    ) 
    
}

const BookSkeleton: React.FC<BookSkeletonProps> = ({ count }) => {
    const skeletons = Array.from({ length: count });
    return (
        <>
            {skeletons.map((_, index) => (
                <div  key={index} >
                    <Skeleton className="w-48 h-72" />
                </div>      
            ))}
        </>
    )
}




export default AuthorsPage;