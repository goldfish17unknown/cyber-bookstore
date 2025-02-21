import CommonSearchInput from "@/components/custom/admin/CommonSearchInput";
import { Button } from "@/components/ui/button";
import useAuthorStore from "@/store/AuthorStore";
import { SkipForward, SkipBack, Search, BookA } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link";
import { Author, Book } from "@/types/common";
import useBookStore from "@/store/BookStore";
import SelectCategory from "@/components/custom/SelectCategory";
import SelectAuthor from "@/components/custom/SelectAuthor";


export default function Home() {
  const {limitFetchAuthors, hasMorePages, currentPage, nextPage, backPage, setCurrentPage } = useAuthorStore();
  const [ authors, setAuthors ] = useState<Author[]>([]);
  const [authorLoading, setAuthorLoading ] = useState<boolean>(false);
  const [authorSearch, setAuthorSearch ] = useState<string>("");


  const BooksCurrentPage = useBookStore((state) => state.currentPage)
  const booksSetCurrentPage = useBookStore((state) => state.setCurrentPage)
  const BooksHasMorePages = useBookStore((state) => state.hasMorePages)
  const booksLoadBooks = useBookStore((state) => state.loadBooks)

  const [books, setBooks ] = useState<Book[]>([])
  const [bookAuthor, setBookAuthor ] = useState<string>("")
  const [bookCategory, setBookCategory ] = useState<string>("")
  const [bookSearch, setBookSearch] = useState<string>("")

  const [ bookLoading, setBookLoading] = useState<boolean>(true);
  const loadingRef = useRef<boolean>(false);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [ moreBookLoading, setMoreBookLoading ] = useState<boolean>(false);


  useEffect(() => {
    setCurrentPage(1)
    getAuthors()
  }, [authorSearch]);

  useEffect(() => {
    setBooks([])
    booksSetCurrentPage(1)
    setBookSearch("")
    getBooks("")
  }, [bookCategory, bookAuthor])

  useEffect(() => {
    if(!observerRef.current) return;

    if(moreBookLoading) return;

    const observer = new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting &&  BooksHasMorePages) {
        getMoreBooks();
      }
    },{ rootMargin: "300px" } );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [books, hasMorePages])

  const getBooks = async (searchKey: string) => {
    setBookLoading(true);
    const data = await booksLoadBooks(searchKey, bookCategory, bookAuthor, 18)
    setBooks((prev) => [...prev, ...data]);
    setBookLoading(false);
  }

  const getMoreBooks = async () => {
    booksSetCurrentPage(BooksCurrentPage + 1);
    if (loadingRef.current) return;
    if(!moreBookLoading && hasMorePages) {
      loadingRef.current = true;
      setMoreBookLoading(true)
      const data = await booksLoadBooks(bookSearch, bookCategory, bookAuthor, 18);
      setBooks((prev) => [...prev, ...data]);
    }
    setMoreBookLoading(false)
    loadingRef.current = false;
  } 


  const handleBookSearch = () => {
    setBooks([])
    booksSetCurrentPage(1)
    getBooks(bookSearch)
  }


  const getAuthors = async() => {
    setAuthorLoading(true);
    setAuthors(await limitFetchAuthors(8,authorSearch));
    setAuthorLoading(false);
  }


  const handleNext = async() => {
    setAuthorLoading(true);
    nextPage();
    setAuthors(await limitFetchAuthors(8,authorSearch));
    setAuthorLoading(false);
  }

  const handlePrev = async() => {
    setAuthorLoading(true);
    backPage();
    setAuthors(await limitFetchAuthors(8,authorSearch));
    setAuthorLoading(false);
  }


  return (
    <div className="container ms-5 lg:mx-10 ">
      <section className="pb-5 border-b-2">
        <div className="md:flex md:justify-between lg:mx-10 mt-10">
          <h1 className="text-4xl font-bold">Authors</h1>
          <div className="w-80 md:mt-1 mt-5 mb-0">
            <CommonSearchInput searchValue={authorSearch} setSearchValue={setAuthorSearch} 
            placeholder={"search authors..."} />
          </div>
        </div>
        {/* show list of authors in circles */}
        <div className="mt-14">
          <div className="relative mx-10">
            <Button onClick={handlePrev} disabled={currentPage === 1} className="absolute left-0 top-1/3 transform -translate-y-1/3 p-2 bg-gray-600  rounded-full">
              <SkipBack />
            </Button>
            {
              authorLoading ? (
                <SkeletonAuthors />
              ) : authors.length === 0 ? (
              <p className="flex col-span-8 items-center justify-center text-center text-gray-500 h-32">No data</p>
            ) : (
                <div className="grid grid-cols-8 gap-2  mx-10 h-32">
                  {authors.map((author) => (  
                      <div key={author.id} className="flex flex-col items-center">
                        <Link href={`/authors/${author.id}`}>
                          <img src={author.image ? `http://localhost:8000/${author.image}` : "/placeholders/user-placeholder.png"}
                          alt="author" className="w-20 h-20 rounded-full" />
                          <p className="text-ellipsis text-center">{author.name}</p>
                        </Link>
                      </div>
                  ))}
                </div>
              )
            }
            <Button onClick={handleNext} disabled={!hasMorePages} className="absolute right-0 top-1/3 transform -translate-y-1/3 p-2 bg-gray-600  rounded-full">
              <SkipForward />
            </Button>
          </div>
        </div>
      </section>


      <section className="mt-5">
        <div className="md:flex md:justify-between lg:mx-10 mt-10">
          <h1 className="text-4xl font-bold">Books</h1>
          <div className=" w-4/12">
            <div className="flex">
              <CommonSearchInput searchValue={bookSearch} setSearchValue={setBookSearch} placeholder={"search by book's name..."} />
              <Button variant={"yellow"} onClick={handleBookSearch}><Search /></Button>
            </div>
            <div className="flex mt-3">
              <div className="flex w-1/2 items-center me-4">
                <p className="font-semibold text-1xl me-2">Author:</p>
                <SelectAuthor authorValue={bookAuthor} setAuthorValue={setBookAuthor} />

              </div>
              <div className="flex w-1/2 items-center">
                <p className="font-semibold text-1xl me-2">Category:</p>
                <SelectCategory categoryValue={bookCategory} setCategoryValue={setBookCategory} />
                
              </div>
            </div>
          </div>      
        </div>
        {/* Show a list of books */}
        <div className="grid grid-cols-5 gap-4 mt-12 justify-items-center">
          {
            bookLoading ? (
              <BookSkeleton count={10} />

            ) : books.length === 0 ? (
              <p className="flex col-span-8 items-center justify-center text-center text-gray-500 h-32">No data</p>
            ) : books.map((book) => (
              <div key={book.id}>
                <Link href={`/books/${book.id}`} className="flex flex-col w-48 mb-3">
                  <img src={book.image ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${book.image}` : "/placeholders/user-placeholder.png"} 
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
          {moreBookLoading && <BookSkeleton count={5} />}
        </div>
        {
          !bookLoading && (<div ref={observerRef} className="h-10"></div>)
        }
      </section>

    </div>
  );
}





const SkeletonAuthors = () => {
  const skeletons = Array.from({ length: 8 });
  return (
    <div className="grid grid-cols-8 gap-2 mx-10 h-32">
    {skeletons.map((_, index) => (
      <div key={index} className="flex flex-col items-center">
        <Skeleton className="w-20 h-20 rounded-full" />
      </div>
      
    ))}
  </div>
  )
}

const BookSkeleton: React.FC<{count: number}> = ({ count }) => {
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