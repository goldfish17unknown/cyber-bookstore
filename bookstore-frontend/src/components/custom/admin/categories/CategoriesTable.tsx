import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Category } from "@/types/common";

interface CategoriesTableProps{
    categories: Category[];
}

const CategoriesTable: React.FC<CategoriesTableProps> = ({ categories }) => {
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
                <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>Fantasy</TableCell>
                    <TableCell>To edit to delete</TableCell>
                </TableRow>
           </TableBody>
            
        </Table>

    )
}

export default CategoriesTable;