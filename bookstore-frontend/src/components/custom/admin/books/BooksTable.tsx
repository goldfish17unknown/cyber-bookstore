import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Book } from "@/types/common";
import { Link } from "lucide-react";

interface BooksTableProps {
    books: Book[];
}

const BooksTable: React.FC<BooksTableProps> = ({ books }) =>{
    return(
        <Table className="mx-auto md:w-2/3 sm:w-full">
        <TableCaption>A list of books</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead className="w-1/6">Title</TableHead>
                <TableHead className="w-2/6">Description</TableHead>
            </TableRow>
        </TableHeader>

        <TableBody>
            {books.map((book) => (
                <TableRow key={book.id}>
                    <TableCell>
                    <img src={book.image ? `http://localhost:8000/${book.image}` : "/placeholders/book-placeholder.png"}
                            alt="book" className="w-12 h-12 rounded-full" />
                    </TableCell>
                    <TableCell>{book.name}</TableCell>
                    <TableCell>   
                        <Button variant={"green"} size={"sm"} asChild>
                            <Link href={`/admin/books/${book.id}`}>
                                View
                            </Link>
                        </Button>
                            </TableCell>
                </TableRow>
            ))}
        </TableBody>
        </Table>
    )
}

export default BooksTable;