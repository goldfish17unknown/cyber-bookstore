import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useCategoryStore from "@/store/CategoryStore"
import { Category } from "@/types/common"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

interface CategoryUpdateModal {
    category: Category,
}

const CategoryUpdateModal: React.FC<CategoryUpdateModal> = ({ category }) => {
    const [ categoryName, setCategoryName ] = useState<string>("")
    const [dialogEditOpen, setDialogEditOpen] = useState<boolean>(false)

    const { fetchCategories, updateCategory } = useCategoryStore()
    
    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const response = await updateCategory(category.id, categoryName)
        fetchCategories()
        if(response){
            setDialogEditOpen(false)
            toast.success("Category updated successfully.")
        }
    }

    useEffect(() => {
        setCategoryName(category.name)
    }, [])

    return (
        <Dialog open={dialogEditOpen} onOpenChange={setDialogEditOpen}>
            <DialogTrigger asChild>
                <Button variant={"yellow"} className=" my-1">Update</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] bg-white">
                <DialogHeader>
                    <DialogTitle>Edit Category info</DialogTitle>
                    <DialogDescription>
                        Edit the name of the category.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleUpdate}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-5 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name:
                            </Label>
                            <Input id="name" className="col-span-3" value={categoryName} onChange={(e)=> setCategoryName(e.target.value)} />
                        </div>
                    </div>
                    <DialogFooter>                
                        <Button type="submit">Save</Button>                    
                    </DialogFooter>
                </form>
            </DialogContent>

        </Dialog>

    )
}

export default CategoryUpdateModal;