import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Author } from "@/types/common";


interface AuthorsTableProps {
    authors: Author[];
}

const AuthorsTable: React.FC<AuthorsTableProps> = ({ authors }) => {
    return (
        <Table className="mx-auto w-[10rem]">
            <TableCaption>A list of authors</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead> - </TableHead>
                    <TableHead>name</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell></TableCell>

                </TableRow>
                
            </TableBody>
            
        </Table>
    )
}

export default AuthorsTable;
