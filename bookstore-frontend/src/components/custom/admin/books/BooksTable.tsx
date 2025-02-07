import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Book } from "@/types/common";
import { Link } from "lucide-react";


interface BooksTableProps {
    books: Book[];
}

const BooksTable: React.FC<BooksTableProps> = ({ books }) =>{
    return(
        <Table className="mx-auto w-full">
        <TableCaption>A list of books</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead className="w-1/6 text-center">Image</TableHead>
                <TableHead className="w-1/6">Title</TableHead>
                <TableHead className="w-1/6">Author</TableHead>
                <TableHead className="w-1/6">Category</TableHead>
                <TableHead className="w-1/6">Available</TableHead>
                <TableHead className="w-2/6">Action</TableHead>
            </TableRow>
        </TableHeader>

        <TableBody>
            {books.map((book) => (
                <TableRow key={book.id}>
                    <TableCell className="flex justify-center">
                        <div className="relative w-16 h-24 overflow-hidden">
                            <img src={book.image ? `http://localhost:8000/${book.image}` : "/placeholders/user-placeholder.png"}
                            className="w-full h-full" alt="" />
                        </div>
                    </TableCell>
                    <TableCell>
                        {book.title}
                    </TableCell>
                    <TableCell>
                        {book.author ? book.author.name : "Unknown Author"}
                    </TableCell>
                    <TableCell>
                        {book.category ? book.category.name :"-"}
                    </TableCell>
                    <TableCell>{book.borrowStatus}</TableCell>
                    <TableCell>
                        <Button variant={"yellow"}>borrow</Button>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
        </Table>
    )
}

export default BooksTable;

// book image, book name, author name, category, available,  action (borrow)