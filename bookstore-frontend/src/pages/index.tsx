import CommonSearchInput from "@/components/custom/admin/CommonSearchInput";
import { Button } from "@/components/ui/button";
import useAuthorStore from "@/store/AuthorStore";
import { SkipForward, SkipBack } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link";
import { Author } from "@/types/common";


export default function Home() {
  const {limitFetchAuthors, hasMorePages, currentPage, nextPage, backPage, setCurrentPage } = useAuthorStore();
  const [ authors, setAuthors ] = useState<Author[]>([]);
  const [authorLoading, setAuthorLoading ] = useState<boolean>(false);
  const [authorSearch, setAuthorSearch ] = useState<string>("");


  useEffect(() => {
    setCurrentPage(1)
    getAuthors()
  }, [authorSearch]);

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
        </div>



      </section>

    </div>
  );
}





const SkeletonAuthors = () => {
  const skeletons = Array.from({ length: 8 });
  return (
    <div className="grid grid-cols-8 gap-2 mx-10 h-32">
    {skeletons.map((_, index) => (
      <div className="flex flex-col items-center">
        <Skeleton key={index} className="w-20 h-20 rounded-full" />
      </div>
      
    ))}
  </div>
  )

}