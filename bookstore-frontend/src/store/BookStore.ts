// import { Book } from '@/types/common';
// import { create } from 'zustand';

// interface BookState {
//     books: Book[];
//     currentPage: number;
//     lastPage: number;
//     hasMorePages: boolean;
//     fetchBooks: (search?: string, category?: string, author?: string) => Promise<void>;
//     getBook: (id: number) => Promise<void>;
//     addBook: (bookData: Omit<Book, "id">) => Promise<void>;
//     updateBook: (id: number, bookData: Omit<Book, "id">) => Promise<void>;
//     deleteBook: (id: number) => Promise<void>;
// }

// const useBookStore = create<BookState>((set, get) => ({
//     books: [],
//     currentPage: 1,
//     lastPage: 1,
//     hasMorePages: false,
//     fetchBooks: async(search="", category="", author="") => {
//         try {
//             const currentPage = get().currentPage;
//             const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books?search=${search}&page=${currentPage}&category=${category}&author=${author}`);
//             const data = await res.json();
//             set({
//                 books: data.data,
//                 currentPage: data.current_page,
//                 lastPage: data.last_page,
//                 hasMorePages: data.has_more_pages
//             })
//         } catch (error){
//             throw error;
//         }
//     },
//     getBook: async(id) => {

//     },
//     addBook: async(bookData) => {
//         try {

//         } catch (error){

//         }
//     },
    
//     updateBook: (id: number, bookData: Omit<Book, "id">) => Promise<void>;
//     deleteBook: (id: number) => Promise<void>;


// }))