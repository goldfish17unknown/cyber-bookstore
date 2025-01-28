import { Book } from "@/types/common";
import { useEffect, useState } from "react";

const BooksPage: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try{
            console.log("hello")
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`);

            console.log(`${process.env.NEXT_PUBLIC_API_URL}/books`);
            if(!response.ok){
                throw new Error("Something went wrong!");
            }
            const data: Book[] = await response.json();
            
            setBooks(data);
        } catch (error){
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unknown error occurred");
            }
        }
    }

    return (
        <div>
            <h1>Book List</h1>
            {error && <p>{error}</p>}
            <div>
                {books.map((book) => (
                    <div key={book.id}>
                        <h2>{book.title}</h2>
                        <p>{book.description}</p>
                        <p>{book.category?.name}</p>
                        <p>{book.author?.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BooksPage;