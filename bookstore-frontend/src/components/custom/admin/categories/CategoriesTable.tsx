import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Category } from "@/types/common";
import CommonDeleteModal from "../CommonDeleteModal";
import { Button } from "@/components/ui/button";
import CategoryUpdateModal from "./CategoriesUpdateModal";

interface CategoriesTableProps{
    categories: Category[];
    deleteFunction: (id: number) => void;
    firstItemIndex: number;
}

const CategoriesTable: React.FC<CategoriesTableProps> = ({ categories, deleteFunction, firstItemIndex }) => {    

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

           
            { categories.length != 0 ? (
                <TableBody>
                    {
                        categories.map((category, index) => (
                            <TableRow key={category.id}>
                                <TableCell>{firstItemIndex + 1 + index}</TableCell>
                                <TableCell>{category.name}</TableCell>
                                <TableCell>
                                    <CategoryUpdateModal 
                                    category={category}  />
            
                                    < CommonDeleteModal deleteHandler={deleteFunction} deleteItemID={category.id} />
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            )
            
             : (
                <TableBody>
                    <TableRow className="bg-gray-50">
                        <TableCell colSpan={3} className="text-center">No data</TableCell>
                    </TableRow>
                </TableBody>
                

            )}
                
           
            
        </Table>

    )
}

export default CategoriesTable;