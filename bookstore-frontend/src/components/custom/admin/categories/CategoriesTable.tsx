import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Category } from "@/types/common";
import CommonDeleteModal from "../CommonDeleteModal";
import { Button } from "@/components/ui/button";

interface CategoriesTableProps{
    categories: Category[];
    deleteFunction: (id: number) => void;
}

const CategoriesTable: React.FC<CategoriesTableProps> = ({ categories, deleteFunction }) => {    

    return (
        <Table className="mx-auto md:w-2/3 sm:w-full">
           <TableCaption>A list of categories</TableCaption> 
           <TableHeader>
               <TableRow>
                    <TableHead className="w-1/6">No.</TableHead>
                    <TableHead className="w-3/6">Name</TableHead>
                    <TableHead className="w-2/6">Action</TableHead>
               </TableRow>

           </TableHeader>

           <TableBody>
                {categories.map((category, index) => (
                    <TableRow key={category.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{category.name}</TableCell>
                        <TableCell>
                            <Button variant={"yellow"} className="ms-4 my-1">Edit</Button>

                            < CommonDeleteModal deleteHandler={deleteFunction} deleteItemID={category.id} />
                        </TableCell>
                    </TableRow>

                ))}
                
           </TableBody>
            
        </Table>

    )
}

export default CategoriesTable;