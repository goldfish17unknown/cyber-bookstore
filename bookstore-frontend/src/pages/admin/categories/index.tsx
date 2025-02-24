import CategoryCreateModal from "@/components/custom/admin/categories/CategoriesCreateModal"
import CategoriesTable from "@/components/custom/admin/categories/CategoriesTable"
import CommonSearchInput from "@/components/custom/admin/CommonSearchInput"
import { AdminLayout } from "@/components/layouts/AdminLayout"
import { NextPageWithLayout } from "@/pages/_app"
import { Category } from "@/types/common"
import { ReactElement, useEffect, useState } from "react"
import useCategoryStore from "@/store/CategoryStore"
import CommonPagination from "@/components/custom/admin/CommonPagination"
import toast from "react-hot-toast"


const AdminCategoriesManagement: NextPageWithLayout = () => {
    const categories = useCategoryStore((state) => state.categories);
    const fetchCategories = useCategoryStore((state) => state.fetchCategories)
    const deleteCategory = useCategoryStore((state) => state.deleteCategory);
    const createCategory = useCategoryStore((state) => state.createCategory)

    const [search, setSearch] = useState<string>("");

    const [loading,  setLoading] = useState<boolean>(true);

    const [newCatName, setNewCatName]= useState<string>("");
    const [createDialogOpen, setCreateDialogOpen] = useState<boolean>(false)

    const [ currentPage, setCurrentPage] = useState<number>(1);
    const DataPerPage = 8;

    const indexOfLastPage = currentPage * DataPerPage;
    const indexOfFirstPage = indexOfLastPage - DataPerPage

    const filteredData = categories.filter((category: Category) => category.name.toLowerCase().includes(search.toLowerCase()))
    const currentData = filteredData .slice(indexOfFirstPage, indexOfLastPage)
    const totalPages = Math.ceil(filteredData.length / DataPerPage);

    useEffect(() => {
        getCategoryData();
    }, [])

    useEffect(() => {
        setCurrentPage(1);
    }, [search])

    const getCategoryData = async() => {
        setLoading(true);
        await fetchCategories();
        setLoading(false);
    }




    const handleCreate = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(await createCategory(newCatName)){
            setCreateDialogOpen(false)
            setNewCatName("");
            fetchCategories();
            toast.success("Category created successfully")
        }
        
    }


    const handleDelete = async(id: number) => {
        await deleteCategory(id);
        await fetchCategories();
        toast.success("Category deleted successfully")
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
            <CategoriesTable categories={currentData} deleteFunction={handleDelete} firstItemIndex={indexOfFirstPage}/>
            <CommonPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
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