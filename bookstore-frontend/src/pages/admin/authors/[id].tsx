import AuthorEditModal from "@/components/custom/admin/authors/AuthorEditModal";
import CommonDeleteModal from "@/components/custom/admin/CommonDeleteModal";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { NextPageWithLayout } from "@/pages/_app";
import { Author } from "@/types/common";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AuthorsDetailPage: NextPageWithLayout = () => {
    const [author, setAuthor] = useState<Author | null>(null);
    const [showFullBio, setShowFullBio] = useState<boolean>(false);

    const router = useRouter();
    const { id } = router.query;
    const [ dialogOpen, setDialogOpen ] = useState<boolean>(false);

    const toggleText = () => {
        setShowFullBio(!showFullBio);
    }

    useEffect(() => {
        if (id){
            fetchAuthorData();
        }
    }, [id])

    const fetchAuthorData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authors/${id}`);
            if(!response.ok){
                throw new Error('Failed to fetch author data.');
            }
            const data = await response.json();
            setAuthor(data);
        } catch (error) {
            //TODO:: to do something with the error
            console.log(error);
        }
    }

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authors/${id}`, {
                method: "DELETE"
            });
            if(!response.ok){
                throw new Error('Failed to delete author.');
            }
            router.push({
                pathname: '/admin/authors',
                query: {successDelete: "Author deleted successfully!"} 
            });
        } catch (error) {
            return; 
        }
    }

    return (
        <div>
            <section className="p-5 h-auto grid grid-cols-7 border-b-2 border-gray-200">
                {/*  Left side image */}
                <div className="md:col-span-2 col-span-7">
                    
                    <img src={author?.image ? `http://localhost:8000/${author.image}` : "/placeholders/user-placeholder.png"} alt="author-image"
                    className="rounded-full w-64 h-64" />
                </div>
                {/*  right side name and bio  and edit and delete button */}
                <div className="md:col-span-4 col-span-7 mt-6 ms-4">
                    <div>
                        <h1 className="md:text-4xl text-3xl font-bold my-4">{ author?.name }</h1>
                        <p>
                           
                            { showFullBio ? author?.bio : author?.bio.slice(0, 300) }
                            {author?.bio && author.bio.length > 300 && (
                                <span onClick={toggleText} className="text-gray-600 hover:cursor-pointer">
                                {showFullBio ? " Show less..." : " Show more..."}
                            </span>
                            )}
                        </p>
                    </div>
                    <div className="flex justify-end mt-4">
                        <Button variant={"yellow"} className="ms-4">Edit</Button>
                        {/* <AuthorEditModal /> */}
                        
                        <CommonDeleteModal deleteItemID={author?.id} deleteHandler={handleDelete} />
                    </div>
                    
                </div>

            </section>
            <section>
                
            </section>
        </div>
    )
}


AuthorsDetailPage.getLayout = function getLayout(page) {
    return (
        <AdminLayout>
            {page}
        </ AdminLayout>
    )
}

export default AuthorsDetailPage;