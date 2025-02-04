import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";


interface CategoryCreateModal{
    createFunction: (e: React.FormEvent<HTMLFormElement>) => void,
    catName: string,
    setCatName: (name: string) => void
    dialogOpen: boolean,
    setDialogOpen: (dialogOpen: boolean) => void
}

const CategoryCreateModal: React.FC<CategoryCreateModal> = ({ createFunction, catName, setCatName, dialogOpen, setDialogOpen }) => {
    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button>Create <Plus /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] bg-white">
                <DialogHeader>
                    <DialogTitle>Create New Category</DialogTitle>
                    <DialogDescription>
                        Enter the name of the category that you want to create and hit save.
                    </DialogDescription>
                    <form onSubmit={createFunction}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-5 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name:
                            </Label>
                            <Input id="name" className="col-span-3" value={catName} onChange={(e)=> setCatName(e.target.value)} />
                        </div>
                    </div>
                    <DialogFooter>
                        
                        <Button type="submit">Save</Button>
                        
                    </DialogFooter>

                    </form>
                    
                </DialogHeader>
                
            </DialogContent>
        </Dialog>
    )
}

export default CategoryCreateModal;