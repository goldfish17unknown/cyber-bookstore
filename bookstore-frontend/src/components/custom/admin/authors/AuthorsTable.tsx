import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Author } from "@/types/common";
import Link from "next/link";



interface AuthorsTableProps {
    authors: Author[];
    // loading: boolean;
    // error: string;
}

const AuthorsTable: React.FC<AuthorsTableProps> = ({ authors }) => {
    return (
        <Table className="mx-auto md:w-2/3 sm:w-full">
            <TableCaption>A list of authors</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-1/6">avater</TableHead>
                    <TableHead className="w-4/6">name</TableHead>
                    <TableHead className="w-1/6">Actions</TableHead>
                </TableRow>
            </TableHeader>
            {
                authors.length != 0 ? (
                    <TableBody>
                    {authors.map((author) => (
                        <TableRow key={author.id}>
                            <TableCell>    
                                <img src={author.image ? `http://localhost:8000/${author.image}` : "/placeholders/user-placeholder.png"}
                                alt="author" className="w-12 h-12 rounded-full" />
                            </TableCell>
                            <TableCell>{author.name}</TableCell>
                            <TableCell>   
                                <Button variant={"green"} size={"sm"} asChild>
                                    <Link href={`/admin/authors/${author.id}`}>
                                        View
                                    </Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                ))}  
            </TableBody>
                ) : (
                    <TableBody>
                        <TableRow className="bg-gray-50">
                            <TableCell colSpan={3} className="text-center">No data</TableCell>
                        </TableRow>
                    </TableBody>
                    )
            }            
        </Table>
    )
}

export default AuthorsTable;
