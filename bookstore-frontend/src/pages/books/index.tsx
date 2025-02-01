import { Book } from "@/types/common";
import { useEffect, useState } from "react";

const BooksPage: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

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
        } finally {
            setLoading(false);
        }
    }
    if (loading){
        return <p>Loading...</p>
    }

    if (error){
        return  <p>{error}</p>
    }

    return (
        <div>
            <h1>Book List</h1>
            
            {books.length === 0 ? (
                <p>No books available</p>
            ) : (
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
            )}
        </div>
    )
}

export default BooksPage;