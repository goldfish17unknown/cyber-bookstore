import SelectCategory from "@/components/custom/selectCategory";
import { Button } from "@/components/ui/button";
import useAuthorStore from "@/store/AuthorStore";
import { Author } from "@/types/common";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";



const AuthorsPage = () => {
    const { fetchSingleAuthor } = useAuthorStore()
    const [ currentAuthor, setCurrentAuthor ] = useState<Author | null>(null);
    const [category, setCategory ] = useState<string>("wq")
    const router = useRouter();
    const { id } = router.query;

    const [showFullBio, setShowFullBio] = useState<boolean>(false);

    useEffect(() => {       
        fetchData()
    }, [id]);

    useEffect(() => {
        console.log(category)
    }, [category]);

    const fetchData = async () => {
        if(typeof id === "string"){
            setCurrentAuthor(await fetchSingleAuthor(id));
        }
    }

    const toggleText = () => {
        setShowFullBio(!showFullBio);
    }

    const test= () => {
        console.log("hello");
        console.log(category)
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
                           
                            { showFullBio ? currentAuthor.bio : currentAuthor.bio.slice(0, 300) }
                            {currentAuthor.bio && currentAuthor.bio.length > 300 && (
                                <span onClick={toggleText} className="text-gray-600 hover:cursor-pointer">
                                {showFullBio ? " Show less..." : " Show more..."}
                            </span>
                            )}
                        </p>
                    </div>
                    
                    
                </div>


                </section>
                <section >
                    <div className="md:flex md:justify-between lg:mx-10 mt-5">
                        <h1 className="text-4xl font-bold" onClick={test}>Books written by  <span className="text-yellow-400 italic">{currentAuthor.name}</span></h1>
                        <div className="flex w-2/6">
                            <div className="w-1/2">
                                <SelectCategory categoryValue={category} setCategoryValue={setCategory} />

                            </div>

                        

                        </div>
                        
                        
                    </div>
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

export default AuthorsPage;