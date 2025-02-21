import { Book } from '@/types/common';
import { create } from 'zustand';

interface BookState {
    books: Book[];
    setBooks: (book: Book[]) => void;
    currentBook: Book | null;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    lastPage: number;
    hasMorePages: boolean;
    fetchBooks: (search?: string, category?: string, author?: string) => Promise<void>;
    getBook: (id: string) => Promise<Book>;
    addBook: (title: string, description: string, isbn: string, author_id: number, category_id: number, image?: File | null) => Promise<void>;
    updateBook: (id: number, title: string, description: string, isbn: string, author_id: number, category_id: number, image?: File | null) => Promise<void>;
    deleteBook: (id: number) => Promise<void>;
    loadBooks: (search?: string, category?: string, author?: string, itemsPerPage?: number) => Promise<Book[]>
}

const useBookStore = create<BookState>((set, get) => ({
    books: [],
    setBooks: (book: Book[]) => set(state => ({ books: book })),
    currentBook: null,
    currentPage: 1,
    setCurrentPage: (page: number) => set(state => ({ currentPage: page })),
    lastPage: 1,
    hasMorePages: false,
    fetchBooks: async(search="", category="", author="") => {
        try {
            const currentPage = get().currentPage;
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books?search=${search}&page=${currentPage}&category=${category}&author=${author}`);
            const data = await res.json();
            set({
                books: data.data,
                currentPage: data.current_page,
                lastPage: data.last_page,
                hasMorePages: data.has_more_pages
            })
        } catch (error){
            throw error;
        }
    },
    getBook: async(id) => {
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`);
            if(!response.ok){
                throw new Error("error fetching data.")
            }
            const data = await response.json()
            return data;
        } catch (error){
            throw error;
        }
    },
    addBook: async(title, description, isbn, author_id, category_id, image) => {
        try {
            const bookData = new FormData();
            bookData.append("title", title);
            bookData.append("description", description);
            bookData.append("isbn", isbn);
            bookData.append("author_id", author_id.toString());
            bookData.append("category_id", category_id?.toString() || "");
            if(image){
                bookData.append("image", image)
            }
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
                method: 'POST',
                body: bookData
            })
            if(!response.ok){
                throw new Error("Error creating data")
            }
            await get().fetchBooks()
        } catch (error){
            throw error;
        }
    },
    updateBook: async(id, title, description, isbn, author_id, category_id, image) => {
        const bookData = new FormData();
        bookData.append("title", title);
        bookData.append("description", description);
        bookData.append("isbn", isbn);
        bookData.append("author_id", author_id.toString());
        bookData.append("category_id", category_id.toString());
        if (image) {
            bookData.append("image", image);
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`, {
            method: "POST",
            body: bookData,
        });

        if (!response.ok) {
            throw new Error("Error updating book.");
        }
    },
    deleteBook: async(id) => {
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`,{
                method: 'DELETE'
            })
            if(!response.ok){
                throw new Error("Error deleting data.")
            }
        } catch (error){
            throw error;
        }
    },
    loadBooks: async(search="", category="", author="", itemsPerPage) => {
        try{
            const currentPage = get().currentPage;
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/books/front/limit?search=${search}&category=${category}&author=${author}&page=${currentPage}&itemsPerPage=${itemsPerPage}`
            )
            const data = await response.json();

            set({
                currentPage: data.current_page,
                lastPage: data.last_page,
                hasMorePages: data.has_more_pages
            })
            return data.data;
        } catch (error){
            throw error;
        }

    },

}))

export default useBookStore