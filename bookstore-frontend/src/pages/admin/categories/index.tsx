import CategoryCreateModal from "@/components/custom/admin/categories/CategoriesCreateModal"
import CategoriesTable from "@/components/custom/admin/categories/CategoriesTable"
import CommonSearchInput from "@/components/custom/admin/CommonSearchInput"
import { AdminLayout } from "@/components/layouts/AdminLayout"
import { NextPageWithLayout } from "@/pages/_app"
import { Category } from "@/types/common"
import { ReactElement, useEffect, useState } from "react"
import useCategoryStore from "@/store/CategoryStore"


const AdminCategoriesManagement: NextPageWithLayout = () => {
    const categories = useCategoryStore((state) => state.categories);
    const fetchCategories = useCategoryStore((state) => state.fetchCategories)
    const deleteCategory = useCategoryStore((state) => state.deleteCategory);
    const createCategory = useCategoryStore((state) => state.createCategory)

    const [search, setSearch] = useState<string>("");

    const [newCatName, setNewCatName]= useState<string>("");
    const [createDialogOpen, setCreateDialogOpen] = useState<boolean>(false)

    useEffect(() => {
        fetchCategories()
    }, [])




    const handleCreate = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await createCategory(newCatName)
        setCreateDialogOpen(false)
        setNewCatName("");
        fetchCategories();
    }


    const handleDelete = async(id: number) => {
        await deleteCategory(id);
        fetchCategories();
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