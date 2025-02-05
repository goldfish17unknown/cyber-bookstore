import CategoryCreateModal from "@/components/custom/admin/categories/CategoriesCreateModal"
import CategoriesTable from "@/components/custom/admin/categories/CategoriesTable"
import CommonSearchInput from "@/components/custom/admin/CommonSearchInput"
import { AdminLayout } from "@/components/layouts/AdminLayout"
import { NextPageWithLayout } from "@/pages/_app"
import { Category } from "@/types/common"
import { ReactElement, useEffect, useState } from "react"


const AdminCategoriesManagement: NextPageWithLayout = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [search, setSearch] = useState<string>("");

    const [newCatName, setNewCatName]= useState<string>("");
    const [createDialogOpen, setCreateDialogOpen] = useState<boolean>(false)

    useEffect(() => {
        fetchCategoryData()
    }, [])

    const fetchCategoryData = async () => {
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
            if(!response.ok){
                throw new Error("Failed to fetch datas.")
            }
            const data = await response.json()
            setCategories(data)
        } catch (error){
            console.log(error instanceof Error ? error.message : "Unknown error")
        }
    }


    const handleCreate = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newCatName }),
            })
            if(!response.ok){
                throw new Error("Failed to create category");
            }
            const data = await response.json();
            setCreateDialogOpen(false)
            setNewCatName("");
            fetchCategoryData();
        } catch (error){
            console.log(error);
        }
    }


    const handleDelete = async(id: number) => {
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`, {
                method: "DELETE"
            })
            if(!response.ok){
                throw new Error("Error in fetching data")
            }
            fetchCategoryData();
        } catch (error){
        }
    }


    const handleEdit = async() => {

    }


    return (
        <div className="w-full mt-10">
            <div className="flex my-10">
                <h1 className="text-3xl font-bold mx-auto ">Categories List</h1>
            </div>

            <div className="flex flex-col-reverse lg:flex-row justify-between my-10 lg:me-48 gap-4 mx-auto md:w-2/3 sm:w-full">

                <div className="w-full md:w-2/5">
                  <CommonSearchInput searchValue={search} setSearchValue={setSearch} placeholder={"Search Category by name"} />
                </div>

                <div className="self-end">
                  <CategoryCreateModal createFunction={handleCreate} catName={newCatName} setCatName={setNewCatName} 
                  dialogOpen={createDialogOpen} setDialogOpen={setCreateDialogOpen} />
                </div>
            </div>
            <CategoriesTable categories={categories} deleteFunction={handleDelete}/>
            
        </div>
    )
}




AdminCategoriesManagement.getLayout = function getLayout(page: ReactElement){
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}


export default AdminCategoriesManagement