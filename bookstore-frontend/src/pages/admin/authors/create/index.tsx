import ImageInput from "@/components/custom/admin/ImageInput";
import { useRouter } from "next/router";
import { AdminLayout } from "@/components/layouts/AdminLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { ReactElement, useState } from "react";


const AdminAuthorCreate: NextPageWithLayout = () => {
    const [name, setName] = useState<string>("");
    const [bio, setBio] = useState<string>("");
    const [image, setImage] = useState<File| null>(null);
    const router = useRouter();

    const handleCreateAuthor = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const formData = new FormData();
            formData.append("name", name);
            formData.append("bio", bio);
            if (image) {
                formData.append("image", image);
            }

            const response = await fetch(`http://localhost:8000/api/authors`, {
                method: 'POST',
                body: formData,
            });
            if (!response.ok){
                throw new Error("Failed to create data")
            }
            const data = await response.json();

            if (data){
                router.push({
                    pathname: '/admin/authors',
                    query: { successCreate: "Author created successfully!" }
                });
            }

        } catch (error){
            console.error('Error creating author:', error);
        } finally{
            //TODO:: i want the spinner behind the create button
            

            
        }
    
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]); 
        }
    
            console.log(image);
        
    }
    

    return (
        <div className="w-full mt-10">
            <div className = "flex my-10">
                <h1 className="text-3xl font-bold mx-auto mb-8">Create an author data</h1>
            </div>

            <div className="flex justify-center">
                <form className="w-1/2" onSubmit={handleCreateAuthor}>

                    <div className="flex flex-col mb-4">
                        <div className="flex">
                            <label htmlFor="image" className="text-lg">Author Image:</label>
                            {/* TODO: Add error message here */}
                            {/* <span>This is an error</span> */}
                        </div>
                        <ImageInput handleImageChange={handleImageChange}/>
                    </div>

                    <div className="flex flex-col mb-4">
                        <div className="flex">
                            <label htmlFor="name" className="text-lg">Author Name:</label>
                             {/*  TODO:: Add error message here 
                            <span>This is an error</span>   */} 
                        </div>
                        <input type="text" id="name" className="border border-gray-300 rounded-md p-2" 
                        value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>

                    <div className="flex flex-col mb-4">
                        <div className="flex">
                            <label htmlFor="bio" className="text-lg">Author Bio:</label>
                            {/*  TODO:: Add error message here 
                            <span>This is an error</span>   */} 
                        </div>
                        <textarea name="bio" id="bio" className="border border-gray-300 rounded-md p-2"
                        value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
                    </div>
     
                    <div className="flex justify-center">
                        <button className="bg-primary text-primary-foreground p-2 rounded-md w-full">Create</button>
                    </div>
                </form>
            </div>
            
        </div>
    )
}

AdminAuthorCreate.getLayout = function getLayout(page: ReactElement){
    return (
            <AdminLayout>
                {page}
            </AdminLayout>
        )
}

export default AdminAuthorCreate;