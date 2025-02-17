import { Book } from '@/types/common';
import { create } from 'zustand';

interface BookState {
    books: Book[];
    currentBook: Book | null;
    currentPage: number;
    lastPage: number;
    hasMorePages: boolean;
    fetchBooks: (search?: string, category?: string, author?: string) => Promise<void>;
    getBook: (id: number) => Promise<void>;
    addBook: (title: string, description: string, isbn: string, author_id: number, category_id: number, image?: File | null) => Promise<void>;
    updateBook: (id: number, title: string, description: string, isbn: string, author_id: number, category_id: number, image?: File | null) => Promise<void>;
    deleteBook: (id: number) => Promise<void>;
}

const useBookStore = create<BookState>((set, get) => ({
    books: [],
    currentBook: null,
    currentPage: 1,
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
            set({ currentBook: data })
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
    loadBooks: () => {

    },
    LazyBooks: () => {

    }
}))

export default useBookStore